import { Badge } from "@mantine/core";
import { ProjectStatus } from "../../../../../types/enums";

interface PSBProps {
  status: ProjectStatus
}
export function ProjectStatusBadge({ status }: PSBProps) {

  const color = getColor(status);
  return (
    <Badge
      variant={'dot'}
      color={color}
    >
      {status}
    </Badge>
  )
}

function getColor(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.deploying:
      return 'blue';
    case ProjectStatus.deployed:
      return 'green';
    case ProjectStatus.failed:
      return 'red';
  }
}
