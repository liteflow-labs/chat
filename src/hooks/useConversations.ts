import { useMemo } from 'react'
import { sortDateDesc } from '../helpers'
import useChat from './useChat'

const useConversations = () => {
  const { store } = useChat()

  const peers = useMemo(() => Object.keys(store), [store])
  const peersWithLatestDate = useMemo(
    () =>
      peers.map((peerAddress) => {
        const messages = store[peerAddress] || []
        const lastMessage = messages[messages.length - 1]
        return {
          peerAddress,
          sent: lastMessage.sent,
        }
      }),
    [peers, store]
  )
  const sortedPeers = useMemo(
    () => peersWithLatestDate.sort(sortDateDesc),
    [peersWithLatestDate]
  )
  return sortedPeers.map((x) => x.peerAddress)
}

export default useConversations
