import { getPortfolioData } from "@/lib/data"
import { ExperienceForm } from "./experience-form"
import { ExperienceActions } from "./experience-actions"
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
  MapPin,
  Building,
  Eye
} from "lucide-react"
import { Experience } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"

export default async function ExperiencePage() {
  const data = await getPortfolioData()
  const experiences = data.experience

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">
            Manage your professional work experience and career history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/#experience" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View on Site
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Experience</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new work experience entry.
                </DialogDescription>
              </DialogHeader>
              <ExperienceForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience: Experience) => (
          <Card key={experience.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{experience.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{experience.company}</span>
                  </div>
                </div>
                <Badge variant="secondary">#{experience.order}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Company Logo */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden border">
                    <Image
                      src={experience.logoUrl}
                      alt={experience.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{experience.company}</div>
                    <div className="text-sm text-muted-foreground">
                      {experience.startDate} - {experience.endDate}
                    </div>
                  </div>
                </div>

                {/* Description Preview */}
                <div className="space-y-1">
                  <p className="text-sm font-medium">Key Achievements:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {experience.description.slice(0, 2).map((desc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="line-clamp-2">{desc}</span>
                      </li>
                    ))}
                    {experience.description.length > 2 && (
                      <li className="text-xs text-muted-foreground">
                        +{experience.description.length - 2} more achievements
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <ExperienceActions experience={experience} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Experience Table View */}
      <Card>
        <CardHeader>
          <CardTitle>All Experience Entries</CardTitle>
          <CardDescription>
            A detailed view of all your work experience with management options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Key Points</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.map((experience: Experience) => (
                <TableRow key={experience.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{experience.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {experience.description.length} achievements
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{experience.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{experience.startDate} - {experience.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <ul className="text-sm space-y-1">
                        {experience.description.slice(0, 2).map((desc, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary text-xs">•</span>
                            <span className="line-clamp-1">{desc}</span>
                          </li>
                        ))}
                        {experience.description.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{experience.description.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">#{experience.order}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ExperienceActions experience={experience} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {experiences.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Experience Added</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your professional profile by adding your work experience.
            </p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
