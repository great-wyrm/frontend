import Head from 'next/head'

import { Box, Button, Center, Flex, Image, Spacer, Text, useMediaQuery } from '@chakra-ui/react'

import Layout from '../src/components/greatWyrm/layout'
import useMoonToast from '../src/components/useMoonToast'
import { AWS_ASSETS_PATH  } from '../src/constants'
import { useRouter } from 'next/router'


const assets = {
  coverLg: `${AWS_ASSETS_PATH}/great-wyrm-cover-lg.png`,
  coverSm: `${AWS_ASSETS_PATH}/great-wyrm-cover-sm.png`,
  coverMd: `${AWS_ASSETS_PATH}/great-wyrm-cover-md.png`,
  logo: `${AWS_ASSETS_PATH}/great-wyrm-logo.png`,
  card1Sm: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-1-sm.png`,
  card1L: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-1-l.png`,
  card2Sm: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-2-sm.png`,
  card2L: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-2-l.png`,
  card3Sm: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-3-sm.png`,
  card3L: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-3-l.png`,
  card4Sm: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-4-sm.png`,
  card4L: `${AWS_ASSETS_PATH}/great-wyrm-landing/gw-card-4-l.png`,
  moonLogo: `${AWS_ASSETS_PATH}/great-wyrm-landing/moonstream-logo.png`,
  calderaLogo: `${AWS_ASSETS_PATH}/great-wyrm-landing/caldera-logo.png`,
  ogLogo: `https://s3.amazonaws.com/static.simiotics.com/play/minigames/great-wyrm-landing/op-logo-white1.png`,
}

