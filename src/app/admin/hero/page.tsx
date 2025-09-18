import { getHeroContent } from './actions'
import { HeroForm } from './hero-form'

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
      <HeroForm heroContent={heroContent} />
    </div>
  )
}
