import Link from 'next/link'
import React from 'react'
import { BsBugFill } from "react-icons/bs";

type LinkData = {
  label: string,
  href: string,
}

const navbar = () => {
  const links: LinkData[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: 'issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      {/* TODO: Replace with a logo */}
      <Link href='/'>
        <BsBugFill className='h-8 w-8' />
      </Link>

      <ul className='flex flex-1 space-x-6 justify-center'>
        {links.map((item: LinkData) => {
          return <li key={item.href}>
            <Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href={item.href}>
              {item.label}
            </Link>
          </li>
        })}
      </ul>
    </nav>
  )
}

export default navbar