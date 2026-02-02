"use client";

import {
  Title,
  Text,
  Stack,
  Card,
  Code,
  Loader,
  Alert,
  Badge,
  Group,
} from "@mantine/core";
import { useQuery, useSubscription } from "@apollo/client/react";
import { HELLO_QUERY, USER_UPDATED_SUBSCRIPTION } from "@/lib/graphql";

export default function DashboardPage() {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  const { data: subData } = useSubscription(USER_UPDATED_SUBSCRIPTION);

  return (
    <Stack>
      <Title order={2}>Dashboard</Title>

      <Card withBorder radius="md" p="xl">
        <Text size="lg" fw={500}>
          GraphQL Connection
        </Text>
        <Text c="dimmed" mt="xs" mb="md">
          Testing the hello query from the API.
        </Text>
        {loading && <Loader size="sm" />}
        {error && (
          <Alert color="red" title="Error">
            {error.message}
          </Alert>
        )}
        {!!data && (
          <Code block p="md">
            {JSON.stringify(data, null, 2)}
          </Code>
        )}
      </Card>

      <Card withBorder radius="md" p="xl">
        <Group>
          <Text size="lg" fw={500}>
            Real-time Updates
          </Text>
          <Badge color={subData ? "green" : "gray"} variant="dot">
            {subData ? "Received" : "Waiting"}
          </Badge>
        </Group>
        <Text c="dimmed" mt="xs" mb="md">
          Listening for userUpdated subscription via WebSocket.
        </Text>
        {subData ? (
          <Code block p="md">
            {JSON.stringify(subData, null, 2)}
          </Code>
        ) : (
          <Text size="sm" c="dimmed">
            Update your profile in Settings to see real-time data here.
          </Text>
        )}
      </Card>
    </Stack>
  );
}
