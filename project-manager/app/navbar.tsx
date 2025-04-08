'use client';

import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsBugFill } from "react-icons/bs";
import { useSession } from "next-auth/react"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Skeleton } from './components';

type LinkData = {
  label: string,
  href: string,
}

const Navbar = () => {


  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>

        <Flex justify='between'>
          <Box>
            <Link href='/'>
              <BsBugFill className='h-8 w-8' />
            </Link>
          </Box>

          <NavLinks />

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname();

  const links: LinkData[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return <Flex align='center' gap='3'>
    <ul className='flex flex-1 space-x-6 justify-center'>
      {links.map((item: LinkData) => {

        return <li key={item.href}>
          <Link
            className={classNames(
              'nav-link',
              { '!text-zinc-900': item.href === currentPath }
            )}
            href={item.href}>
            {item.label}
          </Link>
        </li>
      })}
    </ul>
  </Flex>
}

const AuthStatus = () => {
  // usesession get things from the current authentication session.
  // status == authenticated || unauthenticated || loading
  // data contains the current users name/email/image/etc
  const { status, data: session } = useSession();

  const avatarContainerWidth = '3rem';

  return <Flex className='items-center min-w-8'>
    {status == 'loading' &&
      <Skeleton width={avatarContainerWidth} />
    }

    {status == 'unauthenticated' &&
      <Link className='nav-link self-center' href="/api/auth/signin">Log in</Link>
    }

    {status == 'authenticated' &&
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Box width={avatarContainerWidth}>
            <Avatar className='cursor-pointer' src={session!.user!.image!} fallback='?' size='2' radius='full' />
          </Box>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>
              {session!.user!.email}
            </Text>
          </DropdownMenu.Label>

          <DropdownMenu.Item>
            <Link className='nav-link' href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    }
  </Flex>
}

export default Navbar