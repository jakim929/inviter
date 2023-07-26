import { Badge } from '@/components/ui/badge'
import { Status, badgeClassByStatus, messageByStatus } from '@/hooks/useStatus'

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className={badgeClassByStatus[status]}>
      {messageByStatus[status]}
    </Badge>
  )
}
