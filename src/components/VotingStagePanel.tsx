import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Button, Flex, IconButton, Spinner, Text, Icon } from "@chakra-ui/react"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { v4 as uuidv4 } from 'uuid'
import { GREAT_WYRM_VOTES_HUMBUG_TOKEN, MOONSTREAM_S3_PUBLIC_DATA_BUCKET, MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX } from "../constants"

import useGofp from "../contexts/GoFPContext"
import hookCommon from "../hooks/hookCommon"
import PathCard from "./GoFPPathCard"
import useMoonToast from "./useMoonToast"

const VotingStagePanel = ({sessionId, stage, currentStage, stageMetadata, setStage}: {sessionId: number, stage: number, currentStage: number, stageMetadata: any, setStage: (stage: number) => void}) => {
  const { generatePathId, selectedPath, selectPath } = useGofp()
  const toast = useMoonToast()
  const [userDidVote, setUserDidVote] = useState(false)

  useEffect(() => {
      setUserDidVote(!!localStorage.getItem(`Voted_${sessionId}_${currentStage}`) || stage != currentStage)
  }, [sessionId, currentStage, stage])


  async function postData(url: string, data = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GREAT_WYRM_VOTES_HUMBUG_TOKEN}`,
    }
    return axios.post(url, data, {headers: headers})
  }

  const postVote = useMutation(
    () => {
      const data = {
            "title": "Vote",
            "content": "Great Wyrm vote",
            "tags": [
                `client_id:${uuidv4()}`,
                `stage:${currentStage}`,
                `game_session_id:${sessionId}`,
                `path:${selectedPath}`
            ]
        }
      return postData('https://spire.bugout.dev/humbug/reports?sync=true', data)
  }, 
  {
    onError: (e: AxiosError) => toast(`${e.message}  ${e.response?.data ? ' - ' + e.response?.data : ''}`, 'error'),
    onSuccess: () => {
      toast('Your vote is counted!','success')
      localStorage.setItem(`Voted_${sessionId}_${currentStage}`, selectedPath)
      setUserDidVote(true)
    }
  },
  )

  const getVotes = async (stageQ: number) => {
    const res = await axios.get(`${MOONSTREAM_S3_PUBLIC_DATA_BUCKET}/${MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX}/great_wyrm/votes/game_sessions.json`)
    const session = res.data.find((session: { game_session_id: string} ) => session.game_session_id === String(sessionId))
    if (!session) { return [] }
    const stageData = session.stages.find((stage: { stage: string; paths: { path: string} []} ) => stage.stage === String(stageQ))
    if (!stageData) { return []} 
    const votes: number[] = []
    stageData.paths.forEach((vote: { path: string} ) => {
      const path = Number(vote.path) - 1
      votes[path] = (votes[path] ?? 0) + 1
    })
    return (votes.map((count) => Math.round((100 * count / stageData.paths.length + Number.EPSILON) * 100) / 100))
  }

  function useVotes() {
    return useQuery(['get_votes', stage], () => getVotes(stage), { ...hookCommon, refetchInterval: 15000 });
  }

  const votes = useVotes();
  

  return (
    <Flex direction='column' position='relative' gap='40px' alignItems='center' px='40px' borderRadius='15px' border='1px solid white' py='40px'>
      <Flex gap='10px'>
        {stage > 1 ? <IconButton aria-label='back' size='10px'  _hover={{bg: '#2d2d2d'}} bg='transparent' color='white' onClick={() => setStage(stage - 1)} icon={<ChevronLeftIcon  />} /> : <Icon visibility='hidden' />}
        <Text 
          p='5px 10px' 
          fontSize='10px'
          borderRadius='10px'
          border='1px solid white'
        >
          {stage === currentStage ? `Active stage - ${stageMetadata.title}` : `Stage ${stage} - ${stageMetadata.title}`}
        </Text>
        {stage < currentStage ? <IconButton aria-label='forward' size='10px'  _hover={{bg: '#2d2d2d'}} bg='transparent' color='white' icon={<ChevronRightIcon />} onClick={() => setStage(stage + 1)}/> : <Icon visibility='hidden' />}
      </Flex>
    <Flex overflowX='auto' maxW='100%' pb='15px' position='relative'  px='15px' id='carousel' className="carousel">
      {stageMetadata.paths.map((path: any, idx: number) => {
        return (
            <PathCard
              showVotes={userDidVote}
              key={idx}
              pathMetadata={path}
              pathIdx={idx}
              pathId={generatePathId(stage - 1, idx)}
              votes={votes.data && votes.data[idx] ? votes.data[idx] : 0}
              winner={(votes.data && votes.data[idx]) ? votes.data[idx] === Math.max(...votes.data.filter((n) => n)) : false}
          />
        )
      })}
    </Flex>
    <Flex 
      maxW='400px' 
      direction='column' 
      border='1px solid white' 
      borderRadius='10px' 
      p='15px'
      gap='10px' 
      fontSize='12px'
      borderColor={userDidVote && votes.data && votes.data[selectedPath - 1] && votes.data[selectedPath - 1] === Math.max(...votes.data.filter((n) => n)) ? '#6DD08E' : 'white'}
    >
      <Text textAlign='center' fontWeight='700' fontSize='14px'>Path {selectedPath} <br /> {stageMetadata.paths[selectedPath - 1].title}</Text>
      <Text>{stageMetadata.paths[selectedPath - 1].lore}</Text>
    </Flex>
    { !userDidVote && (
      <Button maxW='400px' variant='orangeGradient' w='100%' fontWeight='700' fontSize='16' 
        onClick={() => postVote.mutate()}
        disabled={postVote.isLoading}
      >
        {postVote.isLoading ? <Spinner /> : 'Vote'}
      </Button> 
    )}
  </Flex>
  )
}

export default VotingStagePanel
