"use client";

import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      });
      if (signInError) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size={420} py={40}>
      <Title ta="center">Welcome back</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don&apos;t have an account?{" "}
        <Anchor size="sm" href="/sign-up">
          Create one
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}
            <Button type="submit" fullWidth loading={loading}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
