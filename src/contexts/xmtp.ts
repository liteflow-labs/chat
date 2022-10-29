import { Signer } from '@ethersproject/abstract-signer'
import type { Client, Conversation } from '@xmtp/xmtp-js'
import { createContext } from 'react'

export type Account = {
  name?: string
  avatar?: string
}

export type XmtpContextType = {
  signer: Signer | undefined
  client: Client | undefined | null

  recipient: string | undefined
  setRecipient: (recipient: string | undefined) => void

  lookupAddress?: (address: string) => Promise<Account>

  conversations: Map<string, Conversation> | null
  loadingConversations: boolean
}

export const XmtpContext = createContext<XmtpContextType>({
  signer: undefined,
  client: undefined,
  recipient: undefined,
  setRecipient: () => {
    throw new Error('not implemented')
  },
  conversations: null,
  loadingConversations: false,
})

export default XmtpContext
