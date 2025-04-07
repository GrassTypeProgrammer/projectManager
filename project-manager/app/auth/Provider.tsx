'use client'

import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

const AuthProvider = ({children}: PropsWithChildren) => {
  return (
    // Used to gain access to session data
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvider