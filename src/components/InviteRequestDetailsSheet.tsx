import { AddressLink } from '@/components/AddressLink'
import { TransactionHashLink } from '@/components/TransactionHashLink'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { CommitInviteButton } from '@/components/CommitInviteButton'
import { MintToRecipientButton } from '@/components/MintToRecipientButton'

import { Status, useStatus } from '@/hooks/useStatus'
import { InviteRequest, useStore } from '@/store'
import { SubmitRecipientAddressForm } from '@/components/SubmitRecipientAddressForm'
import { Address } from 'viem'
import { StatusBadge } from '@/components/StatusBadge'

const Action = ({
  status,
  inviteRequest,
}: {
  status: Status
  inviteRequest: InviteRequest
}) => {
  const setRecipient = useStore((state) => state.setRecipient)
  const setCommitTransactionHash = useStore(
    (state) => state.setCommitTransactionHash,
  )
  const setClaimAndMintTransactionHash = useStore(
    (state) => state.setClaimAndMintTransactionHash,
  )
  const { nonce, issuer, signature, recipient } = inviteRequest

  if (status === 'recipientRequired') {
    return (
      <SubmitRecipientAddressForm
        signature={signature}
        onSubmit={(addr, hash) => {
          setRecipient(nonce, addr)
          setCommitTransactionHash(nonce, hash)
        }}
      />
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

export const InviteRequestDetailsSheet = ({
  inviteRequest,
  isOpen,
  setIsOpen,
}: {
  inviteRequest: InviteRequest
  isOpen: boolean
  setIsOpen: (newVal: boolean) => void
}) => {
  const {
    signature,
    recipient,
    commitTransactionHash,
    claimAndMintTransactionHash,
  } = inviteRequest
  const status = useStatus(inviteRequest)
  const inviteDisplayName = `#${signature.substring(2, 8)}`
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite {inviteDisplayName}</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col space-y-2 py-4'>
          <div className='flex justify-between'>
            <div className='font-light'>recipient</div>
            <div>
              <AddressLink address={recipient} />
            </div>
          </div>
          <Separator />

          <div className='flex justify-between'>
            <div className='font-light'>commit tx</div>
            <div>
              <TransactionHashLink hash={commitTransactionHash} />
            </div>
          </div>
          <Separator />
          <div className='flex justify-between'>
            <div className='font-light'>mint tx</div>
            <div>
              <TransactionHashLink hash={claimAndMintTransactionHash} />
            </div>
          </div>
          <Separator />
          <div className='flex justify-between'>
            <div className='font-light'>status</div>
            <div>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
        <div className='mt-8 flex flex-1'>
          <Action status={status} inviteRequest={inviteRequest} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
