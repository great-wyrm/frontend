import type { AppProps } from 'next/app'
import { useState } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/theme'
import '../src/styles/globals.css'
import { GofpProvider } from '../src/contexts/GoFPContext'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient())

  return (
    <>
          {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy="afterInteractive"
        id="ga-script-1"
        src={"https://www.googletagmanager.com/gtag/js?id=G-770ZF9CZDD"}
      ></Script>
      <Script
        id="ga-script-2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-770ZF9CZDD', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GofpProvider>
          <Component {...pageProps} />
        </GofpProvider>
      </QueryClientProvider>
    </ChakraProvider>
    </>
  )
}

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-770ZF9CZDD"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-770ZF9CZDD');
// </script>
