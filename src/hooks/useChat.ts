import { useContext } from 'react'
import XmtpContext from '../contexts/chat'

const useChat = () => useContext(XmtpContext)
export default useChat
