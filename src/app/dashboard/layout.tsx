'use client'
import { AppShell, Burger, Center, Group, Image, NavLink, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { navItems } from './lib/navbar.constants';
import { usePathname } from 'next/navigation';


export default function DashboardLayout({ children }) {
    const [opened, { toggle }] = useDisclosure();
    const pathName = usePathname()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group
                    px={'sm'}
                    h={'100%'}
                >
                    <Center>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Title>
                            Simplify
                        </Title>
                    </Center>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar
                py={'sm'}
            >
                {
                    navItems.map(Item => (
                        <NavLink
                            key={`${Item.label}-${Item.href}`}
                            href={Item.href}
                            label={Item.label}
                            active={pathName===Item.href}
                            leftSection={<Item.icon />}
                        />

                    ))
                }
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
