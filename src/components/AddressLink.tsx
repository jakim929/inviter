import { getDisplayAddress } from '@/lib/getDisplayAddress'
import { Address } from 'viem'
import { ExternalLinkBadge } from '@/components/ExternalLinkBadge'

export const AddressLink = ({ address }: { address?: Address }) => {
  if (!address) {
    return null
  }
  return (
    <ExternalLinkBadge
      href={`https://optimistic.etherscan.io/address/${address}`}
      text={getDisplayAddress(address)}
    />
  )
}
