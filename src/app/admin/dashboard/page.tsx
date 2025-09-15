import Link from "next/link"
import {
  Briefcase,
  FileText,
  GraduationCap,
  PlusCircle,
  Award,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getPortfolioData } from "@/lib/data"

export default async function Dashboard() {
  const data = await getPortfolioData();
  
  // Calculate portfolio completion percentage
  const totalSections = 6; // projects, experience, education, certifications, skills, about
  const completedSections = [
    data.projects.length > 0,
    data.experience.length > 0,
    data.education.length > 0,
    data.certifications.length > 0,
    data.about.skills.length > 0,
    data.about.bio.length > 0,
  ].filter(Boolean).length;
  
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Portfolio
            </Link>
          </Button>
        </div>
      </div>

      {/* Portfolio Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Portfolio Completion
          </CardTitle>
          <CardDescription>
            Track your portfolio's completeness and optimize for better visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${data.projects.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Projects ({data.projects.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${data.experience.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Experience ({data.experience.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${data.education.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Education ({data.education.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${data.certifications.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Certifications ({data.certifications.length})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.projects.length}</div>
            <p className="text-xs text-muted-foreground">
              Portfolio projects
            </p>
            <Button size="sm" className="mt-2" asChild>
              <Link href="/admin/projects">
                <Edit className="mr-2 h-3 w-3" />
                Manage
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.experience.length}</div>
            <p className="text-xs text-muted-foreground">
              Work experience entries
            </p>
            <Button size="sm" className="mt-2" asChild>
              <Link href="/admin/experience">
                <Edit className="mr-2 h-3 w-3" />
                Manage
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Education</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.education.length}</div>
            <p className="text-xs text-muted-foreground">
              Education entries
            </p>
            <Button size="sm" className="mt-2" asChild>
              <Link href="/admin/education">
                <Edit className="mr-2 h-3 w-3" />
                Manage
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.certifications.length}</div>
            <p className="text-xs text-muted-foreground">
              Professional certifications
            </p>
            <Button size="sm" className="mt-2" asChild>
              <Link href="/admin/certifications">
                <Edit className="mr-2 h-3 w-3" />
                Manage
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Quickly add new content to your portfolio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/projects">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Project
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/experience">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Experience Entry
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/education">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Education Entry
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/certifications">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Certification
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest portfolio updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Portfolio updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New project added</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Experience updated</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
