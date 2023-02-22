/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'

import { Flex } from '@chakra-ui/react'

import WyrmFooter from './WyrmFooter'

const AWS_ASSETS_PATH = `https://s3.amazonaws.com/static.simiotics.com/moonstream/assets`

export const siteTitle = 'great wyrm'

export default function Layout({ children }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div>
      <Head>
        <link rel='icon' 
          href='/favicon.png' //TODO
        /> 
        <meta
          name='description'
          content='The only player-owned role-playing game in the world. Great Wyrm players have full control of the world we all play in.'
        />
        <meta name='og:title' content={siteTitle} />
        <meta
          name='keywords'
          content='games, gaming' //TODO
        />
        <meta name='og:image' 
          content={`${AWS_ASSETS_PATH}great-wyrm-cover-sm.png`} //TODO
        />
      </Head>
      <Flex minH='100vh' flexDirection='column' justifyContent='space-between' fontFamily='Cinzel'>
        {children}
        <WyrmFooter />
      </Flex>
    </div>
  )
}
