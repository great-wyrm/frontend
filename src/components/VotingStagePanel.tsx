import { Box, Button, Flex, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { v4 as uuidv4 } from 'uuid'

import useGofp from "../contexts/GoFPContext"
import hookCommon from "../hooks/hookCommon"
import PathCard from "./GoFPPathCard"
import useMoonToast from "./useMoonToast"

const VotingStagePanel = ({stage, currentStage, stageMetadata}: {stage: number, currentStage: number, stageMetadata: any}) => {
  const {generatePathId, selectedPath} = useGofp()
  const toast = useMoonToast()
  const userUUID = uuidv4()
  const [maxVotes, setMaxVotes] = useState(100)
  const postVote = useMutation(
    () => {
      const data = {
            "title": "Vote",
            "content": "Great Wyrm vote",
            "tags": [
                `player_id:${userUUID}`,
                `stage:${currentStage}`,
                `game_session_is:133`,
                `path:${selectedPath}`
            ]
        }
      return postData('https://spire.bugout.dev/humbug/reports?sync=true', data)
  }, 
  {
    onSuccess: () => toast('Success','success')
  },
  )

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(response)
    return response.json()
  }

//   curl "https://spire.bugout.dev/humbug/reports?sync=true" \
// --header "Content-Type: application/json" \
// --data '{
//     "title": "Vote",
//     "content": "Great Wyrm vote",
//     "tags": [
//         "player_id:<uuid_of_user_from_local_storage>",
//         "stage:<int_of_stage>",
//         "game_session_is:<uuid_of_game_session>",
//         "path:<int_what_path_was_choosen>"
//     ]
// }'
  
  const getVotes = async () => {
    const MOONSTREAM_S3_PUBLIC_DATA_BUCKET = process.env.NEXT_PUBLIC_MOONSTREAM_S3_PUBLIC_DATA_BUCKET ?? "https://data.moonstream.to"
    const MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX= process.env.NEXT_PUBLIC_MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX ?? "prod"
    const res = await axios.get(`${MOONSTREAM_S3_PUBLIC_DATA_BUCKET}/${MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX}/great_wyrm/votes/game_sessions.json`)
    .then((res) => {
      return res.data.find((session: {game_session_id: string}) => session.game_session_id === '2')
    })
    .then((session: {stages: {stage: number, paths: {path: string}[]}[]}) => {
      return session.stages.map((stage: {stage: number, paths: {path: string}[]}) => {
        const votes: number[] = []
        stage.paths.forEach((vote: {path: string}) => {
          const path = Number(vote.path) - 1
          votes[path] = (votes[path] ?? 0) + 1
        })
        return(votes.map((count) => 100 * count / stage.paths.length))
      })
    })
    return res;
  }

  function useVotes() {
    return useQuery(['get_votes'], getVotes, { ...hookCommon });
  }

  const votes = useVotes();
  useEffect(() => {
    console.log(votes.data)
  }, [votes.data])

  return (
    <Flex direction='column' position='relative' gap='40px' alignItems='center' px='30px' borderRadius='15px' border='1px solid white' py='40px'>
      <Text 
        p='5px 10px' 
        fontSize='10px'
        borderRadius='10px'
        border='1px solid white'
    >
      {`${stage === currentStage ? 'Active stage - ' : ''}Stage ${stage}`}
    </Text>
    <Flex overflowX='auto' maxW='90%' pb='15px' position='relative'  className="carousel">

      {stageMetadata.paths.map((path: any, idx: number) => {
        return (
          <Flex direction='column' alignItems='center' key={idx} gap='5px'>
            <PathCard
              pathMetadata={path}
              pathIdx={idx}
              stageIdx={stage - 1}
              pathId={generatePathId(stage - 1, idx)}
              votes={votes.data && votes.data[stage - 1] && votes.data[stage - 1][idx] ? votes.data[stage - 1][idx] : 0}
              winner={votes.data && votes.data[stage - 1] && votes.data[stage - 1][idx] ? votes.data[stage - 1][idx] === Math.max(...votes.data[stage - 1].filter((n) => n)) : false}
          />
        </Flex>
        )
      })}
    </Flex>
    <Flex direction='column' border='1px solid white' borderRadius='10px' p='15px' gap='10px' fontSize='12px'>
      <Text fontWeight='700' fontSize='14px'>Path {selectedPath} Lore</Text>
      <Text>{stageMetadata.paths[selectedPath - 1].lore}</Text>
    </Flex>
    <Button variant='orangeGradient' w='100%' fontWeight='700' fontSize='16' onClick={() => postVote.mutate()}>Vote</Button>
  </Flex>
  )
}

export default VotingStagePanel
