import { Address, Hex } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'

export const ClaimInvite = ({
  inviter,
  signature,
  recipient,
  nonce,
  onSubmit,
}: {
  inviter: Address
  signature: Hex
  recipient: Address
  nonce: Hex
  onSubmit: (hash: Hex) => void
}) => {
  const { config, error } = usePrepareContractWrite({
    ...OptimistInviter.write().claimInvite(
      recipient,
      { issuer: inviter, nonce },
      signature,
    ),
  })

  const { data, writeAsync } = useContractWrite(config)

  return (
    <div>
      <button
        type='button'
        onClick={async () => {
          if (writeAsync) {
            const { hash } = await writeAsync()
            onSubmit(hash)
          }
        }}
      >
        Claim invite for recipient
      </button>
    </div>
  )
}
