import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { AccordionButton, AccordionItem, AccordionPanel, Box, Flex } from '@chakra-ui/react'

const FAQItem = ({ heading, children, ...props }: { heading: string; children: React.ReactNode; [x: string]: any }) => {
  return (
    <AccordionItem border='none' {...props}>
      {({ isExpanded }) => (
        <>
          <AccordionButton p='12px 0px'>
            <Flex
              p='0'
              mr='8px'
              as='span'
              flex='1'
              textAlign='left'
              fontSize={{ base: '18px', sm: '20px' }}
              lineHeight='150%'
              fontWeight='700'
            >
              {heading}
            </Flex>
            {isExpanded ? <MinusIcon w='32px' /> : <AddIcon w='32px' />}
          </AccordionButton>
          <AccordionPanel p='16px 0px'>{children}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default FAQItem
