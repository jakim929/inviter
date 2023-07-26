import { Address, useAccount, useContractRead } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'
import { InviteFlow } from '../components/InviteFlow'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const InvitePage = () => {
  const { address, isConnected } = useAccount()
  const { data: inviteCount, isLoading } = useContractRead({
    ...OptimistInviter.read().inviteCounts(address as Address),
    enabled: Boolean(isConnected && address),
  })

  const hasInvites = Boolean(inviteCount && inviteCount > 0)

  return (
    <div>
      <ConnectButton />
      <div>Invites left: {inviteCount?.toString()}</div>
      {hasInvites && <InviteFlow />}
    </div>
  )
}
