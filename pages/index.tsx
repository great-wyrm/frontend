import Head from 'next/head'

import { Box, Button, Center, Flex, Image, Text, useMediaQuery, Link } from '@chakra-ui/react'

import Layout from '../src/components/greatWyrm/layout'
import useMoonToast from '../src/components/useMoonToast'
import { AWS_ASSETS_PATH } from '../src/constants'
import { useRouter } from 'next/router'

import FAQ from '../src/components/greatWyrm/FAQ'

const assets = {
  coverLg: `${AWS_ASSETS_PATH}/great-wyrm-cover-lg.png`,
  coverSm: `${AWS_ASSETS_PATH}/great-wyrm-cover-sm.png`,
  coverMd: `${AWS_ASSETS_PATH}/great-wyrm-cover-md.png`,
  logo: `${AWS_ASSETS_PATH}/great-wyrm-logo.png`,
  card1Sm: `${AWS_ASSETS_PATH}/gw-card-1-sm.png`,
  card1L: `${AWS_ASSETS_PATH}/gw-card-1-l.png`,
  card2Sm: `${AWS_ASSETS_PATH}/gw-card-2-sm.png`,
  card2L: `${AWS_ASSETS_PATH}/gw-card-2-l.png`,
  card3Sm: `${AWS_ASSETS_PATH}/gw-card-3-sm.png`,
  card3L: `${AWS_ASSETS_PATH}/gw-card-3-l.png`,
  card4Sm: `${AWS_ASSETS_PATH}/gw-card-4-sm.png`,
  card4L: `${AWS_ASSETS_PATH}/gw-card-4-l.png`,
  moonLogo: `${AWS_ASSETS_PATH}/moonstream-logo.png`,
  calderaLogo: `${AWS_ASSETS_PATH}/caldera-logo.png`,
  pastStages: `${AWS_ASSETS_PATH}/past-stages.png`,
  ogLogo: `${AWS_ASSETS_PATH}/op-logo-white1.png`,
}

const gradient =
  'linear-gradient(180deg, rgba(26, 29, 34, 0) 63.89%, rgba(26, 29, 34, 0.0100738) 69.1%, rgba(26, 29, 34, 0.0386868) 73.45%, rgba(26, 29, 34, 0.0834265) 77.06%, rgba(26, 29, 34, 0.14188) 80.01%, rgba(26, 29, 34, 0.211635) 82.42%, rgba(26, 29, 34, 0.290279) 84.4%, rgba(26, 29, 34, 0.3754) 86.05%, rgba(26, 29, 34, 0.464584) 87.47%, rgba(26, 29, 34, 0.555419) 88.78%, rgba(26, 29, 34, 0.645493) 90.07%, rgba(26, 29, 34, 0.732393) 91.45%, rgba(26, 29, 34, 0.813706) 93.03%, rgba(26, 29, 34, 0.88702) 94.91%, rgba(26, 29, 34, 0.949922) 97.2%, #1A1D22 100%)'

const tutorial = [
  'Think of a character you want to play — their backstory and image. Or skip and proceed to step 2.',
  'Join our Discord. Introduce your character or request a premade one. We’ll give you a character token. ',
  'Look out for announcements about game sessions on Discord.',
  'Role play as your character.',
  'Choose your path in Garden of Forking Paths.',
  'Gain rewards as you play.',
]

