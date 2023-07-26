import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'
import { Address, Hex, encodeAbiParameters, keccak256 } from 'viem'
import { Button } from '@/components/ui/button'

export const CommitInviteButton = ({
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
      <Button
        variant='outline'
        onClick={async (e) => {
          e.stopPropagation()
          if (writeAsync) {
            const { hash } = await writeAsync()
            onSubmit(hash)
          }
        }}
      >
        Commit Invite
      </Button>
    </div>
  )
}
