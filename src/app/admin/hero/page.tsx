import { getHeroContent } from './actions'
import { HeroForm } from './hero-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'

export default async function HeroPage() {
  const heroContent = await getHeroContent()

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hero Section</h1>
          <p className="text-muted-foreground">
            Manage your hero section content and profile image.
          </p>
        </div>
      </div>

      {/* Hero Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Hero Content
          </CardTitle>
          <CardDescription>
            Update your name, title, introduction, and profile image that appears at the top of your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HeroForm heroContent={heroContent} />
        </CardContent>
      </Card>
    </div>
  )
}