export default function Home() {
  const [isVerySmallView] = useMediaQuery('(max-width: 450px)')
  const [is1440View] = useMediaQuery('(max-width: 1440px)')
  const [isBaseView] = useMediaQuery('(max-width: 768px)')
  const toast = useMoonToast()
  const primaryAction = () => {
    window.open('https://discord.com/invite/knBnttUPqH')
  }

  const router = useRouter()

  const handleClick = () => {
    router.push({
      pathname: '/voting',
      query: {
        contractAddress: '0x42A8E82253CD19EF8274D48fC0bC89cdf1B4425b',
        sessionId: '1',
      },
    })
  }

  return (
    <Layout home={true}>
      <Head>
        <title>great wyrm</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Flex
        w='100vw'
        position='relative'
        h={isBaseView ? 'calc(400px + 0.16 * (100vw - 320px))' : '66vw'}
        maxH='962'
        bgSize='cover'
        bgPosition='center'
        resize='horizontal'
        backgroundImage={`${gradient}, url(${isVerySmallView ? assets.coverSm : is1440View ? assets.coverMd : assets.coverLg})`}
      >
        <Image
          src={assets.logo}
          w={{ base: '150px', sm: '203px', l: '300px' }}
          alt=''
          position='absolute'
          top={{ base: '20px', sm: '50px' }}
          mx='auto'
          left='0'
          right='0'
        />
      </Flex>
      <Center>
        <Flex
          fontFamily='Cinzel'
          maxW='660px '
          alignItems='center'
          gap='0'
          px={{base: '22px', sm: '0'}}
          w='100%'
          direction='column'
          fontSize={['16px', '18px', '18px']}
          lineHeight={['20px', '23px', '23px']}
        >
          <Flex
            flex='1'
            direction='column'
            gap={['20px', '20px', '40px']}
            pb={{ base: '40px', sm: '80px' }}
            textAlign={'center'}
            maxW='660px'
            pt={{ base: '20px', sm: '40px' }}
          >
            <Text fontWeight='700' fontSize={{ base: '30px', sm: '40px', l: '50px' }} lineHeight='100%'>
              Enter the world of
              <br />
              Great Wyrm
            </Text>
            <Text fontFamily='Inter'>
            A fully on-chain fantasy text-based RPG where {isBaseView ? '' : <br />}you create history and lore with your actions.
            </Text>
            <Flex mt='20px' w={['100%']} direction={['column']} gap='10px' justifyContent='center' alignItems='center'>
              <Link minW={{base: '100%', sm: '0'}} href='https://guide.greatwyrm.xyz/beginners-rulebook/first-time-setup' target='_blank'>
              <Button
                variant='wyrmButton'
                color='black'
                bg='linear-gradient(92.3deg, #EB8C6A 8.4%, #FFFFFF 126.31%)'
                _hover={{ bg: 'linear-gradient(263.61deg, #EAA88F -6.84%, #FFFFFF 128.87%)' }}
                textTransform='uppercase'
              >
                beginner’s rulebook
              </Button>
              </Link>
            </Flex>
          </Flex>
          {/* <DemoVideo /> */}


          <Text variant='title'>What is great wyrm?</Text>
          <Text variant='paragraph'>Great Wyrm is a fully on-chain fantasy 
          RPG teeming with dwarves, elves, and dragons. The story begins in the Kingdom of Reda, where political tension erupts into chaos as the 
          discovery of a dragon egg–wait, dragons are real??–brings magic to a bleak and non-magical world.<br /><br />
          In Great Wyrm’s first act, players explore Reda and its neighboring lands, battle ravenous beasts, and forge alliances with monarchs,
           usurpers, rebels, and guilds. As they play, they  accrue in-world assets, such as experience, influence, items, and favor, that allow
            them to develop their characters and increase their riches.</Text>
          <Link href='https://guide.greatwyrm.xyz/players-handbook/what-is-great-wyrm' target='_blank'>
          <Button
            variant='wyrmButton'
            color='white'
            bg='#EB8C6A'
            _hover={{ bg: '#EAA88F' }}
            mt={{base: '40px', sm: '60px'}}
          >
            The great wyrm handbook
          </Button>
          </Link>



          <Image w={{base: '300px', md: '366px', l: '600px'}} mt={{base: '50px', sm: '130px'}} src={assets.pastStages} alt='' />
          <Text variant='title'>The story so far...</Text>
          <Text variant='paragraph'>
            In the first-ever Great Wyrm adventure, “The Discovery,” a small band of treasure hunters braved the darkness of Kalash’s
             copper mines and found something that will change their world forever: a dragon egg, left slumbering in the shadows for centuries.<br /><br />
            There has never been magic in the muddy alleys of Kalash before.<br /><br />
            Whether this wyrmling means hope or destruction for the Kingdom of Reda, right now its fate is in the hands of a few unlikely heroes–and in yours!
          </Text>
          <Link
            href='https://greatwyrm.xyz/voting/?contractAddress=0x42A8E82253CD19EF8274D48fC0bC89cdf1B4425b&sessionId=1&stage=1'
            target='_blank'
          >
            <Button
              variant='wyrmButton'
              color='white'
              bg='#EB8C6A'
              _hover={{ bg: '#EAA88F' }}
              mt={{ base: '40px', sm: '60px' }}
            >
              Find out more
            </Button>
          </Link>
          <Box mt={{base: '80px', sm: '160px'}} borderRadius='15px' border='1px solid' borderColor='greatWyrm.frame' pt='54px' pb='0' w='100%'>
            <Image src={is1440View ? assets.card1Sm : assets.card1L} h={{ base: '346px', sm: '390px' }} minW='260px' mx='auto' />
          </Box>
          <Text variant='title'>Start your adventure</Text>
          <Text variant='paragraph' my={{base: '30px', sm: '40px'}} align='center' fontWeight='700'>How do you start playing?</Text>
          <Flex gap='20px' direction='column' textAlign='center' maxW='320px'>
            {tutorial.map((step, idx) => (
              <Flex direction='column' gap='10px' key={idx} alignItems='center'>
                <Flex borderRadius='50%' w='30px' h='30' border='1px solid #EB8C6A' alignItems='center' justifyContent='center'>
                  <Text fontSize='14px'>
                    {idx + 1}
                  </Text>
                </Flex>
                {idx !== 1 ? (<Text variant='paragraph' mt='0' textAlign='center'>
                  {step}
                </Text>) : (<Text variant='paragraph' mt='0' textAlign='center'>
                  Join our Discord. Introduce your character or request <Link href='https://guide.greatwyrm.xyz/the-lore/characters/unclaimed-characters-from-the-discovery' target='_blank'>a premade one</Link>. We’ll give you a character token. 
                </Text>

                )}
              </Flex>
            ))}
          </Flex>
          <Link href='https://discord.gg/knBnttUPqH' target='_blank'>
            <Button
              variant='wyrmButton'
              color='white'
              bg='#EB8C6A'
              _hover={{ bg: '#EAA88F' }}
              mt={{base: '40px', sm: '60px'}}
              >
              get a character
            </Button>
          </Link>
          <Text variant='title'>faq</Text>
          <FAQ mt={{base: '40px', sm: '60px'}}/>
          <Box borderRadius='15px' border='1px solid #FCE5DD' mt={{base: '80px', sm: '160px'}} pt='54px' pb='54' w='100%'>
            <Image src={is1440View ? assets.card2Sm : assets.card2L} h={{ base: '346px', sm: '390px' }} minW='260px' mx='auto' />
          </Box>
          <Text variant='title'>Economy and politics</Text>
          <Text variant='paragraph'>We are building a full-fledged on-chain economy and several game modes to support it.<br /><br />
            Great Wyrm is a highly political game. You can enjoy influencing the game’s world by both adventuring and making political decisions. <br /><br />
            The main action is set in the Kingdom of Reda. It’s ruled over by Queen Seraphima, who has just come of age. Until her majority, the 
            kingdom was ruled by her regent and uncle, Duke Forobor. You can chose to support either one of them.<br /><br />
            Currently, plotlines are unfolding in two places within the kingdom: the capital city of Heelis, and the mining town of Kalash.
          </Text>
          <Link href='https://docs.google.com/document/d/1Qt8qQySghspPtIegsiqO_YHNhOBja6x-gG2casLng80/' target='_blank'>
            <Button
              variant='wyrmButton'
              color='white'
              bg='#EB8C6A'
              _hover={{ bg: '#EAA88F' }}
              mt={{base: '40px', sm: '60px'}}
              >
              read more...
            </Button>
          </Link>
          <Box
              mt={{base: '80px', sm: '160px'}}
              borderRadius='15px'
              border='1px solid white'
              pt='54px'
              pb='0'
              px='20px'
              flex='1'
              flexShrink='0'
              bg='linear-gradient(98.77deg, #1A1D22 18.8%, #EB8C6A 36.58%, #FDDFD8 106.11%), #4D4D4D;'
            >
              <Image src={is1440View ? assets.card3Sm : assets.card3L} h={{ base: '346px', sm: '390px' }} minW='270px' mx='auto' />
          </Box>
          <Text variant='title'>Types of games</Text>
          <Text variant='paragraph'>
            <b>Long sessions</b> are longer RPG campaigns. The stories tie into the ongoing plotline of Great Wyrm. 
            An example of a finished full-length session:&nbsp;
            <Link href='https://greatwyrm.xyz/voting/?contractAddress=0x42A8E82253CD19EF8274D48fC0bC89cdf1B4425b&sessionId=1' target='_blank'>
              The Discovery</Link><br /><br />
            <b>Short sessions</b> are games built around a single decision. Examples of this are
             the <Link href='https://guide.greatwyrm.xyz/players-handbook/types-of-games/the-reda-games' target='_blank'>Reda Games</Link>, the 
            Garden of Forking Paths, upcoming boss fights, and other game modes that are currently in the works. 
            We often use them to test new mechanics and types of gameplay.<br /><br />
            You can join these sessions through Discord and you’ll be able to create your own sessions in the future.
          </Text>
          <Link href='https://discord.gg/knBnttUPqH' target='_blank'>
            <Button
              variant='wyrmButton'
              color='white'
              bg='#EB8C6A'
              _hover={{ bg: '#EAA88F' }}
              mt={{base: '40px', sm: '60px'}}
              >
              start playing
            </Button>
          </Link>
          <Flex
              mt={{base: '80px', sm: '160px'}}
              alignItems='center'
              bg='#EB8C6A'
              p={{ base: '30px', sm: '40px' }}
              borderRadius='20px'
              border='2px solid #FCE5DD'
              gap='40px'
              direction='column'
              textAlign='center'
            >
              <Flex direction='column' gap='20px'>
                <Text fontSize='30px' fontWeight='700' lineHeight='120%'>
                  Join the Great Wyrm community to start the world building and be the first to play
                </Text>
              </Flex>
              <Button
                variant='wyrmButton'
                color='black'
                bg='white'
                border='2px solid #FCE5DD'
                _hover={{ bg: '#FCE5DD' }}
                p={['10px', '10px 80px', '10px 80px']}
                onClick={primaryAction}
              >
                Join
              </Button>
            </Flex>
            <Flex
              alignItems='center'
              bg='white'
              color='black'
              p={{ base: '30px', sm: '40px' }}
              borderRadius='20px'
              textAlign='center'
              border='2px solid #FCE5DD'
              mt='20px'
            >
              <Text fontFamily='Inter' textAlign={['center']}>
                The game is now in early access. You can start creating your own content, making your own characters, forming alliances, or
                apply to be a Game Master.{' '}
              </Text>
            </Flex>
            <Flex
                textAlign='center'
                alignItems='center'
                justifyContent='center'
                w='100%'
                fontFamily='Space Grotesk'
                fontSize='16px'
                p='20px'
                gap={{ base: '23px', sm: '25px' }}
                direction={{ base: 'column', sm: 'row' }}
                borderRadius='20px'
                mt='20px'
                mb='40px'
                border='1px solid white'
              >
                <Flex gap='10px' justifyContent='center' alignItems='center'>
                  <Text>made by</Text>
                  <Image src={assets.moonLogo} alt='' w='151px' h='22px' />
                </Flex>
                <Text mt={{ base: '-8px', sm: '0' }}>in&nbsp;partnership&nbsp;with</Text>
                <Flex gap='20px' p='0' justifyContent='center' alignItems='center'>
                  <Image src={assets.calderaLogo} alt='' w='90px' h='16px' />
                  <Image src={assets.ogLogo} alt='' w='40px' />
                </Flex>
            </Flex>
        </Flex>
      </Center>
    </Layout>
  )
}
