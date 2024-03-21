'use client'
import { AreaChart } from "@mantine/charts";
import { Group, Paper, PaperProps, Stack, Text, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { IconCpu } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const data = [
  {
    date: 'Mar 22',
    Apples: 10,
  },
  {
    date: 'Mar 23',
    Apples: 20,
  },
  {
    date: 'Mar 24',
    Apples: 40,
  },
  {
    date: 'Mar 25',
    Apples: 30,
  },
  {
    date: 'Mar 22',
    Apples: 10,
  },
  {
    date: 'Mar 23',
    Apples: 20,
  },
  {
    date: 'Mar 24',
    Apples: 40,
  },
  {
    date: 'Mar 25',
    Apples: 30,
  },

  {
    date: 'Mar 26',
    Apples: 70,
  },
  {
    date: 'Mar 22',
    Apples: 50,
  },
  {
    date: 'Mar 23',
    Apples: 60,
  },
];

export default function DashboardPage() {
  return (
    <Stack>
      <Title>
        Dashboard
      </Title>
      <Group>
        <CpuUsageCard />
        <MemoryUsageCard />
      </Group>
    </Stack>
  )
}

type GraphData = {
  x: string;
  y: number;
}
interface GraphProps {
  data: GraphData[];
}
export function CpuUsageCard({ data }: GraphProps) {
  return (
    <NonInteractiveCard
      w={450}
    >
      <Stack>
        <Group
          gap={'xs'}
        >
          <Text>
            CPU Usage
          </Text>
        </Group>
        <CPUUsageChart
          data={data}
        />
      </Stack>
    </NonInteractiveCard>
  )
}

export function MemoryUsageCard({data}: GraphProps) {
  return (
    <NonInteractiveCard
      w={450}
    >
      <Stack>
        <Text>
          Memory Usage
        </Text>
        <MemoryUsageChart
          data={data}
        />
      </Stack>
    </NonInteractiveCard>
  )
}


function MemoryUsageChart({ data }: GraphProps) {
  return (
    <AreaChart
      h={250}
      dataKey="x"
      data={data}
      series={[
        { name: 'y', color: 'orange.6' },
      ]}
      curveType="monotone"
    />
  )
}

function CPUUsageChart({data}: GraphProps) {

  return (
    <AreaChart
      h={250}
      dataKey="x"
      data={data}
      series={[
        { name: 'y', color: 'indigo.6' },
      ]}
      curveType="monotone"
    />
  )
}

interface NonInteractiveCardProps extends PaperProps {
  children: React.ReactNode;
}
function NonInteractiveCard({ children, ...props }: NonInteractiveCardProps) {
  return (
    <Paper
      bg={'var(--mantine-color-dark-6)'}
      p={'sm'}
      withBorder
      {...props}
    >
      {children}
    </Paper>
  )
}
