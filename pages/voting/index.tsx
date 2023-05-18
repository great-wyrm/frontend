/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { Flex, Spinner, Text, useMediaQuery } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import useRouter from '../../src/hooks/useRouter'
import useGofp from '../../src/contexts/GoFPContext'
import VotingStagePanel from '../../src/components/VotingStagePanel'
import { hookCommon } from '../../src/hooks'
import { queryPublic } from '../../src/utils/http'
import { SessionMetadata } from '../../src/components/GoFPTypes'
import TextWithPopup from '../../src/components/TextWithPopup'
import { AWS_ASSETS_PATH, CONSTELLATION_GREAT_WYRM_JSON_RPC_URL } from '../../src/constants'

const GardenABI = require('../../src/web3/abi/GoFPABI.json')
import { GOFPFacet as GardenABIType } from '../../src/web3/contracts/types/GOFPFacet'
import Web3 from 'web3'
import useMoonToast from '../../src/components/useMoonToast'

const Voting = () => {
  const router = useRouter()

  const { sessionId, setSessionId } = useGofp()
  const [contractAddress, setContractAddress] = useState('')
  const [stage, setStage] = useState(1)
  const [isBaseView] = useMediaQuery('(max-width: 768px)')
  const [isLargeView] = useMediaQuery('(min-width: 1440px)')
  const toast = useMoonToast()

  useEffect(() => {
    setContractAddress(router.query['contractAddress'])
    setSessionId(Number(router.query['sessionId']))
  }, [])

  const fetchMetadataUri = async (uri: string) => {
    return queryPublic(uri)
  }

  const { selectPath } = useGofp()

  const changeStage = (newStage: number) => {
    selectPath(1)
    setStage(newStage)
  }

  const currentStage = useQuery(
    ['get_current_stage', contractAddress, sessionId],
    async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(CONSTELLATION_GREAT_WYRM_JSON_RPC_URL))
      const gardenContract: any = new web3.eth.Contract(GardenABI) as any as GardenABIType
      gardenContract.options.address = contractAddress
      return gardenContract.methods.getCurrentStage(sessionId).call()
    },
    {
      ...hookCommon,
      enabled: !!contractAddress && sessionId > 0,
      onError: (e: Error) => toast(e.message, 'error'),
    },
  )

  const sessionMetadata = useQuery(
    ['get_metadata', contractAddress, sessionId],
    async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(CONSTELLATION_GREAT_WYRM_JSON_RPC_URL))
      const gardenContract: any = new web3.eth.Contract(GardenABI) as any as GardenABIType
      gardenContract.options.address = contractAddress
      const sessionInfo = await gardenContract.methods.getSession(sessionId).call()
      return fetchMetadataUri(sessionInfo[5]).then((res) => res.data as SessionMetadata)
    },
    {
      ...hookCommon,
      enabled: !!contractAddress && sessionId > 0,
      onError: (e: Error) => toast(e.message, 'error'),
    },
  )

  useEffect(() => {
    if (stage != currentStage.data) {
      selectPath(1)
    }
    if (sessionMetadata.data) {
      if (Number(router.query['stage'])) {
        setStage(Math.min(Number(router.query['stage']), sessionMetadata.data.stages.length))
      } else {
        setStage(Math.min(currentStage.data, sessionMetadata.data.stages.length))
      }
    }
  }, [currentStage.data, sessionMetadata.data])

  const siteTitle = 'Great Wyrm Voting'

  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <title>great wyrm voting</title>
        <meta
          name='description'
          content='The only player-owned role-playing game in the world. Great Wyrm players have full control of the world we all play in.'
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='keywords' content='games, gaming' />
        <meta name='og:image' content={`${AWS_ASSETS_PATH}/great-wyrm-logo.png`} />
      </Head>

      <Flex
        userSelect='none'
        direction='column'
        alignItems={{ base: '', sm: 'center' }}
        px='16px'
        justifyContent='center'
        minH='100vh'
      >
        {sessionMetadata.isLoading && <Spinner />}
        {sessionMetadata.data && (
          <Flex direction='column' fontFamily='Space Grotesk' maxW={{ base: '720px', l: '1250' }}>
            <Text mt='20px' px='16px' fontSize='30px' fontWeight='700' w='100%' textAlign='start'>
              Voting
            </Text>
            <Flex
              maxH={{ base: '', l: '703px' }}
              minH='603px'
              direction={{ base: 'column', l: 'row' }}
              gap={{ base: '40px', l: '60px' }}
              px={{ base: '16px' }}
              py={{ base: '40px' }}
              color='white'
            >
              <Flex gap='40px' alignItems='top'>
                <Flex
                  overflowY='auto'
                  maxW={{ base: '', l: '205px' }}
                  direction='column'
                  border='1px solid #4d4d4d'
                  borderRadius='10px'
                  p='15px'
                  gap={{ base: '10px', sm: '15px' }}
                  fontSize='12px'
                  flex='1'
                >
                  <TextWithPopup
                    title={sessionMetadata.data.title}
                    text={sessionMetadata.data.lore}
                    image={sessionMetadata.data.imageUrl}
                  />
                  <Flex direction='column' gap='10px'>
                    {sessionMetadata.data.stages
                      .filter((_, idx) => idx <= currentStage.data - 1)
                      .map((stage, idx) => {
                        return (
                          <Flex direction='column' gap='3px' mt='5px' key={idx}>
                            <Text>Stage {idx + 1}</Text>
                            <TextWithPopup title={stage.title} text={stage.lore} image={stage.imageUrl} />
                          </Flex>
                        )
                      })}
                  </Flex>
                </Flex>
                {!isBaseView && !isLargeView && (
                  <Flex
                    direction='column'
                    border='1px solid #4d4d4d'
                    borderRadius='10px'
                    p='15px'
                    gap='10px'
                    fontSize='12px'
                    flex='1'
                  >
                    <Text fontWeight='700' fontSize='14px'>
                      About Great Wyrm
                    </Text>
                    <Text>
                      Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game
                      mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there
                      can be right and wrong choices. 
                    </Text>
                    <Text>
                      You can create your own stories behind paths you choose. Form alliances based on the chosen paths.
                      Try to persuade other people to join your alliance or trick them into choosing a different path
                      that doesn’t lead anywhere good. 
                    </Text>
                  </Flex>
                )}
              </Flex>
              {stage > 0 && (
                <VotingStagePanel
                  numberOfStages={sessionMetadata.data.stages.length - 1}
                  setStage={changeStage}
                  sessionId={sessionId}
                  stage={stage}
                  currentStage={currentStage.data}
                  stageMetadata={sessionMetadata.data.stages[stage - 1]}
                />
              )}
              {(isBaseView || isLargeView) && (
                <Flex
                  maxW={{ base: '', l: '205px' }}
                  direction='column'
                  border='1px solid #4d4d4d'
                  borderRadius='10px'
                  p='15px'
                  gap='10px'
                  fontSize='12px'
                >
                  <Text fontWeight='700' fontSize='14px'>
                    About Great Wyrm
                  </Text>
                  <Text>
                    Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game
                    mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there can
                    be right and wrong choices. 
                  </Text>
                  <Text>
                    You can create your own stories behind paths you choose. Form alliances based on the chosen paths.
                    Try to persuade other people to join your alliance or trick them into choosing a different path that
                    doesn’t lead anywhere good. 
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  )
}

export default Voting
