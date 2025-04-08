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
  const currentPath = usePathname();
  // usesession get things from the current authentication session.
  // status == authenticated || unauthenticated || loading
  // data contains the current users name/email/image/etc
  const { status, data: session } = useSession();

  const links: LinkData[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>

        <Flex justify='between'>
          <Box>
            <Link href='/'>
              <BsBugFill className='h-8 w-8' />
            </Link>
          </Box>

          <Flex align='center' gap='3'>
            <ul className='flex flex-1 space-x-6 justify-center'>
              {links.map((item: LinkData) => {

                return <li key={item.href}>
                  <Link
                    className={classNames(
                      item.href == currentPath ? 'text-zinc-900' : 'text-zinc-500',
                      'hover:text-zinc-800 transition-colors'
                    )}
                    href={item.href}>
                    {item.label}
                  </Link>
                </li>
              })}
            </ul>
          </Flex>

          <Flex className='items-center'>
            {status == "authenticated" &&
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar className='cursor-pointer' src={session.user!.image!} fallback='?' size='2' radius='full' />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>

                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            }

            {status == "unauthenticated" &&
              <Link href="/api/auth/signin">Log in</Link>
            }
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar