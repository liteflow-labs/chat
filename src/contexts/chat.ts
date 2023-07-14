import { Signer } from '@ethersproject/abstract-signer'
import type { DecodedMessage } from '@xmtp/xmtp-js'
import { createContext } from 'react'

export type Account = {
  name?: string
  avatar?: string
}

export type Store = { [key: string]: DecodedMessage[] }

export type ChatContextType = {
  signer: Signer | undefined

  recipient: string | undefined
  setRecipient: (recipient: string | undefined) => void

  lookupAddress?: (address: string) => Promise<Account>
  onUserClick?: (address: string) => void
}

export const ChatContext = createContext<ChatContextType>({
  signer: undefined,

  recipient: undefined,
  setRecipient: () => {
    throw new Error('not implemented')
  },
})

export default ChatContext
