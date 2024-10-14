import { NavbarProps, useWorkspace } from 'sanity'
import { Card, Stack, Text } from '@sanity/ui'

export function DevelopmentNavbar(props: NavbarProps) {
  const { dataset, currentUser } = useWorkspace()

  return (
    <Stack>
      <TopBar name={currentUser?.name} dataset={dataset} />
      {props.renderDefault(props)} {/* Render the default navbar */}
    </Stack>
  )
}

export function ProductionNavbar(props: NavbarProps) {
  const { dataset, currentUser } = useWorkspace()

  return (
    <Stack>
      <TopBar name={currentUser?.name} dataset={dataset} />
      {props.renderDefault(props)} {/* Render the default navbar */}
    </Stack>
  )
}

export function TopBar({ name, dataset }: { name?: string; dataset: string }) {
  return (
    <Card padding={3} tone="primary">
      <Text size={1}>
        {name && (
          <span>
            Welcome, <b>{name}</b>.&nbsp;
          </span>
        )}
        You are currently using the <b> {dataset} </b> dataset.
      </Text>
    </Card>
  )
}
