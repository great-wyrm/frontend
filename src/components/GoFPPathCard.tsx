import React, { useContext, useEffect, useState } from 'react'
import { Flex, Image, Text, Box } from '@chakra-ui/react'

import { PathMetadata, PathStatus } from './GoFPTypes'
import useGofp from '../contexts/GoFPContext'

const PathCard = ({
  pathIdx,
  pathMetadata,
  pathId,
  votes,
  winner,
  showVotes,
}: {
  pathIdx: number
  pathMetadata: PathMetadata
  pathId: string
  votes: number
  winner: boolean
  showVotes: boolean
}) => {
  const { selectedPath, selectPath, sessionId, gardenContractAddress } = useGofp()

  return (
    <Box id={pathId} px={2} onClick={() => selectPath(pathIdx + 1)} className='path-card' cursor='pointer'>
      <Flex flexDirection='column' position='relative' w='122.5px' h='170px' alignItems='center'>
        <Box position='absolute' w='122.5px' h='170px'>
          <svg width='122.5' height='170' viewBox='0 0 100 138' fill='#4C4C4C' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1 8.09388C1 8.09388 6.77761 10.0895 6.7459 12.2739C6.69769 15.5947 6.69769 17.3041 6.69769 17.3041L6.69768 120.696C6.69768 120.696 6.69769 122.405 6.7459 125.726C6.77761 127.91 1 129.906 1 129.906L1.67215 136.343L7.6697 137C7.6697 137 9.28032 131.035 11.9902 131.035H88.0098C90.7197 131.035 92.3303 137 92.3303 137L98.3279 136.343L99 129.906C99 129.906 93.2224 127.91 93.2541 125.726C93.3023 122.405 93.3023 120.696 93.3023 120.696V17.3041C93.3023 17.3041 93.3023 15.5947 93.2541 12.2739C93.2224 10.0895 99 8.09388 99 8.09388L98.3279 1.65679L92.3303 1C92.3303 1 90.7197 6.96489 88.0098 6.96489H11.9902C9.28032 6.96489 7.6697 1 7.6697 1L1.67215 1.65679L1 8.09388Z'
              stroke={showVotes && winner ? '#6DD08E' : 'white'}
              strokeWidth={pathIdx + 1 === selectedPath ? '2' : '1'}
            />
          </svg>
        </Box>
        <Box position='relative' h='90px' w='90px'>
          <Image
            draggable='false'
            alt={pathId}
            src={pathMetadata.imageUrl}
            h='90px'
            w='90px'
            mt={4}
            border='1px solid'
            borderColor='white'
            position='relative'
          ></Image>
          <Text fontSize='12px' color='white' align='center'>
            Path {pathIdx + 1}
          </Text>
          {showVotes && (
            <>
              <Text fontSize='10px' color='white' align='center'>
                {votes}%
              </Text>
              <Flex mt='4px' bg='#353535' borderRadius='20px' h='5px' w='100%' justifyContent='start'>
                <Flex bg={winner ? '#6DD08E' : '#d9d9d9'} borderRadius='20px' w={`${votes}%`} />
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default PathCard
