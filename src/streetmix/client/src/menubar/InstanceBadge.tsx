import './InstanceBadge.css'

interface InstanceBadgeProps {
  label?: string
  className?: string
}

export function InstanceBadge({ label, className }: InstanceBadgeProps) {
  const classNames = ['instance-badge']
  if (className) {
    classNames.push(className)
  }

  if (label === undefined) {
    classNames.push('instance-label-demo')
  }

  return <div className={classNames.join(' ')}>{label ?? 'Demo'}</div>
}
