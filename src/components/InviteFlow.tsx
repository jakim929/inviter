import { Address, useAccount, useContractRead } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'

export const InviteFlow = () => {
  const { address, isConnected } = useAccount()
  const { data: inviteCount, isLoading } = useContractRead({
    ...OptimistInviter.read().inviteCounts(address as Address),
    enabled: Boolean(isConnected && address),
  })
  console.log(isLoading)

  return (
    <div>
      <div>Invites</div>
      <div>{inviteCount?.toString()}</div>
    </div>
  )
}
