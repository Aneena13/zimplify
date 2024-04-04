'use client'
import { AreaChart } from "@mantine/charts";
import { Group, Paper, PaperProps, Stack, Text, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { IconCpu } from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
  yMax: number;
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

export function MemoryUsageCard({ data, yMax }: GraphProps) {
  const percentage = (data[data.length - 1]?.y / yMax) * 100
  return (
    <NonInteractiveCard
      w={450}
    >
      <Stack>
        <Text>
          Memory Usage {percentage.toFixed(2)}%
        </Text>
        <MemoryUsageChart
          data={data}
          yMax={yMax}
        />
      </Stack>
    </NonInteractiveCard>
  )
}


function MemoryUsageChart({ data, yMax }: GraphProps) {
  return (
    <AreaChart
      h={250}
      dataKey="x"
      data={data}
      series={[
        { name: 'y', color: 'orange.6' },
      ]}
      yAxisProps={{ domain: [0, Number.parseInt(yMax)] }}
      curveType="monotone"
    />
  )
}

function CPUUsageChart({ data }: GraphProps) {

  return (
    <AreaChart
      yAxisProps={{ domain: [0, 100] }}
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
export function NonInteractiveCard({ children, ...props }: NonInteractiveCardProps) {
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
