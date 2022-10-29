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
      [peerAddress]: [...(state[peerAddress] || []), ...(messages || [])]
        .filter(
          (value, index, self) =>
            self.findIndex((x) => value.id === x.id) === index
        )
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
