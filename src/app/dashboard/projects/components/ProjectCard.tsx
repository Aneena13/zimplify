'use client'

import { ActionIcon, Flex, Group, Menu, Paper, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime"
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { useTimeSince } from "./useTimeSince";
import { useRouter } from "next/navigation";
import { useDeleteProjectMutation } from "@/backend/project/project.query";
import styles from "./card.styles.module.css"

//@ts-ignore
dayjs.extend(relativeTime)

export function ProjectCard({ project }) {

  const timeSince = useTimeSince(project.createdAt);
  const router = useRouter()

  const deleteMutation = useDeleteProjectMutation()
  function handleDelete() {
    deleteMutation.mutate(project.id)
  }

  return (
    <Paper
      withBorder
      w={250}
      h={150}
      p="md"
      shadow={'xl'}
      radius={'md'}
      className={styles.card}
      onClick={() => {
        router.push(`/dashboard/projects/${project.id}`)
      }}
    >
      <Flex
        direction={'column'}
        h={'100%'}
      >
        <Stack
          style={{
            flex: 1
          }}
        >
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
            <Menu>
              <Menu.Target>
                <ActionIcon
                  variant={'transparent'}
                  c={'gray'}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown
                onClick={e => e.stopPropagation()}
              >
                <Menu.Item
                  leftSection={<IconTrash />}
                  onClick={handleDelete}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text
            c={'gray'}
            style={{
              fontSize: '.9rem'
            }}
          >
            {`Created ${timeSince}`}
          </Text>
        </Stack>
        <Group>
          <ProjectStatusBadge
            status={project.status}
          />
        </Group>
      </Flex>
    </Paper>
  )
}
