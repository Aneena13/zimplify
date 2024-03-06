'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { useCreateProjectMutation } from "@/backend/project/project.query";

export function AddDeployment() {

  const [isOpened, { open, close }] = useDisclosure(false)

  const [source, setSource] = useState("")

  return (
    <Group>
      <TextInput
        placeholder={`Enter github url`}
        style={{
          flex: 1
        }}
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <Button
        leftSection={<IconPlus />}
        onClick={open}
      >
        Create Deployment
      </Button>
      <Modal
        opened={isOpened}
        onClose={close}
        title={"Create Project"}
      >
        <Stack>
          <CreateDeploymentForm
            initialValues={{ source }}
            onClose={close}
          />
        </Stack>
      </Modal>
    </Group>
  )
}

interface CreateDeploymentFormProps {
  initialValues: any,
  onClose: () => void,
  onSubmit?: () => void
}
function CreateDeploymentForm({ initialValues, onClose, onSubmit }: CreateDeploymentFormProps) {

  if (!initialValues) initialValues = {}

  const form = useForm({
    initialValues: {
      name: initialValues.name || "",
      source: initialValues.source || "",
      buildDir: initialValues.buildDir || "/build",
      rootDir: initialValues.rootDir || "/",
      buildCommand: initialValues.buildCommand || "npm run build"
    }
  })

  const createMutation = useCreateProjectMutation()

  function handleClose() {
    onClose()
  }
  function handleSubmit() {
    createMutation.mutate(form.values, {
      onSuccess: handleClose
    })
    onSubmit?.()
  }

  return (
    <>
      <Stack>
        <TextInput
          label={'Name'}
          {...form.getInputProps('name')}
        />
        <TextInput
          label={'Source URL'}
          {...form.getInputProps('source')}
        />
        <TextInput
          label={'Build Command'}
          {...form.getInputProps('buildCommand')}
        />
        <TextInput
          label={'Build Directory'}
          {...form.getInputProps('buildDir')}
        />
        <TextInput
          label={'Root Directory'}
          {...form.getInputProps('rootDir')}
        />
      </Stack>
      <Group
        justify={'space-between'}
      >
        <Button
          variant={'outline'}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Group>
    </>
  )
}
