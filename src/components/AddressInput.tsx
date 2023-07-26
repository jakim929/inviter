import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Address, isAddress } from 'viem'

export const AddressInput = ({
  onSubmit,
}: {
  onSubmit: (addr: Address) => void
}) => {
  const [addr, setAddress] = useState<Address>()

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setAddress(e.target.value as Address)}
      />
      <Button onClick={() => addr && isAddress(addr || '') && onSubmit(addr)}>
        Choose Recipient
      </Button>
    </div>
  )
}
