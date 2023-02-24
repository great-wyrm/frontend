import { Flex, Image, Text, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button, } from "@chakra-ui/react"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const TextWithPopup = ({text, image, title}: {text: string, title: string, image?: string}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontWeight='700' fontSize='14px'>{title}</Text>
      <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>
        {text.length > 500 ? text.slice(0, 400) + ' ... ' : text}
      </ReactMarkdown>

      {text.length > 500 && <Text color='#F56646' fontWeight='700' fontSize='12px' onClick={onOpen}>Read More</Text>}
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg="#1A1D22"
            border="1px solid white"
            borderRadius="20px"
            textColor="white"
            mx='15px'
            maxW='500px'
          >
            <ModalHeader fontFamily='Space Grotesk' fontSize='18px' fontWeight='700'>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir="column" px='10px' gap='20px' fontFamily='Space grotesk' fontSize='12px'>
                {image && (
                    <Image alt={"Stage Image"} src={image} border='1px solid 4d4d4d' borderRadius='10px'/>
                )}
                <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button bgColor="#4D4D4D" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default TextWithPopup
