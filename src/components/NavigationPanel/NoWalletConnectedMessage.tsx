import { Flex, Heading } from '@chakra-ui/react'
import { LinkIcon } from '@heroicons/react/outline'
import React from 'react'

const NoWalletConnectedMessage: React.FC = () => {
  return (
    <Flex
      justifyItems="center"
      alignItems="center"
      direction="column"
      textAlign="center"
      marginTop="10"
      p={4}
    >
      <LinkIcon width="48" />
      <Heading fontSize="md" fontWeight="600" marginY="4">
        No wallet connected
      </Heading>
      <Heading fontSize="sm" fontWeight="500">
        Please connect a wallet to begin
      </Heading>
    </Flex>
  )
}

export default NoWalletConnectedMessage
