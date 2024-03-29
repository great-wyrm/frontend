/* eslint-disable @next/next/google-font-display */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link href='https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Space Grotesk' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
