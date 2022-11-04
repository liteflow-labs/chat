import { ChakraProvider } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { getAddress } from '@ethersproject/address'
import { Client, Message, Stream } from '@xmtp/xmtp-js'
import React, { useCallback, useEffect, useState } from 'react'
import { XmtpContext, XmtpContextType } from '../contexts/xmtp'
import { createClient, listenToStream } from '../helpers'
import useMessageStore from '../hooks/useMessageStore'

type XmtpProviderProps = Pick<
  XmtpContextType,
  'signer' | 'lookupAddress' | 'onUserClick'
> & {
  theme?: Dict
}

export const XmtpProvider: React.FC<XmtpProviderProps> = ({
  children,
  signer,
  lookupAddress,
  onUserClick,
  theme,
}) => {
  const [client, setClient] = useState<Client | null>()
  const [recipient, _setRecipient] = useState<string>()
  const [stream, setStream] = useState<Stream<Message>>()
  const { dispatchMessages, messageStore } = useMessageStore()

  const setRecipient = useCallback(
    (address?: string) =>
      _setRecipient(address ? getAddress(address) : undefined),
    [_setRecipient]
  )

  useEffect(() => {
    createClient(signer).then(setClient).catch(console.error)
    return () => setClient(undefined)
  }, [signer])

  useEffect(() => {
    if (!client) return
    client.conversations
      .streamAllMessages()
      .then(setStream)
      .catch(console.error)
    return () => setStream(undefined)
  }, [client])

  useEffect(() => {
    if (!stream) return
    listenToStream(stream, (message) => {
      if (!client) throw new Error('client falsy')
      const peerAddress =
        client.address === message.recipientAddress
          ? message.senderAddress
          : message.recipientAddress
      if (!peerAddress) throw new Error('peer address falsy')
      dispatchMessages({
        peerAddress,
        messages: [message],
      })
    }).catch(console.error)
    return () => {
      stream && stream.return()
    }
  }, [stream, client, dispatchMessages])

  return (
    <ChakraProvider theme={theme}>
      <XmtpContext.Provider
        value={{
          signer,
          client,
          recipient,
          setRecipient,
          lookupAddress,
          addMessages: dispatchMessages,
          onUserClick,
          store: messageStore,
        }}
      >
        {children}
      </XmtpContext.Provider>
    </ChakraProvider>
  )
}

export default XmtpProvider
