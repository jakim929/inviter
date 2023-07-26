import { CommitInviteButton } from '@/components/CommitInviteButton'
import { MintToRecipientButton } from '@/components/MintToRecipientButton'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Status,
  messageByStatus,
  ctaByStatus,
  useStatus,
  badgeClassByStatus,
} from '@/hooks/useStatus'
import { InviteRequest, useStore } from '@/store'
import { memo, useState } from 'react'
import { Address } from 'wagmi'
import { TransactionHashLink } from '@/components/TransactionHashLink'
import { getDisplayAddress } from '@/lib/getDisplayAddress'
import { InviteRequestDetailsSheet } from '@/components/InviteRequestDetailsSheet'
import { AddressLink } from '@/components/AddressLink'
import { StatusBadge } from '@/components/StatusBadge'

export const ActionButton = ({
  status,
  inviteRequest,
  setIsSheetOpen,
}: {
  status: Status
  inviteRequest: InviteRequest
  setIsSheetOpen: (isOpen: boolean) => void
}) => {
  const {
    issuer,
    nonce,
    signature,
    recipient,
    commitTransactionHash,
    claimAndMintTransactionHash,
  } = inviteRequest
  const setRecipient = useStore((state) => state.setRecipient)
  const setCommitTransactionHash = useStore(
    (state) => state.setCommitTransactionHash,
  )
  const setClaimAndMintTransactionHash = useStore(
    (state) => state.setClaimAndMintTransactionHash,
  )
  if (status === 'recipientRequired') {
    return (
      <Button variant='outline' onClick={(e) => setIsSheetOpen(true)}>
        Choose recipient
      </Button>
    )
  } else if (status === 'commitRequired') {
    return (
      <CommitInviteButton
        signature={signature}
        recipient={recipient as Address}
        onSubmit={(hash) => {
          setCommitTransactionHash(nonce, hash)
        }}
      />
    )
  } else if (status === 'claimAndMintRequired') {
    return (
      <MintToRecipientButton
        issuer={issuer}
        signature={signature}
        recipient={recipient as Address}
        nonce={nonce}
        onSubmit={(hash) => {
          setClaimAndMintTransactionHash(nonce, hash)
        }}
      />
    )
  }
}

export const InviteRequestRow = memo(
  ({ inviteRequest }: { inviteRequest: InviteRequest }) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const {
      signature,
      recipient,
      commitTransactionHash,
      claimAndMintTransactionHash,
    } = inviteRequest
    const status = useStatus(inviteRequest)
    const inviteDisplayName = `#${signature.substring(2, 8)}`
    return (
      <>
        <TableRow
          className='cursor-pointer'
          onClick={() => {
            if (!isSheetOpen) {
              setIsSheetOpen(true)
            }
          }}
        >
          <TableCell className='font-medium'>{inviteDisplayName}</TableCell>
          <TableCell>
            <AddressLink address={recipient} />
          </TableCell>
          <TableCell>
            <StatusBadge status={status} />
          </TableCell>
          <TableCell>
            <ActionButton
              status={status}
              inviteRequest={inviteRequest}
              setIsSheetOpen={() => {
                setIsSheetOpen(true)
              }}
            />
          </TableCell>
        </TableRow>
        <InviteRequestDetailsSheet
          inviteRequest={inviteRequest}
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
        />
      </>
    )
  },
)
