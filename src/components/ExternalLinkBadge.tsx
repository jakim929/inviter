import { badgeVariants } from '@/components/ui/badge'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

export const ExternalLinkBadge = ({
  text,
  href,
}: { text: string; href: string }) => {
  return (
    <a
      onClick={(e) => e.stopPropagation()}
      target='_blank'
      rel='noreferrer'
      href={href}
      className={badgeVariants({ variant: 'default' })}
    >
      {text}
      <ArrowTopRightOnSquareIcon className='h-3 w-3 ml-2' />
    </a>
  )
}
