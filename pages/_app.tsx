import type { AppProps } from 'next/app'
import { useState } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/theme'
import '../src/styles/globals.css'
import { GofpProvider } from '../src/contexts/GoFPContext'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient())

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GofpProvider>
          <Component {...pageProps} />
        </GofpProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
