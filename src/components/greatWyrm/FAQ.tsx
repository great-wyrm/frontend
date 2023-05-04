import { Accordion, Link, Text } from "@chakra-ui/react"

import FAQItem from "./FAQItem"

const FAQ = ({...props} : {[x: string]: any }) => {
  return (
  <Accordion allowMultiple w='100%' {...props} fontWeight='400'>
    <FAQItem heading="How do you play Great Wyrm?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        Great Wyrm is a text-based RPG. Right now the main gameplay is similar to a Dungeons and Dragons session — you role play
         as your character on <Link href='https://discord.gg/knBnttUPqH' target='_blank'>Discord</Link> then you choose your action for a particular game stage on-chain through our interface.<br /><br />
      </Text>
      <Text>
        Then you get your on-chain rewards if you win or a unique token if you’ve chosen a special path.<br /><br />
      </Text>
      <Text>
        There will be more economic loops and game modes added to the game in the near future. 
      </Text>
    </FAQItem>
    <FAQItem heading="Do I need a character to play?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        Yep.
      </Text>
    </FAQItem>
    <FAQItem heading="How to create a character?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        You can create your character&apos;s backstory and avatar yourself or through a commission. After you join our <Link href='https://discord.gg/knBnttUPqH' target='_blank'>Discord</Link> , you 
        can request a character token to represent your character on-chain.<br /><br />
      </Text>
      <Text>
        Alternatively, you can join our Discord and request a pre-made character to use.
      </Text>
    </FAQItem>
    <FAQItem heading="What blockchain is the game on?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        The game is currently run on the Wyrm chain. <Link href='https://guide.greatwyrm.xyz/beginners-rulebook/first-time-setup/the-wyrm-chain' target='_blank'>
          Here</Link>&apos;s how to add it to MetaMask. There are no gas fees on Wyrm chain at 
        the moment. <br /><br />
      </Text>
      <Text>
        We are planning to migrate most of the game to Polygon in the future.
      </Text>
    </FAQItem>
    <FAQItem heading="Is it free to play?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        As of right now - yes. You can still get a free character token and the Wyrm chain has zero transaction fees.<br /><br />
      </Text>
      <Text>
        We do not plan to have an expensive entry barrier in the future either.      
      </Text>
    </FAQItem>
    <FAQItem heading="Can I buy Great Wyrm NFTs?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        You will be able to buy character tokens later on and there will be other in-game on-chain items.<br /><br />
      </Text>
      <Text>
        Right now, you can get character tokens for free and other tokens can only be earned through gameplay.<br /><br />
      </Text>
      <Text>
        Character tokens are not traditional NFTs because you have full control of the metadata.
      </Text>
    </FAQItem>
    <FAQItem heading="I like to read, where can I read the full Great Wyrm lore and backstory?" fontSize={{base: '16px', sm: '18px'}} fontFamily='Inter' lineHeight='140%'>
      <Text>
        See <Link href='https://guide.greatwyrm.xyz/players-handbook/what-is-great-wyrm' target='_blank'>
          the Handbook</Link> and <Link href='https://guide.greatwyrm.xyz/the-lore/settings' target='_blank'>
            World Lore.</Link>
      </Text>
    </FAQItem>
  </Accordion>
  )
}

export default FAQ
