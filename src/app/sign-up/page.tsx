'use client'
import { Title, Anchor, Container, Text } from '@mantine/core';
import LoginCard, { SignUpCard } from '../components/LoginCard';

export default function Login() {
  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have any account?{' '}
        <Anchor
          size="sm"
          href={'/sign-in'}
        >
          Sign In
        </Anchor>
      </Text>
      <SignUpCard />
    </Container>
  );
}