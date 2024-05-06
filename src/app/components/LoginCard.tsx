import { useSignInMutation, useSignUpMutation, useWhoAmI } from '@/backend/user/user.query';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

export default function LoginCard() {
  const { data: user } = useWhoAmI();

  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard/projects';
    }
  }, [user]);

  const signInMutation = useSignInMutation();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => {
        if (!value) {
          return 'Email is required'
        }
      },
      password: (value) => {
        if (!value) {
          return 'Password is required'
        }
      }
    }
  })

  function handleSubmit() {
    signInMutation.mutate(form.values);
  }


  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput
        label="Email"
        placeholder="user@zimplify.app"
        required mt='md'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required mt="md"
        {...form.getInputProps('password')}
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button 
      fullWidth mt="xl"
      disabled={!form.isValid()}
      onClick={handleSubmit}
      >
        Sign in
      </Button>
    </Paper>
  );
}

export function SignUpCard() {
  const { data: user } = useWhoAmI();

  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard/projects';
    }
  }, [user]);

  const signUpMutation = useSignUpMutation();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validate: {
      email: (value) => {
        if (!value) {
          return 'Email is required'
        }
      },
      password: (value) => {
        if (!value) {
          return 'Password is required'
        }
      },
      name: (value) => {
        if (!value) {
          return 'Name is required'
        }
      }
    }
  })

  function handleSubmit() {
    signUpMutation.mutate(form.values);
  }


  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput
        label="Name"
        placeholder="Your name"
        required
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Email"
        placeholder="user@zimplify.app"
        required mt='md'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required mt="md"
        {...form.getInputProps('password')}
      />
      <Button 
      fullWidth mt="xl"
      disabled={!form.isValid()}
      onClick={handleSubmit}
      >
        Sign in
      </Button>
    </Paper>
  );
}