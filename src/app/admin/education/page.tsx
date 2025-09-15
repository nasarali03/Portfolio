import { getPortfolioData } from "@/lib/data"
import { EducationForm } from "./education-form"
import { EducationActions } from "./education-actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Calendar,
  GraduationCap,
  Eye,
  Award
} from "lucide-react"
import { Education } from "@/lib/types"
import Link from "next/link"

export default async function EducationPage() {
  const data = await getPortfolioData()
  const education = data.education

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Education</h1>
          <p className="text-muted-foreground">
            Manage your academic background and educational achievements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/#education" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View on Site
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Education</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new education entry.
                </DialogDescription>
              </DialogHeader>
              <EducationForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Education Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {education.map((edu: Education) => (
          <Card key={edu.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{edu.institution}</span>
                  </div>
                </div>
                <Badge variant="secondary">#{edu.order}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>

                {/* Description */}
                {edu.description && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Description:</p>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {edu.description}
                    </p>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <EducationActions education={edu} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Education Table View */}
      <Card>
        <CardHeader>
          <CardTitle>All Education Entries</CardTitle>
          <CardDescription>
            A detailed view of all your educational background with management options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Degree</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {education.map((edu: Education) => (
                <TableRow key={edu.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-muted-foreground">
                          Academic qualification
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{edu.institution}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm line-clamp-2">
                        {edu.description || "No description provided"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">#{edu.order}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <EducationActions education={edu} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {education.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Education Added</h3>
            <p className="text-muted-foreground text-center mb-4">
              Add your educational background to showcase your academic achievements.
            </p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
