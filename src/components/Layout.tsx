import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  useTheme,
} from '@chakra-ui/react'
import { useSize } from '@chakra-ui/react-use-size'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import React, {
  createRef,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import useChat from '../hooks/useChat'
import { Conversation, RecipientControl } from './Conversation'
import NavigationPanel from './NavigationPanel'

type Props = PropsWithChildren<{
  recipient?: string
}>

type AddressInputProps = PropsWithChildren<{
  recipient?: string
  onCancel: () => void
  onSubmit: (address: string) => void
}>

type NavbarProps = PropsWithChildren<
  AddressInputProps & {
    createMode: boolean
    onCreate: () => void
  }
>

const AddressInput = ({
  onCancel,
  onSubmit,
  recipient,
  children,
}: AddressInputProps) => (
  <Flex alignItems="center" padding="3">
    <Link onClick={onCancel} marginRight="2">
      <ChevronLeftIcon width="20" height="32" />
    </Link>
    <RecipientControl value={recipient} onSubmit={onSubmit} />
    {children}
  </Flex>
)

const Navbar = ({
  createMode,
  onCreate,
  children,
  ...addressInputProps
}: NavbarProps) =>
  createMode ? (
    <AddressInput {...addressInputProps}>{children}</AddressInput>
  ) : (
    <Flex justifyContent="space-between" padding="3" alignItems="center">
      <Heading fontSize="md" fontWeight="600">
        Messages
      </Heading>
      <Spacer />
      <Button size="sm" onClick={onCreate}>
        + New
      </Button>
      {children}
    </Flex>
  )

const Layout: FC<Props> = ({ recipient: originalRecipient, children }) => {
  const { client, signer, recipient, setRecipient } = useChat()
  const [createMode, setCreateMode] = useState<boolean>(false)
  const ref = createRef<HTMLDivElement>()
  const dimensions = useSize(ref)
  const theme = useTheme()

  const reset = useCallback(() => {
    setRecipient(undefined)
    setCreateMode(false)
  }, [setRecipient])

  const edit = useCallback(() => {
    reset()
    setCreateMode(true)
  }, [reset, setCreateMode])

  const selectRecipient = useCallback(
    (address: string) => {
      reset()
      setRecipient(address)
    },
    [reset, setRecipient]
  )

  useEffect(() => {
    setRecipient(originalRecipient)
  }, [setRecipient, originalRecipient])

  const menuWidth = 350
  const width = (dimensions && dimensions.width) || '100vw'
  const height = (dimensions && dimensions.height) || '100vh'

  const largeView = width >= menuWidth * 2.5 // Content should be at least 1.5x larger than menu (aka: 875px)
  const shouldDisplayNavbar = !recipient || largeView

  return (
    <Flex
      ref={ref}
      width="full"
      height="full"
      backgroundColor={theme.styles.global.body.bg}
    >
      {shouldDisplayNavbar && (
        <Flex
          direction="column"
          borderRight={largeView ? '1px' : 0}
          borderRightColor="inherit"
          overflowY="auto"
          height={height}
          width={largeView ? menuWidth : 'full'}
          minWidth={menuWidth}
        >
          <Navbar
            createMode={createMode}
            onCancel={reset}
            onCreate={edit}
            onSubmit={selectRecipient}
            recipient={recipient}
          >
            {children}
          </Navbar>
          <Divider />
          <NavigationPanel />
        </Flex>
      )}

      {signer && client && (recipient || largeView) && (
        <Flex direction="column" height={height} width="full">
          <AddressInput
            onCancel={reset}
            onSubmit={selectRecipient}
            recipient={recipient}
          >
            {children}
          </AddressInput>
          <Divider />
          <Conversation />
        </Flex>
      )}
    </Flex>
  )
}

export default Layout
