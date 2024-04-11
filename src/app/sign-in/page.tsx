'use client'
import { Title, Anchor, Container, Text } from '@mantine/core';
import LoginCard from '../components/LoginCard';
import classes from './loginPage.module.css';

export default function Login() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor
         size="sm"
         href={'/sign-up'}
        >
          Create account
        </Anchor>
      </Text>
      <LoginCard />
    </Container>
  );
}