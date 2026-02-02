import { Resolver, Query, Mutation, Subscription, Args } from "@nestjs/graphql";
import { UseGuards, Inject } from "@nestjs/common";
import { UserModel } from "./user.model";
import { UpdateProfileInput } from "./update-profile.input";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { PubSubService } from "../redis/pubsub.service";
import { DATABASE } from "../database/database.constants";
import { users, type User, type Database } from "@myapp/database";
import { eq } from "drizzle-orm";

const USER_UPDATED = "userUpdated";

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    @Inject(DATABASE) private readonly db: Database,
    private readonly pubSub: PubSubService,
  ) {}

  @Query(() => String, { name: "hello" })
  hello(): string {
    return "Hello from MyApp GraphQL API!";
  }

  @Query(() => UserModel, { name: "me" })
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<UserModel> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  }

  @Mutation(() => UserModel, { name: "updateProfile" })
  @UseGuards(AuthGuard)
  async updateProfile(
    @CurrentUser() user: User,
    @Args("input", { type: () => UpdateProfileInput }) input: UpdateProfileInput,
  ): Promise<UserModel> {
    const updateData: Partial<{ name: string; image: string }> = {};
    if (input.name !== undefined) updateData.name = input.name;
    if (input.image !== undefined) updateData.image = input.image;

    const [updated] = await this.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user.id))
      .returning();

    const result: UserModel = {
      id: updated!.id,
      name: updated!.name,
      email: updated!.email,
      image: updated!.image,
    };

    await this.pubSub.publish(USER_UPDATED, { userUpdated: result });

    return result;
  }

  @Subscription(() => UserModel, { name: "userUpdated" })
  userUpdated() {
    return this.pubSub.asyncIterator<{ userUpdated: UserModel }>(USER_UPDATED);
  }
}
