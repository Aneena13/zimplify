'use client'

import { ActionIcon, Group, Paper, Stack, Text } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime"

//@ts-ignore
dayjs.extend(relativeTime)

export function ProjectCard({ project }) {
  return (
    <Paper
      w={250}
      h={150}
      p="md"
      shadow={'sm'}
      radius={'sm'}
      style={{
        border: '1px solid rgba(0,0,0,.1)',
        cursor: 'pointer'
      }}
    >
      <Stack>
        <Group
          justify={'space-between'}
        >
          <Text
            fw={500}
              style={{
                  fontSize: '1.35rem'
              }}
          >
            {project.name}
          </Text>
          <ActionIcon
            variant={'transparent'}
            c={'gray'}
          >
            <IconDotsVertical />
          </ActionIcon>
        </Group>
        <Text
          c={'gray'}
            style={{
                fontSize: '.9rem'
            }}
        >
            {`Created ${dayjs().to(dayjs(project.createdAt))}`}
        </Text>
      </Stack>
    </Paper>
  )
}
