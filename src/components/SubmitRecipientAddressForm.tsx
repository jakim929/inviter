import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import {
  useContractWrite,
  usePrepareContractWrite,
  usePublicClient,
  useWalletClient,
} from 'wagmi'
import { OptimistInviter } from '../contracts/OptimistInviter.sol'
import { Address, Hex, encodeAbiParameters, keccak256, isAddress } from 'viem'
import { useState } from 'react'

const formSchema = z.object({
  address: z.string().refine(isAddress, { message: 'Invalid address' }),
})

export const SubmitRecipientAddressForm = ({
  signature,
  onSubmit,
}: {
  signature: Hex
  onSubmit: (address: Address, hash: Hex) => void
}) => {
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const publicClient = usePublicClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '' as Address,
    },
  })

  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  return (
    <Form {...form}>
      <form
        className='flex flex-col space-y-8 flex-1'
        onSubmit={form.handleSubmit(async (formValues) => {
          setIsSubmitLoading(true)
          const { address } = formValues
          if (!walletClient || !publicClient || !address) {
            setIsSubmitLoading(false)

            return
          }

          const commitHash = keccak256(
            encodeAbiParameters(
              [{ type: 'address' }, { type: 'bytes' }],
              [address, signature],
            ),
          )
          const { request } = await publicClient.simulateContract({
            // @ts-ignore
            account: walletClient.account,
            // @ts-ignore
            ...OptimistInviter.write().commitInvite(commitHash),
          })

          if (!request) {
            setIsSubmitLoading(false)

            return
          }
          const hash = await walletClient.writeContract(request)
          setIsSubmitLoading(false)
          onSubmit(address, hash)
        })}
      >
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='0x661...' {...field} />
              </FormControl>
              <FormDescription>
                Address to send the invite to, ENS not supported
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='self-end' type='submit' disabled={isSubmitLoading}>
          {isSubmitLoading ? 'Loading...' : 'Invite recipient'}
        </Button>
      </form>
    </Form>
  )
}
