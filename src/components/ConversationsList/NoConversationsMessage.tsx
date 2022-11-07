import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const NoConversationsMessage = (): JSX.Element => {
  return (
    <Flex
      justifyItems="center"
      alignItems="center"
      direction="column"
      textAlign="center"
      p={4}
    >
      <Heading size="md" fontWeight="600" marginY="4">
        Your message list is empty
      </Heading>
      <Heading size="sm" fontWeight="500">
        There are no messages for this address
      </Heading>
    </Flex>
  )
}

export default NoConversationsMessage
