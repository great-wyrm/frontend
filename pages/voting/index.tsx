/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from "react";
import Head from 'next/head'


import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useQuery } from "react-query";

import useRouter from '../../src/hooks/useRouter';
import useGofp from "../../src/contexts/GoFPContext";
import VotingStagePanel from "../../src/components/VotingStagePanel";
import { hookCommon } from "../../src/hooks";
import { queryPublic } from "../../src/utils/http";
import { SessionMetadata } from "../../src/components/GoFPTypes";

import TextWithPopup from "../../src/components/TextWithPopup";
import { AWS_ASSETS_PATH } from "../../src/constants";

const GardenABI = require('../../src/web3/abi/GoFPABI.json');
import { GOFPFacet as GardenABIType } from '../../src/web3/contracts/types/GOFPFacet'
import Web3 from "web3";
import useMoonToast from "../../src/components/useMoonToast";



const Voting = () => {
  const router = useRouter()
  
  const { sessionId, setSessionId } = useGofp()
  const [contractAddress, setContractAddress] = useState('')
  const [currentStage, setCurrentStage] = useState(0)
  const [stage, setStage] = useState(0)
  const [isBaseView] = useMediaQuery('(max-width: 768px)')
  const [isLargeView] = useMediaQuery('(min-width: 1440px)')
  const toast = useMoonToast()




  useEffect(() => {
    setContractAddress(router.query['contractAddress'])
    setSessionId(Number(router.query["sessionId"])) 
  }, [])

  const fetchMetadataUri = async (uri: string) => {
    return queryPublic(uri)
  };

  const sessionMetadata =  useQuery(
    ["get_metadata", contractAddress, sessionId],
    async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider('https://wyrm.constellationchain.xyz/http'))    
      const gardenContract: any = new web3.eth.Contract(
        GardenABI
      ) as any as GardenABIType
      gardenContract.options.address = contractAddress

      const sessionInfo = await gardenContract.methods.getSession(sessionId).call();
      const newCurrentStage = await gardenContract.methods.getCurrentStage(sessionId).call();
      if (currentStage !== newCurrentStage) {
        setStage(newCurrentStage)
        setCurrentStage(Number(newCurrentStage))
      }


      return fetchMetadataUri(sessionInfo[5]).then((res) => res.data as SessionMetadata)
    },
    {
      ...hookCommon,
      enabled: !!contractAddress && sessionId > 0,
      onError: (e: Error) => toast(e.message, 'error')
    }
  );

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
        <meta
          name='keywords'
          content='games, gaming'
        />
        <meta name='og:image' content={`${AWS_ASSETS_PATH}/great-wyrm-logo.png`} />
      </Head>
      <Flex userSelect='none' direction='column' alignItems={{base: '', sm: 'center'}} px='16px' justifyContent='center' minH='100vh'>
        {sessionMetadata.data && stage > 0 && (
          <Flex direction='column' fontFamily='Space Grotesk' maxW={{base: '720px', l: '1250'}}>
            <Text mt='20px' px='16px' fontSize='30px' fontWeight='700' w='100%' textAlign='start'>Voting</Text>
            <Flex maxH={{base: '', l: '603px'}} minH='603px' direction={{base: 'column', l: 'row'}} gap={{base: '40px', l: '60px'}} px={{base: '16px'}} py={{base: '40px'}} color='white'>
              <Flex gap='40px' alignItems='top'>
                <Flex overflowY='auto' maxW={{base: '', l: '205px'}} direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap={{base: '10px', sm: '15px'}}  fontSize='12px' flex='1' >
                  <TextWithPopup title={sessionMetadata.data.title} text={sessionMetadata.data.lore} image={sessionMetadata.data.imageUrl} />
                  <TextWithPopup title={sessionMetadata.data.stages[stage - 1].title} text={sessionMetadata.data.stages[stage - 1].lore} image={sessionMetadata.data.stages[stage - 1].imageUrl} />
                </Flex>
                {!isBaseView && !isLargeView && (
                  <Flex direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px' flex='1'>
                    <Text fontWeight='700' fontSize='14px'>About Great Wyrm</Text>
                    <Text>Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there can be right and wrong choices. </Text>
                    <Text>You can create your own stories behind paths you choose. Form alliances based on the chosen paths. Try to persuade other people to join your alliance or trick them into choosing a different path that doesn’t lead anywhere good. </Text>
                  </Flex>
                )}
              </Flex>
              <VotingStagePanel setStage={setStage} sessionId={sessionId} stage={stage} currentStage={currentStage} stageMetadata={sessionMetadata.data.stages[stage - 1]}/>
              {(isBaseView || isLargeView) && (

                <Flex maxW={{base: '', l: '205px'}} direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px'>
                  <Text fontWeight='700' fontSize='14px'>About Great Wyrm</Text>
                  <Text>Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there can be right and wrong choices. </Text>
                  <Text>You can create your own stories behind paths you choose. Form alliances based on the chosen paths. Try to persuade other people to join your alliance or trick them into choosing a different path that doesn’t lead anywhere good. </Text>
              </Flex>
                )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Voting;
