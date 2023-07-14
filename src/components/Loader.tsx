import { Flex, Heading, Spinner } from '@chakra-ui/react'

import React, { JSX } from 'react'

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
    <Heading fontSize="md" fontWeight="600" marginY="4">
      {headingText}
    </Heading>
    {subHeadingText && (
      <Heading fontSize="sm" fontWeight="500">
        {subHeadingText}
      </Heading>
    )}
  </Flex>
)

export default Loader
