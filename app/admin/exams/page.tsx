"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";

export default function AdminExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const exams = [
    {
      id: 1,
      title: "Examen Final - Mathématiques",
      course: "Mathématiques Avancées",
      instructor: "Dr. Aminata Traoré",
      date: "2024-07-15",
      time: "09:00",
      duration: "3h",
      students: 245,
      status: "scheduled",
      type: "final",
    },
    {
      id: 2,
      title: "Test Intermédiaire - Physique",
      course: "Physique Quantique",
      instructor: "Prof. Ibrahim Keita",
      date: "2024-06-28",
      time: "14:00",
      duration: "2h",
      students: 189,
      status: "completed",
      type: "midterm",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Examens</h1>
          <p className="text-muted-foreground">
            Supervisez tous les examens de la plateforme
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Examen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Examens
                </p>
                <p className="text-2xl font-bold">{exams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Programmés
                </p>
                <p className="text-2xl font-bold">
                  {exams.filter((e) => e.status === "scheduled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Terminés
                </p>
                <p className="text-2xl font-bold">
                  {exams.filter((e) => e.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Participants
                </p>
                <p className="text-2xl font-bold">
                  {exams.reduce((sum, exam) => sum + exam.students, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription>{exam.course}</CardDescription>
                </div>
                <Badge
                  variant={
                    exam.status === "scheduled" ? "default" : "secondary"
                  }
                >
                  {exam.status === "scheduled" ? "Programmé" : "Terminé"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{exam.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Heure:</span>
                  <p className="font-medium">{exam.time}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Durée:</span>
                  <p className="font-medium">{exam.duration}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Étudiants:</span>
                  <p className="font-medium">{exam.students}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Instructeur: {exam.instructor}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
