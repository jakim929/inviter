import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Dashboard } from '@/components/Dashboard'

export const InvitePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-[800px] min-w-[600px] w-[800px] flex-flex-col py-4 space-y-4'>
        <div className='flex justify-end'>
          <ConnectButton />
        </div>
        <Dashboard />
      </div>
    </div>
  )
}
