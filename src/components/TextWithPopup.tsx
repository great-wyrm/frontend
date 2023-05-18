import {
  Flex,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const TextWithPopup = ({
  text,
  image,
  title,
  maxLength = 300,
  cutLength = 200,
}: {
  text: string
  title: string
  image?: string
  maxLength?: number
  cutLength?: number
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [shortText, setShortText] = useState('')

  useEffect(() => {
    if (text.length > maxLength) {
      let short = text.slice(0, Math.max(text.indexOf(' ', cutLength), cutLength))
      const punctuations = ['!', '.', ',', '?', ':', ';', '-']
      if (punctuations.includes(short.slice(-1))) {
        short = short.slice(0, -1)
      }
      setShortText(short + ' ...')
    } else {
      setShortText('')
    }
  }, [text])

  return (
    <Flex direction='column'>
      <Text fontWeight='700' fontSize='14px' mb='5px'>
        {title}
      </Text>
      <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>
        {shortText ? shortText : text}
      </ReactMarkdown>

      {shortText && (
        <Text
          mt='-10px'
          w='fit-content'
          color='#F56646'
          fontWeight='700'
          fontSize='12px'
          onClick={onOpen}
          cursor='pointer'
        >
          Read More
        </Text>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg='#1A1D22'
          border='1px solid white'
          borderRadius='20px'
          textColor='white'
          mx='15px'
          maxW='500px'
        >
          <ModalHeader fontFamily='Space Grotesk' fontSize='18px' fontWeight='700'>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir='column' px='10px' gap='20px' fontFamily='Space grotesk' fontSize='12px'>
              {image && <Image alt={'Stage Image'} src={image} border='1px solid 4d4d4d' borderRadius='10px' />}
              <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>
                {text}
              </ReactMarkdown>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button bgColor='#4D4D4D' _hover={{ bg: '#5d5d5d' }} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default TextWithPopup
