import {
  chakra,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { PaperAirplaneIcon } from '@heroicons/react/outline'
import React, { JSX, useEffect, useState } from 'react'
import useChat from '../../hooks/useChat'

type MessageComposerProps = {
  disabled?: boolean
  onSend: (msg: string) => Promise<void>
}

const MessageComposer = ({
  onSend,
  disabled,
}: MessageComposerProps): JSX.Element => {
  const { recipient } = useChat()
  const [message, setMessage] = useState('')

  useEffect(() => setMessage(''), [recipient])

  const onMessageChange = (e: React.FormEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (disabled) return
    if (!message) return
    await onSend(message)
    setMessage('')
  }

  return (
    <chakra.form onSubmit={onSubmit} px={3} py={4}>
      <FormControl>
        <InputGroup>
          <Input
            id="message"
            type="text"
            placeholder="Type something..."
            value={message}
            onChange={onMessageChange}
            required
            autoFocus
            autoComplete="off"
          />
          <InputRightElement>
            <IconButton
              size="sm"
              type="submit"
              aria-label="Send"
              disabled={disabled}
            >
              <PaperAirplaneIcon
                style={{ transform: 'rotateZ(90deg) scale(0.6)' }}
              />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </chakra.form>
  )
}

export default MessageComposer
