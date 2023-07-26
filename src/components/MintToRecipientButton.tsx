import { Address, Hex, encodeFunctionData } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'
import { Optimist } from '../contracts/Optimist.sol'
import { Multicall3 } from '../contracts/Multicall3.sol'
import { Button } from '@/components/ui/button'

export const MintToRecipientButton = ({
  issuer,
  signature,
  recipient,
  nonce,
  onSubmit,
}: {
  issuer: Address
  signature: Hex
  recipient: Address
  nonce: Hex
  onSubmit: (hash: Hex) => void
}) => {
  const claimInviteCallData = encodeFunctionData({
    ...OptimistInviter.write().claimInvite(
      recipient,
      { issuer, nonce },
      signature,
    ),
  })

  const mintNFTCallData = encodeFunctionData({
    ...Optimist.write().mint(recipient),
  })

  const { config, error } = usePrepareContractWrite({
    ...Multicall3.write().aggregate3([
      {
        target: OptimistInviter.addresses[10],
        allowFailure: false,
        callData: claimInviteCallData,
      },
      {
        target: Optimist.addresses[10],
        allowFailure: false,
        callData: mintNFTCallData,
      },
    ]),
    value: 0n,
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
        Mint to recipient
      </Button>
    </div>
  )
}
