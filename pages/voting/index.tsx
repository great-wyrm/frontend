/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, {  useContext, useEffect, useState } from "react";
import Head from 'next/head'


import { Flex, Text } from "@chakra-ui/react";

import useRouter from '../../src/hooks/useRouter';
import useGofp from "../../src/contexts/GoFPContext";
import VotingStagePanel from "../../src/components/VotingStagePanel";
import { useQuery } from "react-query";
import { hookCommon } from "../../src/hooks";
import { queryPublic } from "../../src/utils/http";
import { SessionMetadata } from "../../src/components/GoFPTypes";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const Voting = () => {
  const router = useRouter();
  
  const { sessionId, setSessionId } = useGofp()
  const [metadataUri, setmetadataUri] = useState('')
  const currentStage = 1


  useEffect(() => {
    setmetadataUri(router.query["uri"])
    setSessionId(router.query["sessionId"]) //TODO router.ready ?
  }, [])

  const fetchMetadataUri = async (uri: string) => {
    return queryPublic(uri)
  };

  const sessionMetadata =  useQuery(
    ["get_metadata", metadataUri],
    async () => {
      return fetchMetadataUri(metadataUri).then((res) => {
        console.log(res.data)
        return res.data as SessionMetadata;
      });
    },
    {
      ...hookCommon,
      enabled: !!metadataUri,
    }
  );


  const siteTitle = 'Great Wyrm Voting'
  const AWS_ASSETS_PATH = `https://s3.amazonaws.com/static.simiotics.com/moonstream/assets`



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
        <meta name='og:image' content={`${AWS_ASSETS_PATH}/metadata-image.png`} />
      </Head>
      <Flex direction='column' fontFamily='Space Grotesk'>
        {sessionMetadata.data && currentStage && (
        <Flex direction='column' gap='40px' px={{base: '16px'}} py={{base: '60px'}} color='white'>
          <Flex direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px'>

            <Text fontWeight='700' fontSize='14px'>{sessionMetadata.data.title}</Text>
            <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>
              {sessionMetadata.data.lore}
            </ReactMarkdown>

            <Text fontWeight='700' fontSize='14px' mt='10px'>{sessionMetadata.data.stages[currentStage - 1].title}</Text>
            <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>
              {sessionMetadata.data.stages[currentStage - 1].lore}
            </ReactMarkdown>
          </Flex>
          <VotingStagePanel stage={currentStage} currentStage={currentStage} stageMetadata={sessionMetadata.data.stages[currentStage - 1]}/>
          <Flex direction='column' border='1px solid #4d4d4d' borderRadius='10px' p='15px' gap='10px' fontSize='12px' mt='-20px'>
            <Text fontWeight='700' fontSize='14px'>About Great Wyrm</Text>
            <Text>Great Wyrm is the first fully decentralized RPG. It runs on the Garden of Forking Paths game mechanic. Great Wyrm is similar to choose-your-own-adventure gameplay, only in this case, there can be right and wrong choices. </Text>
            <Text>You can create your own stories behind paths you choose. Form alliances based on the chosen paths. Try to persuade other people to join your alliance or trick them into choosing a different path that doesn’t lead anywhere good. </Text>
          </Flex>
        </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Voting;
