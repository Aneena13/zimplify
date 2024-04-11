'use client'
import { AppShell, Divider, Group, NavLink } from '@mantine/core';
import { navItems } from './lib/navbar.constants';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useWhoAmI } from '@/backend/user/user.query';
import { useEffect } from 'react';


export default function DashboardLayout({ children }) {
  const pathName = usePathname()
  const {data: user, isError} = useWhoAmI();

  useEffect(() => {
    console.log('isError', isError, user)
    if (!user) {
      if(isError) {
        console.log('User is not logged in');
        window.location.href = '/sign-in';
      }
    }
  }, [user, isError])

  return (
    <AppShell
      navbar={{
        width: 200,
        breakpoint: 0,
      }}
      padding="md"
    >
      <AppShell.Navbar
        pt={'sm'}
      >
        <AppShell.Section
        >
          <Image
            src="/images/logoWithText.svg"
            alt="Zimplify logo"
            width={180}
            height={45}
            style={{
              cursor: 'pointer',
              margin: '0 10px 0 10px',
            }}
          >
          </Image>
        </AppShell.Section>
        <Divider
          my={'sm'}
        />
        {
          navItems.map(Item => (
            <NavLink
              key={`${Item.label}-${Item.href}`}
              href={Item.href}
              label={Item.label}
              active={pathName === Item.href}
              leftSection={<Item.icon />}
                component={Link}
            />

          ))
        }
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
