"use client";

import { useState } from "react";
import {
  Title,
  Stack,
  Card,
  Text,
  TextInput,
  Button,
  Alert,
  Code,
  Loader,
} from "@mantine/core";
import { useQuery, useMutation } from "@apollo/client/react";
import { ME_QUERY, UPDATE_PROFILE_MUTATION } from "@/lib/graphql";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export default function SettingsPage() {
  const { data: meData, loading: meLoading } = useQuery<{ me: UserProfile }>(ME_QUERY);
  const [updateProfile, { data: updateData, loading: updating, error }] =
    useMutation<{ updateProfile: UserProfile }>(UPDATE_PROFILE_MUTATION, {
      refetchQueries: [{ query: ME_QUERY }],
    });

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: { name?: string; image?: string } = {};
    if (name.trim()) input.name = name.trim();
    if (image.trim()) input.image = image.trim();
    if (Object.keys(input).length > 0) {
      updateProfile({ variables: { input } });
    }
  }

  return (
    <Stack>
      <Title order={2}>Settings</Title>

      <Card withBorder radius="md" p="xl">
        <Text size="lg" fw={500} mb="md">
          Current Profile
        </Text>
        {meLoading && <Loader size="sm" />}
        {!!meData && (
          <Code block p="md">
            {JSON.stringify(meData.me, null, 2)}
          </Code>
        )}
      </Card>

      <Card withBorder radius="md" p="xl">
        <Text size="lg" fw={500} mb="md">
          Update Profile
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="New name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextInput
              label="Image URL"
              placeholder="https://example.com/avatar.png"
              value={image}
              onChange={(e) => setImage(e.currentTarget.value)}
            />
            <Button type="submit" loading={updating}>
              Update Profile
            </Button>
          </Stack>
        </form>

        {error && (
          <Alert color="red" title="Error" mt="md">
            {error.message}
          </Alert>
        )}

        {updateData && (
          <Alert color="green" title="Profile Updated" mt="md">
            <Code block p="sm">
              {JSON.stringify(updateData.updateProfile, null, 2)}
            </Code>
          </Alert>
        )}
      </Card>
    </Stack>
  );
}
