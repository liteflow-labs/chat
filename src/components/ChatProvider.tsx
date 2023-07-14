import { ChakraProvider } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { getAddress } from '@ethersproject/address'
import { useClient, XMTPProvider } from '@xmtp/react-sdk'
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ChatContext, ChatContextType } from '../contexts/chat'
import { getKeys } from '../helpers'

type ChatProviderProps = PropsWithChildren<
  Pick<ChatContextType, 'signer' | 'lookupAddress' | 'onUserClick'> & {
    theme?: Dict
  }
>

export const ChatProvider: FC<ChatProviderProps> = ({
  children,
  signer,
  lookupAddress,
  onUserClick,
  theme,
}) => {
  const [recipient, _setRecipient] = useState<string>()
  const [keys, setKeys] = useState<Uint8Array | null>()

  useEffect(() => {
    if (!signer) return
    getKeys(signer).then(setKeys).catch(console.error)
  }, [signer])

  const { initialize } = useClient({
    signer,
    keys: keys || undefined,
  })

  const setRecipient = useCallback(
    (address?: string) =>
      _setRecipient(address ? getAddress(address) : undefined),
    [_setRecipient]
  )

  useEffect(() => {
    initialize().catch(console.error)
  }, [initialize])

  return (
    <XMTPProvider>
      <ChakraProvider theme={theme}>
        <ChatContext.Provider
          value={{
            signer,
            recipient,
            setRecipient,
            lookupAddress,
            onUserClick,
          }}
        >
          {children}
        </ChatContext.Provider>
      </ChakraProvider>
    </XMTPProvider>
  )
}

export default ChatProvider
