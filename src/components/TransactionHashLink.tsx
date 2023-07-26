import { Hex } from 'viem'
import { ExternalLinkBadge } from '@/components/ExternalLinkBadge'

export const TransactionHashLink = ({ hash }: { hash?: Hex }) => {
  if (!hash) {
    return null
  }
  return (
    <ExternalLinkBadge
      href={`https://optimistic.etherscan.io/tx/${hash}`}
      text={`${hash.slice(0, 8)}...`}
    />
  )
}
