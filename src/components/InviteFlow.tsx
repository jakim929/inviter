import { useState } from 'react'
import { Address, Hex } from 'viem'
import { CreateInvite } from './CreateInvite'
import { AddressInput } from './AddressInput'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { CommitInvite } from './CommitInvite'
import { ClaimInvite } from './ClaimInvite'

export const InviteFlow = () => {
  const { address, isConnected } = useAccount()
  const [inviteSignature, setInviteSignature] = useState<Hex>()
  const [inviteNonce, setInviteNonce] = useState<Hex>()
  const [inviteRecipient, setInviteRecipient] = useState<Address>()
  const [commitTransactionHash, setCommitTransactionHash] = useState<Hex>()
  const {
    data: commitTransactionResult,
    isLoading: isCommitTransactionLoading,
  } = useWaitForTransaction({
    hash: commitTransactionHash,
    enabled: Boolean(commitTransactionHash),
    confirmations: 32, // this should be sufficient for 1 minute wait - 2 sec per block
  })
  const [claimTransactionHash, setClaimTransactionHash] = useState<Hex>()
  const { data: claimTransactionResult, isLoading: isClaimTransactionLoading } =
    useWaitForTransaction({
      hash: claimTransactionHash,
      enabled: Boolean(claimTransactionHash),
      confirmations: 2,
    })

  if (!address || !isConnected) {
    return <div>Connect your wallet</div>
  }

  if (!inviteSignature || !inviteNonce) {
    return (
      <CreateInvite
        onSubmit={(signature, nonce) => {
          setInviteSignature(signature)
          setInviteNonce(nonce)
        }}
      />
    )
  }

  if (!inviteRecipient) {
    return (
      <AddressInput
        onSubmit={(recipient) => {
          setInviteRecipient(recipient)
        }}
      />
    )
  }

  if (!commitTransactionHash) {
    return (
      <CommitInvite
        signature={inviteSignature}
        recipient={inviteRecipient}
        onSubmit={(hash) => {
          setCommitTransactionHash(hash)
        }}
      />
    )
  }

  if (isCommitTransactionLoading && !commitTransactionResult) {
    return <div>Waiting for commit window to pass... around 1 minute</div>
  }

  if (!claimTransactionHash) {
    return (
      <ClaimInvite
        inviter={address as Address}
        signature={inviteSignature}
        recipient={inviteRecipient}
        nonce={inviteNonce}
        onSubmit={(hash) => {
          setClaimTransactionHash(hash)
        }}
      />
    )
  }

  if (isClaimTransactionLoading && !claimTransactionResult) {
    return <div>Waiting for claim transaction to finish...</div>
  }
}