const gradient = 'linear-gradient(180deg, rgba(26, 29, 34, 0) 63.89%, rgba(26, 29, 34, 0.0100738) 69.1%, rgba(26, 29, 34, 0.0386868) 73.45%, rgba(26, 29, 34, 0.0834265) 77.06%, rgba(26, 29, 34, 0.14188) 80.01%, rgba(26, 29, 34, 0.211635) 82.42%, rgba(26, 29, 34, 0.290279) 84.4%, rgba(26, 29, 34, 0.3754) 86.05%, rgba(26, 29, 34, 0.464584) 87.47%, rgba(26, 29, 34, 0.555419) 88.78%, rgba(26, 29, 34, 0.645493) 90.07%, rgba(26, 29, 34, 0.732393) 91.45%, rgba(26, 29, 34, 0.813706) 93.03%, rgba(26, 29, 34, 0.88702) 94.91%, rgba(26, 29, 34, 0.949922) 97.2%, #1A1D22 100%)'




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
        sessionId: '1'
      },
    })
  }


  return (
    <Layout home={true}>
      <Head>
        <title>great wyrm</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' 
          href='/favicon.png'
        />
      </Head>
      <Flex 
        w='100vw'
        position='relative'
        h={isBaseView ? 'calc(400px + 0.16 * (100vw - 320px))' : '66vw'}
        maxH='962'
        bgSize='cover' 
        bgPosition='center'
        resize='horizontal'
        backgroundImage={`${gradient}, url(${isVerySmallView ? assets.coverSm : (is1440View ? assets.coverMd : assets.coverLg)})`}
      >
        <Image 
          src={assets.logo} 
          w={{base: '150px', sm: '203px', l: '300px'}}
          alt=''
          position='absolute'
          top={{base: '20px', sm: '50px'}}
          mx='auto'
          left='0'
          right='0'
        />

      </Flex>
      <Center>
        <Flex fontFamily='Cinzel' maxW='1440px 'alignItems='center' gap='0'  px={['22px', '54px', '54px', '72px', '101px']} w='100%' direction='column' fontSize={['16px', '18px', '18px']} lineHeight={['20px', '23px', '23px']}>

            <Flex flex='1' direction='column' gap={['20px', '20px', '40px']} pb={{base: '40px', sm: '80px'}} textAlign={'center'} maxW='703px' pt={{base: '20px', sm: '40px'}} >
              <Text fontWeight='700' fontSize={{base: '30px', sm:'40px', l: '50px'}} lineHeight='100%'>Enter the world of< br />Great Wyrm</Text>
              <Text fontFamily='Inter'>The only player-owned role-playing game in the world. Great Wyrm players have full control of the world we all play in.</Text>
              <Flex mt='20px' w={['100%']} direction={['column']} gap='10px' justifyContent='center' alignItems='center'>
                <Button 
                  variant='wyrmButton'
                  color='black' 
                  bg='linear-gradient(92.3deg, #EB8C6A 8.4%, #FFFFFF 126.31%)' 
                  _hover={{bg: 'linear-gradient(263.61deg, #EAA88F -6.84%, #FFFFFF 128.87%)'}}
                  onClick={() => handleClick()}
                  >
                  Become a god
                </Button>
              </Flex>
            </Flex>






          <Flex direction={['column', 'row', 'row']} gap={['40px', '60px', '60px']} pt={{base: '40px', sm: '80px'}} pb={{base: '40px', sm: '80px'}}>
            {isBaseView && (
              <Box borderRadius='15px' border='1px solid white' pt='0' pb='0' px='20px' flex='1' flexShrink='0'>
                <Image objectFit='cover' src={is1440View? assets.card4Sm : assets.card4L} h='450px' minW='270px' mx='auto'/>
              </Box>
            )}
            <Flex direction='column' gap='20px' textAlign={['center', 'center', 'start']} flex='1'>
              <Text fontWeight='700' fontSize={{base: '30px', l: '40px'}} lineHeight='120%'>Act I: An Awakening in Kalash</Text>
              <Text fontFamily='Inter' >What awaits in the dim passageways of the Bismil Mine? Navigating the narrow, 
                torchlit paths through the rock is only the beginning of today's challenges. If you are successful, 
                you will then have to convince a group of dwarf sentries to let you into the newly discovered cave. 
                But how does one sway a stubborn dwarf? And what is making the guards so uneasy?
              </Text>
              <Flex h='100%' alignItems='center'>
                <Text fontFamily='Inter' fontWeight='700'>Want to choose the fate of these adventurers?</Text>
              </Flex>
              <Button 
                  variant='wyrmButton'
                  color='white' 
                  bg='#EB8C6A' 
                  _hover={{bg: '#EAA88F'}}
                  mb={['40px', '0', '0']}
                  onClick={() => handleClick()}
                  >
                  Vote

              </Button>
            </Flex>
            {!isBaseView && (
              <Box borderRadius='15px' border='1px solid white' pt='0' pb='0' px='20px' flex='1' flexShrink='0'>
                <Image objectFit='cover' src={is1440View? assets.card4Sm : assets.card4L} h='450px' minW='270px' mx='auto'/>
              </Box>
            )}
          </Flex>


          <Flex direction={['column', 'row', 'row']} gap={['40px', '60px', '60px']} pt={{base: '40px', sm: '80px'}} pb={{base: '40px', sm: '80px'}}>
            <Box borderRadius='15px' border='1px solid white' pt='54px' pb='0' px='20px' flex='1' flexShrink='0'>
              <Image src={is1440View? assets.card1Sm : assets.card1L} h={{base: '346px', sm: '390px'}} minW='270px' mx='auto'/>
            </Box>
            <Flex direction='column' gap='20px' textAlign={['center', 'center', 'start']} flex='1' flexShrink='1'>
              <Text fontWeight='700' fontSize={{base: '30px', l: '40px'}} lineHeight='120%'>Start your adventure</Text>
              <Text fontFamily='Inter' >Make a character or choose an existing character to add to the game’s lore.</Text> 
              <Text fontFamily='Inter' >Choose a  path to follow.  </Text>
              <Text fontFamily='Inter' >Create your own stories behind the paths you choose. Form alliances based on your choices. Convince other people to join your alliance, or trick them into choosing paths that end in despair.</Text>
              <Spacer />
            <Button 
                variant='wyrmButton'
                color='white' 
                bg='#EB8C6A' 
                _hover={{bg: '#EAA88F'}}
                mb={['40px', '0', '0']}
                mt='20px'
                onClick={primaryAction}
                >
                Make a character
            </Button>
                </Flex>
          </Flex>

          <Flex direction={['column', 'row', 'row']} gap={['40px', '60px', '60px']} pt={{base: '40px', sm: '80px'}} pb={{base: '40px', sm: '80px'}}>
            {isBaseView && (
              <Box borderRadius='15px' border='1px solid white' pt='54px' pb='54' px='20px' flex='1' flexShrink='0'>
                <Image src={is1440View? assets.card2Sm : assets.card2L} h={{base: '346px', sm: '390px'}} minW='270px' mx='auto'/>
              </Box>
            )}
            <Flex direction='column' gap='20px' textAlign={['center', 'center', 'start']} flex='1'>
              <Text fontWeight='700' fontSize={{base: '30px', l: '40px'}} lineHeight='120%'>Become a Game Master</Text>
              <Text fontFamily='Inter' >If creating elaborate adventures for players to embark on is more your thing, become a Game Master.</Text> 
              <Text fontFamily='Inter' >Create new stories. Bring the content you&apos;ve already developed but haven&apos;t had a chance to play through. See ratings of how many people played your sessions.</Text>
              <Text fontFamily='Inter' >Alternatively, become a Lore Master to have the last say on which story lines become canon.</Text>
              <Spacer />
              <Button 
                  variant='wyrmButton'
                  color='white' 
                  bg='#EB8C6A' 
                  _hover={{bg: '#EAA88F'}}
                  mb={['40px', '0', '0']}
                  mt='20px'
                  onClick={primaryAction}
                  >
                  Start creating
              </Button>
            </Flex>
            {!isBaseView && (
              <Box borderRadius='15px' border='1px solid white' pt='54px' pb='54' px='20px' flex='1' flexShrink='0'>
                <Image src={is1440View? assets.card2Sm : assets.card2L} h={{base: '346px', sm: '390px'}} minW='270px' mx='auto'/>
              </Box>
            )} 
          </Flex>

          <Flex direction={['column', 'row', 'row']} gap={['40px', '60px', '60px']} pt={{base: '40px', sm: '80px'}} pb={{base: '40px', sm: '80px'}}>
            <Box borderRadius='15px' border='1px solid white' pt='54px' pb='0' px='20px' flex='1' flexShrink='0' bg='linear-gradient(98.77deg, #1A1D22 18.8%, #EB8C6A 36.58%, #FDDFD8 106.11%), #4D4D4D;'>
              <Image src={is1440View? assets.card3Sm : assets.card3L} h={{base: '346px', sm: '390px'}} minW='270px' mx='auto'/>
            </Box>
            <Flex direction='column' gap='20px' textAlign={['center', 'center', 'start']} flex='1'>
              <Text fontWeight='700' fontSize={{base: '30px', l: '40px'}} lineHeight='120%'>Garden of  Forking Paths</Text>
              <Text fontFamily='Inter' >Great Wyrm runs on the Garden of Forking Paths, a platform which allows anybody to host and run multiplayer choose your own adventure games..</Text> 
              <Text fontFamily='Inter' >You can create content. You can commission content. You can sell and buy content without paying taxes to the game creators. </Text>
              <Spacer />
            <Button 
                variant='wyrmButton'
                color='white' 
                bg='#EB8C6A' 
                _hover={{bg: '#EAA88F'}}
                mb={['40px', '0', '0']}
                mt='20px'
                onClick={primaryAction}
                >
                Explore the story
            </Button>
                </Flex>
          </Flex>

          <Flex direction='column' gap={{base: '20px', sm: '30px'}} pt={{base: '40px', sm: '80px'}} pb={{base: '40px', sm: '80px'}} >
            <Flex direction='column' py={{base: '20px', sm: '40px'}} px={['20px', '20px', '40px', '120px', '182px']} gap='30px' borderRadius='30px' border='1px solid white' textAlign='center'>
              <Text fontWeight='700' fontSize={{base: '24px', sm: '30px', l: '40px'}} lineHeight='120%'>True Open Gaming License</Text>
              <Text fontFamily='Inter'>We value and support content creators. No corporate overlords collect taxes here. All the fees go to content creators, and to support the infrastructure behind the game.</Text>
            {/* </Flex> */}
              <Flex textAlign='center' alignItems='center' justifyContent='center' w='100%' fontFamily='Space Grotesk' fontSize='16px' p='20px' gap={{base: '23px', sm: '30px'}} direction={{base: 'column', sm: 'row'}} borderRadius='20px'>
                <Flex gap='10px' justifyContent='center' alignItems='center'>
                  <Text>made by</Text>
                  <Image src={assets.moonLogo} alt='' w='151px' h='22px'/>
                </Flex>
                <Text mt={{base: '-8px', sm: '0'}}>in&nbsp;partnership&nbsp;with</Text>
                <Flex gap='30px' p='0' justifyContent='center' alignItems='center'>
                  <Image src={assets.calderaLogo} alt='' w='90px' h='16px'/>
                  <Image src={assets.ogLogo} alt='' w='40px'/>
                </Flex>
              </Flex>
            </Flex>
          </Flex>


          <Flex direction='column' gap={{base: '20px', sm: '40px'}} pt={{base: '40px', sm: '80px'}} pb={{base: '40px', sm: '80px'}}>
            <Flex alignItems='center' bg='#EB8C6A' p={{base: '30px', sm: '40px'}} borderRadius='20px' gap={{base: '40px', l: '60px'}} direction={{base: 'column', l: 'row'}} textAlign={{base: 'center', l: 'left'}}>
              <Flex direction='column' gap='20px'>
                <Text fontSize='30px' fontWeight='700' lineHeight='120%'>Join the Great Wyrm community to start the world building and be the first to play</Text>
              </Flex>
              <Button 
                variant='wyrmButton'
                color='black' 
                bg='white' 
                _hover={{bg: '#FCE5DD'}}
                p={['10px', '10px 80px', '10px 80px']}

                onClick={primaryAction}

              >
                Join
              </Button>
            </Flex>


            <Flex alignItems='center' bg='white' color='black' p={{base: '30px', sm: '40px'}}  borderRadius='20px' gap={['20px', '40px', '40px']} direction={['column', 'row', 'row']} textAlign='center'>
              <Text fontFamily='Inter' textAlign={['center']}>The game is now in early access. You can start creating your own content, making your own characters, forming alliances, or apply to be a Game Master.  </Text>  
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Layout>
  )
}
