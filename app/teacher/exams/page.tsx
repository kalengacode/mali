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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  Users,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function TeacherExamsPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const exams = [
    {
      id: 1,
      title: "Examen Final - Mathématiques",
      course: "Mathématiques Avancées",
      date: "2024-07-15",
      time: "09:00",
      duration: "3h",
      students: 45,
      status: "scheduled",
      type: "final",
    },
    {
      id: 2,
      title: "Test Intermédiaire",
      course: "Algèbre Linéaire",
      date: "2024-06-28",
      time: "14:00",
      duration: "2h",
      students: 32,
      status: "completed",
      type: "midterm",
    },
  ];

  const upcomingExams = exams.filter((e) => e.status === "scheduled");
  const completedExams = exams.filter((e) => e.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes Examens</h1>
          <p className="text-muted-foreground">
            Gérez vos examens et évaluations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Créer un Examen
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
                  À venir
                </p>
                <p className="text-2xl font-bold">{upcomingExams.length}</p>
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
                <p className="text-2xl font-bold">{completedExams.length}</p>
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
                  Étudiants
                </p>
                <p className="text-2xl font-bold">
                  {exams.reduce((sum, exam) => sum + exam.students, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Examens à venir</TabsTrigger>
          <TabsTrigger value="completed">Examens terminés</TabsTrigger>
          <TabsTrigger value="create">Créer un examen</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{exam.title}</CardTitle>
                      <CardDescription>{exam.course}</CardDescription>
                    </div>
                    <Badge variant="default">Programmé</Badge>
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
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{exam.title}</CardTitle>
                      <CardDescription>{exam.course}</CardDescription>
                    </div>
                    <Badge variant="secondary">Terminé</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <p className="font-medium">{exam.date}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Participants:
                      </span>
                      <p className="font-medium">{exam.students}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Résultats
                    </Button>
                    <Button size="sm" variant="outline">
                      Statistiques
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer un Nouvel Examen</CardTitle>
              <CardDescription>
                Configurez les détails de votre examen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Titre de l'examen
                  </label>
                  <Input placeholder="Ex: Examen Final - Mathématiques" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cours</label>
                  <Input placeholder="Sélectionner un cours" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Heure</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Durée</label>
                  <Input placeholder="Ex: 2h" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Annuler</Button>
                <Button>Créer l'Examen</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
