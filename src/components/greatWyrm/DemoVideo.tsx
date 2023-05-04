import { Flex, Image, Text } from "@chakra-ui/react";
import { AWS_ASSETS_PATH } from "../../constants";

const assets = {
  youtubeIcon: `${AWS_ASSETS_PATH}/great-wyrm-landing/youtube-icon.png`,
}

const DemoVideo = ({...props}: {[x: string]: any }) => {
  return (
    <Flex h={{base: '160px', sm: '250px', l: '332px'}} py='42px' w={{base: '100%', sm: '500px', l: '661px'}} direction='column' borderRadius='20px' border='2px solid' borderColor='greatWyrm.frame' justifyContent='center' alignItems='center' gap='5px' {...props}>
      <Image h='40px' src={assets.youtubeIcon} alt='youtube icon' />
      <Text fontWeight='300px' fontFamily='Inter' color='greatWyrm.frame' fontSize={{base: '16px', sm: '18px'}} lineHeight='1' align='center'>
        demo video<br />coming soon...
      </Text>
    </Flex>
  )
}

export default DemoVideo;
