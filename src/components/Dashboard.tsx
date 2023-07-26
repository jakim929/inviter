import { CreateInviteButton } from '@/components/CreateInviteButton'
import { InviteRequestRow } from '@/components/InviteRequestRow'
import { useStore } from '@/store'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useInviteCount } from '@/hooks/useInviteCount'

const InviteRequestTable = () => {
  const inviteRequests = useStore((state) => state.inviteRequests)
  return (
    <Table>
      <TableCaption>A list of your recent invites.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invite</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inviteRequests.map((inviteRequest) => {
          return (
            <InviteRequestRow
              key={inviteRequest.nonce}
              inviteRequest={inviteRequest}
            />
          )
        })}
      </TableBody>
    </Table>
  )
}

export const Dashboard = () => {
  const { isLoading: isInviteCountLoading, inviteCount } = useInviteCount()
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <div>Optimist NFT Inviter</div>
          <CreateInviteButton />
        </CardTitle>
        <CardDescription>
          Remaining invites: {inviteCount?.toString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InviteRequestTable />
      </CardContent>
    </Card>
  )
}
