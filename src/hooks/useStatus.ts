import { badgeVariants } from '@/components/ui/badge'
import { InviteRequest } from '@/store'
import { useWaitForTransaction } from 'wagmi'

export type Status =
  | 'recipientRequired'
  | 'commitRequired'
  | 'waitingForCommitFinalization'
  | 'waitingForCommitWindow'
  | 'claimAndMintRequired'
  | 'waitingForClaimAndMintFinalization'
  | 'completed'

export const badgeClassByStatus: Record<Status, string> = {
  recipientRequired: badgeVariants({ variant: 'actionRequired' }),
  commitRequired: badgeVariants({ variant: 'actionRequired' }),
  waitingForCommitFinalization: badgeVariants({ variant: 'waiting' }),
  waitingForCommitWindow: badgeVariants({ variant: 'waiting' }),
  claimAndMintRequired: badgeVariants({ variant: 'actionRequired' }),
  waitingForClaimAndMintFinalization: badgeVariants({ variant: 'waiting' }),
  completed: badgeVariants({ variant: 'completed' }),
}

export const messageByStatus: Record<Status, string> = {
  recipientRequired: 'Choose recipient',
  commitRequired: 'Ready to commit',
  waitingForCommitFinalization: 'Waiting for commit transaction to finalize',
  waitingForCommitWindow: 'Wait ~ 1 minute',
  claimAndMintRequired: 'Ready to mint',
  waitingForClaimAndMintFinalization:
    'Waiting for mint transaction to finalize',
  completed: 'Mint complete',
}

export const ctaByStatus: Record<Status, string> = {
  recipientRequired: 'Choose recipient',
  commitRequired: 'Commit recipient',
  waitingForCommitFinalization: '',
  waitingForCommitWindow: '',
  claimAndMintRequired: 'Mint to recipient',
  waitingForClaimAndMintFinalization: '',
  completed: '',
}

export const useStatus = ({
  recipient,
  commitTransactionHash,
  claimAndMintTransactionHash,
}: InviteRequest) => {
  const { data: commitWindowTransactionResult } = useWaitForTransaction({
    hash: commitTransactionHash,
    enabled: Boolean(commitTransactionHash),
    confirmations: 32, // this should be sufficient for 1 minute wait - 2 sec per block
  })
  const { data: claimAndMintTransactionResult } = useWaitForTransaction({
    hash: claimAndMintTransactionHash,
    enabled: Boolean(claimAndMintTransactionHash),
    confirmations: 2,
  })

  if (!recipient) {
    return 'recipientRequired'
  } else if (!commitTransactionHash) {
    return 'commitRequired'
  } else if (!commitWindowTransactionResult) {
    return 'waitingForCommitWindow'
  } else if (!claimAndMintTransactionHash) {
    return 'claimAndMintRequired'
  } else if (!claimAndMintTransactionResult) {
    return 'waitingForClaimAndMintFinalization'
  }
  return 'completed'
}
