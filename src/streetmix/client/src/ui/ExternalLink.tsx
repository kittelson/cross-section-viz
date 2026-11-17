import { Icon } from '@/streetmix/client/src/ui/Icon.js'

interface ExternalLinkProps extends Partial<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> {
  children: React.ReactNode
  href: string
  icon?: boolean
  className?: string
}

export function ExternalLink({
  children,
  href,
  icon = false,
  ...restProps
}: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...restProps}>
      {children}
      {icon && <Icon name="external-link" />}
    </a>
  )
}
