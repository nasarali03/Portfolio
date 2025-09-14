import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code2, Chrome } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
    <Card className="mx-auto max-w-sm w-full rounded-2xl shadow-xl">
      <CardHeader className="text-center">
        <Link href="/" className="mb-4 inline-block">
             <Code2 className="h-8 w-8 text-primary" />
        </Link>
        <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" asChild>
            <Link href="/admin">Sign in</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/admin">
                <Chrome className="mr-2 h-4 w-4" />
                Sign in with Google
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
