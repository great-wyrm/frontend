/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { Menu, MenuItem, MenuList, Image, MenuButton, Button, Icon } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { MdOutlineLaptopMac } from 'react-icons/md'

import Web3Context from '../contexts/Web3Context/context'

const ChainSelector = () => {
  const web3Provider = useContext(Web3Context)
  return (
    <Menu>
      <MenuButton
        h='36px'
        borderRadius='10px'
        as={Button}
        textDecoration='none'
        _active={{ textDecoration: 'none', backgroundColor: 'black.300' }}
        _focus={{ textDecoration: 'none', backgroundColor: 'black.300' }}
        _hover={{ textDecoration: 'none', fontWeight: '700' }}
        fontSize={{ base: '10px', sm: '12px', md: '16px' }}
        rightIcon={<ChevronDownIcon />}
        leftIcon={
          ['ethereum', 'mumbai', 'polygon'].includes(web3Provider?.targetChain?.name ?? '') ? (
            <Image
              display={'inline'}
              alt='chain'
              h={{ base: '16px', sm: '18px', md: '24px' }}
              mr={0}
              src={
                web3Provider.targetChain?.name === 'ethereum'
                  ? 'https://s3.amazonaws.com/static.simiotics.com/moonstream/assets/ethereum/eth-diamond-rainbow.png'
                  : web3Provider.targetChain?.name === 'localhost'
                  ? ''
                  : 'https://s3.amazonaws.com/static.simiotics.com/moonstream/assets/matic-token-inverted-icon.png'
              }
            ></Image>
          ) : (
            ''
          )
        }
        color='white'
        variant='outline'
      >
        {web3Provider.targetChain?.name ?? 'Chain selector'}
      </MenuButton>
      <MenuList color='white' borderRadius='30px' border='1px solid white'>
        <MenuItem
          onClick={() => {
            web3Provider.changeChain('ethereum')
          }}
        >
          <Image
            alt='ethereum'
            h='24px'
            mr={6}
            src='https://s3.amazonaws.com/static.simiotics.com/moonstream/assets/eth-diamond-rainbow.png'
          ></Image>
          Ethereum
        </MenuItem>
        <MenuItem
          onClick={() => {
            web3Provider.changeChain('polygon')
          }}
        >
          <Image
            alt='matic'
            h='24px'
            mr={4}
            src='https://s3.amazonaws.com/static.simiotics.com/moonstream/assets/matic-token-inverted-icon.png'
          ></Image>
          Polygon
        </MenuItem>
        <MenuItem
          onClick={() => {
            web3Provider.changeChain('mumbai')
          }}
        >
          <Image
            alt='matic'
            h='24px'
            mr={4}
            src='https://s3.amazonaws.com/static.simiotics.com/moonstream/assets/matic-token-inverted-icon.png'
          ></Image>
          Mumbai
        </MenuItem>
        <MenuItem
          onClick={() => {
            web3Provider.changeChain('localhost')
          }}
        >
          <Icon h='24px' mr={4} as={MdOutlineLaptopMac} />
          Localhost
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default ChainSelector
