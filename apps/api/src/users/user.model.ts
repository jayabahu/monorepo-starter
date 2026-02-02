import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  image?: string | null;
}
