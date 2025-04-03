'use client';

import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsBugFill } from "react-icons/bs";

type LinkData = {
  label: string,
  href: string,
}

const Navbar = () => {
  const currentPath = usePathname();
  
  const links: LinkData[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <BsBugFill className='h-8 w-8' />
      </Link>

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
    </nav>
  )
}

export default Navbar