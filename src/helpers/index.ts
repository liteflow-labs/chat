import { Signer } from '@ethersproject/abstract-signer'
import { Client, Conversation, SortDirection, Stream } from '@xmtp/xmtp-js'
import { createInstance } from 'localforage'

export const truncate = (
  str: string | undefined,
  length: number
): string | undefined => {
  if (!str) return str
  if (str.length > length) return `${str.substring(0, length - 3)}...`
  return str
}

export const formatDate = (
  d: Date | undefined,
  options: Intl.DateTimeFormatOptions = {}
): string => (d ? d.toLocaleDateString('en-US', options) : '')

export const formatTime = (d: Date | undefined): string =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      })
    : ''

export const isOnSameDay = (d1?: Date, d2?: Date): boolean =>
  d1?.toDateString() === d2?.toDateString()

export const shortAddress = (addr: string): string =>
  addr.length > 10 && addr.startsWith('0x')
    ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
    : addr

export const sortDateAsc = (messA: { sent?: Date }, messB: { sent?: Date }) => {
  if (!messA.sent) return 1
  if (!messB.sent) return -1
  return messA.sent.getTime() - messB.sent.getTime()
}

export const sortDateDesc = (
  messA: { sent?: Date },
  messB: { sent?: Date }
) => {
  if (!messA.sent) return 1
  if (!messB.sent) return -1
  return messB.sent.getTime() - messA.sent.getTime()
}

export const listenToStream = async <T>(
  stream: Stream<T>,
  callback: (value: T) => void
) => {
  for await (const value of stream) {
    callback(value)
  }
}

export const getLatestMessage = async (conversation: Conversation) => {
  for await (const [message] of conversation.messagesPaginated({
    pageSize: 1,
    direction: SortDirection.SORT_DIRECTION_DESCENDING,
  })) {
    return message
  }
}

export const createClient = async (signer?: Signer) => {
  if (!signer) return
  const storage = createInstance({
    name: '@nft/chat',
    storeName: 'xmtp-identities',
    description: 'store identities for xmtp',
  })

  const address = await signer.getAddress()
  const storageKey = address.toLowerCase()
  if (!(await storage.getItem(storageKey))) {
    const keys = await Client.getKeys(signer)
    await storage.setItem(storageKey, keys)
  }
  const keys = await storage.getItem<Uint8Array>(storageKey)
  return keys
    ? Client.create(null, { privateKeyOverride: keys })
    : Client.create(signer)
}
