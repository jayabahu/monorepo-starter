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

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
      });
      if (signUpError) {
        setError("Failed to create account");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size={420} py={40}>
      <Title ta="center">Create an account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" href="/sign-in">
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
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
              Create account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
