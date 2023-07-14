// Hack for https://github.com/xmtp/xmtp-js/issues/189
import Layout from './components/Layout'
import _useChat from './hooks/useChat'
import { StorageMock } from './StorageMock'
if (typeof localStorage === 'undefined' || localStorage === null) {
  global.localStorage = new StorageMock()
}

export { ChatProvider } from './components/ChatProvider'
export type { Account } from './contexts/chat'

export const Chat = Layout
export const useChat = _useChat
