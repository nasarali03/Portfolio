import Link from "next/link"
import {
  Briefcase,
  FileText,
  GraduationCap,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPortfolioData } from "@/lib/data"


export default async function Dashboard() {
    const data = await getPortfolioData();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.projects.length}</div>
            <Button size="sm" className="mt-2" asChild>
                <Link href="/admin/projects">Manage Projects</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Experience Entries
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.experience.length}</div>
             <p className="text-xs text-muted-foreground">
              Manage professional history
            </p>
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
              Manage academic background
            </p>
          </CardContent>
        </Card>
      </div>
       <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Quickly add new content to your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                    <Link href="/admin/projects"><PlusCircle className="mr-2 h-4 w-4" />Add Project</Link>
                </Button>
                <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />Add Experience
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}
