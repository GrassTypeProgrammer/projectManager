import React from 'react'
import NextLink from 'next/link';
import {Link as RadixLink} from '@radix-ui/themes';

interface Props {
    href: string,
    children: string,
}

/**Radix Link has styling that Next Link doesn't, but Radix link doesn't do client navigation, which causes a full reload 
 * when navigating, so we use the NextLink for navigation and the radix link for style in this custom link component
 * */

const Link = ({href, children}: Props) => {
  return (
    // passHref and legacyBehaviour are needed to allow a custom component to be passed as a child to nextlink
   <NextLink href={href} passHref legacyBehavior>
    <RadixLink>
        {children}
    </RadixLink>
   </NextLink>
  )
}

export default Link