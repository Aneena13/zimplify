'use client'
import { Button, Stack } from "@mantine/core";

const client_id = process.env.NEXT_PUBLIC_client_id;
if (!client_id) {
  throw new Error(
    'Missing NEXT_PUBLIC_client_id environment variable. Please set it in .env.local'
  )
}
export default function GithubSignIn() {
  function handleClick() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`
  }
  return (
    <Stack>
      <Button
          onClick={handleClick}
      >
        Sign in with Github
      </Button>
    </Stack>
  )
}
