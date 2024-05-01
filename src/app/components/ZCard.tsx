import { Paper, PaperProps } from "@mantine/core"
import styles from "./card.styles.module.css"

export interface ZCardProps extends PaperProps {
  children: React.ReactNode
  onClick?: () => void
}

export function ZCard(props: ZCardProps) {
  return (
    <Paper
      withBorder
      w={250}
      h={150}
      p="md"
      shadow={'xl'}
      radius={'md'}
      className={styles.card}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Paper>
  )
}