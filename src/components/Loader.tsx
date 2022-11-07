import { Flex, Heading, Spinner } from '@chakra-ui/react'

import React from 'react'

type StyledLoaderProps = {
  headingText: string
  subHeadingText?: string
}

export const Loader = ({
  headingText,
  subHeadingText,
}: StyledLoaderProps): JSX.Element => (
  <Flex
    justifyItems="center"
    alignItems="center"
    direction="column"
    textAlign="center"
    marginTop="10"
    p={4}
  >
    <Spinner size="lg" />
    <Heading size="md" fontWeight="600" marginY="4">
      {headingText}
    </Heading>
    {subHeadingText && (
      <Heading size="sm" fontWeight="500">
        {subHeadingText}
      </Heading>
    )}
  </Flex>
)

export default Loader
