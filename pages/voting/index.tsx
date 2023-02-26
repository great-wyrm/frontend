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
import { AWS_ASSETS_PATH, GOFP_METADATA_PATH } from "../../src/constants";



const Voting = () => {
  const router = useRouter()
  
  const { sessionId, setSessionId } = useGofp()
  const [metadataUri, setmetadataUri] = useState('')
  const currentStage = 3
  const [isBaseView] = useMediaQuery('(max-width: 768px)')
  const [isLargeView] = useMediaQuery('(min-width: 1440px)')




  useEffect(() => {
    setmetadataUri(`${GOFP_METADATA_PATH}/${router.query["uri"]}`)
    setSessionId(router.query["sessionId"]) 
  }, [])

  const fetchMetadataUri = async (uri: string) => {
    return queryPublic(uri)
  };

  const sessionMetadata =  useQuery(
    ["get_metadata", metadataUri],
    async () => {
      return fetchMetadataUri(metadataUri).then((res) => {
        return res.data as SessionMetadata;
      });
    },
    {
      ...hookCommon,
      enabled: !!metadataUri,
    }
  );


  const siteTitle = 'Great Wyrm Voting'



  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='Moonstream provides economic infrastructure for web3 games. Gather actionable data with our web3 data analytics. Act on it with our on-chain mechanics. Watch your economy flourish.'
        />
        <meta name='og:title' content={siteTitle} />
        <meta
          name='keywords'
          content='analytics, blockchain analytics, protocol, protocols, blockchain, crypto, data, NFT gaming, smart contracts, web3, smart contract, ethereum, polygon, matic, transactions, defi, finance, decentralized, mempool, NFT, NFTs, DAO, DAOs, cryptocurrency, cryptocurrencies, bitcoin, blockchain economy, blockchain game, marketplace, blockchain security, loyalty program, Ethereum bridge, Ethereum bridges, NFT game, NFT games'
        />
        <meta name='og:image' content={`${AWS_ASSETS_PATH}/great-wyrm-logo.png`} />
      </Head>
      <Flex direction='column' alignItems={{base: '', sm: 'center'}} px='16px' justifyContent='center' minH='100vh'>
        <Flex direction='column' fontFamily='Space Grotesk' maxW={{base: '720px', l: '1250'}}>
        
          <Text mt='20px' px='16px' fontSize='30px' fontWeight='700' w='100%' textAlign='start'>Voting</Text>
          {sessionMetadata.data && currentStage && (
          <Flex direction={{base: 'column', l: 'row'}} gap={{base: '40px', l: '60px'}} px={{base: '16px'}} py={{base: '40px'}} color='white'>
            <Flex gap='40px' alignItems='top'>
              <Flex maxW={{base: '', l: '205px'}} direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px' flex='1'>
                <TextWithPopup title={sessionMetadata.data.title} text={sessionMetadata.data.lore} image={sessionMetadata.data.imageUrl} />
                <TextWithPopup title={sessionMetadata.data.stages[currentStage - 1].title} text={sessionMetadata.data.stages[currentStage - 1].lore} image={sessionMetadata.data.stages[currentStage - 1].imageUrl} />
              </Flex>
              {!isBaseView && !isLargeView && (
                <Flex direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px' flex='1'>
                  <Text fontWeight='700' fontSize='14px'>About Great Wyrm</Text>
                  <Text>Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there can be right and wrong choices. </Text>
                  <Text>You can create your own stories behind paths you choose. Form alliances based on the chosen paths. Try to persuade other people to join your alliance or trick them into choosing a different path that doesn’t lead anywhere good. </Text>
                </Flex>
              )}
            </Flex>
            <VotingStagePanel sessionId={sessionId} stage={currentStage} currentStage={currentStage} stageMetadata={sessionMetadata.data.stages[currentStage - 1]}/>
            {(isBaseView || isLargeView) && (

              <Flex maxW={{base: '', l: '205px'}} direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px'>
                <Text fontWeight='700' fontSize='14px'>About Great Wyrm</Text>
                <Text>Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there can be right and wrong choices. </Text>
                <Text>You can create your own stories behind paths you choose. Form alliances based on the chosen paths. Try to persuade other people to join your alliance or trick them into choosing a different path that doesn’t lead anywhere good. </Text>
            </Flex>
              )}
          </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default Voting;
