import { OptimistInviter } from '../contracts/OptimistInviter.sol'

import { useContractRead, useAccount, Address } from 'wagmi'

export const useInviteCount = () => {
  const { address, isConnected } = useAccount()
  const { data: inviteCount, isLoading } = useContractRead({
    ...OptimistInviter.read().inviteCounts(address as Address),
    enabled: Boolean(isConnected && address),
  })

  const hasInvites = Boolean(inviteCount && inviteCount > 0)
  return { inviteCount, isLoading, hasInvites }
}
