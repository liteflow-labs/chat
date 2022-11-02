import { useMemo } from 'react'
import useChat from './useChat'

const useMessages = (peerAddress?: string) => {
  const { store } = useChat()

  return useMemo(() => {
    if (!peerAddress) return []
    return store[peerAddress] || []
  }, [peerAddress, store])
}

export default useMessages
