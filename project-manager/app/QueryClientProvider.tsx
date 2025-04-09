'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'


// queryClient contains a cache for storing data gotten from the backend
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    // ReactQueryClientProvider uses context to share the client component with the component tree but context requires a 
    //    client component, which is why this is in it's own component. 
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider