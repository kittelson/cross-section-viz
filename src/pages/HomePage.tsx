import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'
import { submittedNameAtom } from '@/atoms'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function HomePage() {
  const submittedName = useAtomValue(submittedNameAtom)

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          This value lives in a jotai atom and is set from the form page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submittedName ? (
          <p>
            Hello, <span className="font-semibold">{submittedName}</span>!
          </p>
        ) : (
          <p className="text-muted-foreground">No name submitted yet.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary">
          <Link to="/form">Go to form</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
