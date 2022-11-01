import type { Message } from '@xmtp/xmtp-js'
import { useReducer } from 'react'
import { sortDateAsc } from '../helpers'

type MessageStoreEvent = {
  peerAddress: string
  messages: Message[]
}

type MessageStore = { [address: string]: Message[] }

const useMessageStore = () => {
  const [messageStore, dispatchMessages] = useReducer(
    (state: MessageStore, { peerAddress, messages }: MessageStoreEvent) => ({
      ...state,
      [peerAddress]:
        // Merge previous messages with new ones
        [...(state[peerAddress] || []), ...(messages || [])]
          // Filter with only unique messages
          .filter(
            (value, index, self) =>
              self.findIndex((x) => value.id === x.id) === index
          )
          // Sort messages by date
          .sort(sortDateAsc),
    }),
    {}
  )

  return {
    messageStore,
    dispatchMessages,
  }
}

export default useMessageStore
