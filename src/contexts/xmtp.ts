import { Signer } from '@ethersproject/abstract-signer'
import type { Client } from '@xmtp/xmtp-js'
import { Message } from '@xmtp/xmtp-js'
import { createContext, Dispatch } from 'react'

export type Account = {
  name?: string
  avatar?: string
}

export type Store = { [key: string]: Message[] }

export type XmtpContextType = {
  signer: Signer | undefined
  client: Client | undefined | null

  recipient: string | undefined
  setRecipient: (recipient: string | undefined) => void

  lookupAddress?: (address: string) => Promise<Account>

  store: Store
  addMessages: Dispatch<{ peerAddress: string; messages: Message[] }>
}

export const XmtpContext = createContext<XmtpContextType>({
  signer: undefined,
  client: undefined,
  recipient: undefined,
  setRecipient: () => {
    throw new Error('not implemented')
  },
  store: {},
  addMessages: () => {
    throw new Error('not implemented')
  },
})

export default XmtpContext
