import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'
import { Address, Hex, encodeAbiParameters, keccak256 } from 'viem'

export const CommitInvite = ({
  signature,
  recipient,
  onSubmit,
}: { signature: Hex; recipient: Address; onSubmit: (hash: Hex) => void }) => {
  const commitHash = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'bytes' }],
      [recipient, signature],
    ),
  )
  const { config, error } = usePrepareContractWrite({
    ...OptimistInviter.write().commitInvite(commitHash),
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
        Commit Invite
      </button>
    </div>
  )
}
