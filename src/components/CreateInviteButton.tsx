import { useAccount, useSignTypedData } from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'
import { useState } from 'react'
import { randomBytes } from '@stablelib/random'
import { Address, Hex, bytesToHex } from 'viem'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

const domain = {
  name: 'OptimistInviter',
  version: '1.0.0',
  chainId: 10,
  verifyingContract: OptimistInviter.addresses[10],
} as const

// The named list of all type definitions
const types = {
  ClaimableInvite: [
    { name: 'issuer', type: 'address' },
    { name: 'nonce', type: 'bytes32' },
  ],
} as const

const createNonce = () => bytesToHex(randomBytes(32))

export const CreateInviteButton = () => {
  const addInviteRequest = useStore((state) => state.addInviteRequest)
  const { address, isConnected } = useAccount()
  const [nonce, setNonce] = useState(createNonce())
  const message = {
    issuer: address as Address,
    nonce,
  }
  const { data, isError, isLoading, isSuccess, signTypedDataAsync } =
    useSignTypedData({
      domain,
      message,
      primaryType: 'ClaimableInvite',
      types,
    })

  return (
    <Button
      onClick={async () => {
        if (isConnected && address) {
          const result = await signTypedDataAsync()
          result &&
            addInviteRequest({ nonce, signature: result, issuer: address })
          setNonce(createNonce())
        }
      }}
    >
      Create invite
    </Button>
  )
}
