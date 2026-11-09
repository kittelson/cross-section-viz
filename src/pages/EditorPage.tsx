import { lazy, Suspense } from 'react'

const StreetEditor = lazy(() =>
  import('@/streetmix/StreetEditor').then((m) => ({ default: m.StreetEditor })),
)

export function EditorPage() {
  return (
    <Suspense fallback={null}>
      <StreetEditor />
    </Suspense>
  )
}
