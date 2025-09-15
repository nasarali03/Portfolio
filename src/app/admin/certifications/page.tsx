import { getPortfolioData } from "@/lib/data"
import { CertificationForm } from "./certification-form"
import { CertificationActions } from "./certification-actions"
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
  ExternalLink,
  Award,
  Eye,
  Calendar
} from "lucide-react"
import { Certification } from "@/lib/types"
import Link from "next/link"

export default async function CertificationsPage() {
  const data = await getPortfolioData()
  const certifications = data.certifications

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">
            Manage your professional certifications and credentials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/#certifications" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View on Site
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Certification</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new certification.
                </DialogDescription>
              </DialogHeader>
              <CertificationForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Certifications Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert: Certification) => (
          <Card key={cert.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>{cert.provider}</span>
                  </div>
                </div>
                <Badge variant="secondary">#{cert.order}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Provider */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Provider:</span>
                  <span className="text-muted-foreground">{cert.provider}</span>
                </div>

                {/* URL */}
                {cert.url && (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <Link href={cert.url} target="_blank">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View Certificate
                      </Link>
                    </Button>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <CertificationActions certification={cert} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications Table View */}
      <Card>
        <CardHeader>
          <CardTitle>All Certifications</CardTitle>
          <CardDescription>
            A detailed view of all your professional certifications with management options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certification</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.map((cert: Certification) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Professional certification
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{cert.provider}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm text-muted-foreground">Active</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">#{cert.order}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {cert.url && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={cert.url} target="_blank">
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      )}
                      <CertificationActions certification={cert} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {certifications.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Certifications Added</h3>
            <p className="text-muted-foreground text-center mb-4">
              Add your professional certifications to showcase your expertise and credentials.
            </p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Certification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
