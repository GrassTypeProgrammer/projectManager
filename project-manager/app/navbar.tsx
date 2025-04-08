'use client';

import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsBugFill } from "react-icons/bs";
import { useSession } from "next-auth/react"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

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

  if (status == 'loading') {
    // return empty element in place of login link to maintain layout
    return <div className='w-8'/>;
  }
  else if (status == 'unauthenticated') {
    return <Link className='nav-link self-center' href="/api/auth/signin">Log in</Link>
  }


  return <Flex className='items-center min-w-8'>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar className='cursor-pointer' src={session!.user!.image!} fallback='?' size='2' radius='full' />
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
  </Flex>
}

export default Navbar