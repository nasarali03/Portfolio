import { getAboutContent } from "./actions"
import { AboutForm } from "./about-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function AboutPage() {
  const aboutContent = await getAboutContent()

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About Section</h1>
          <p className="text-muted-foreground">
            Manage your personal information and profile details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/#about" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View on Site
            </Link>
          </Button>
        </div>
      </div>

      {/* Current About Content Preview */}
      {aboutContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Current About Content
            </CardTitle>
            <CardDescription>
              Preview of your current about section content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              <div className='relative h-64 w-64 md:h-auto md:w-full mx-auto'>
                <Image 
                  src={aboutContent.profileUrl}
                  alt="About me profile picture"
                  fill
                  className="rounded-2xl object-cover"
                  data-ai-hint={aboutContent.profileHint}
                />
              </div>
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aboutContent.bio}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills ({aboutContent.skills.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {aboutContent.skills.map(skill => (
                      <div key={skill.id} className="pill-tag">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* About Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit About Section</CardTitle>
          <CardDescription>
            Update your bio, skills, and profile image. Changes will be reflected on your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AboutForm aboutContent={aboutContent} />
        </CardContent>
      </Card>
    </div>
  )
}
