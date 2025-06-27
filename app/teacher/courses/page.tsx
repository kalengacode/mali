"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function TeacherCourses() {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: "1",
      name: "Mathématiques Avancées",
      code: "MATH-301",
      semester: "Automne 2024",
      students: 32,
      capacity: 35,
      sessions: 24,
      completedSessions: 18,
      nextSession: "2024-02-15 09:00",
      status: "active",
      assignments: 5,
      avgGrade: 78.5,
    },
    {
      id: "2",
      name: "Calcul Différentiel",
      code: "MATH-201",
      semester: "Automne 2024",
      students: 28,
      capacity: 30,
      sessions: 20,
      completedSessions: 15,
      nextSession: "2024-02-16 11:00",
      status: "active",
      assignments: 4,
      avgGrade: 82.3,
    },
    {
      id: "3",
      name: "Statistiques",
      code: "STAT-101",
      semester: "Automne 2024",
      students: 25,
      capacity: 30,
      sessions: 16,
      completedSessions: 12,
      nextSession: "2024-02-17 14:00",
      status: "active",
      assignments: 3,
      avgGrade: 75.8,
    },
    {
      id: "4",
      name: "Algèbre Linéaire",
      code: "MATH-102",
      semester: "Été 2024",
      students: 0,
      capacity: 25,
      sessions: 18,
      completedSessions: 18,
      nextSession: null,
      status: "completed",
      assignments: 6,
      avgGrade: 79.2,
    },
  ];

  const recentActivities = [
    {
      id: "1",
      type: "assignment",
      message: "5 nouveaux devoirs soumis pour MATH-301",
      time: "2 heures",
      course: "Mathématiques Avancées",
    },
    {
      id: "2",
      type: "grade",
      message: "Notes publiées pour MATH-201",
      time: "4 heures",
      course: "Calcul Différentiel",
    },
    {
      id: "3",
      type: "question",
      message: "Nouvelle question d'étudiant dans STAT-101",
      time: "1 jour",
      course: "Statistiques",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeCourses = courses.filter((course) => course.status === "active");
  const totalStudents = activeCourses.reduce(
    (sum, course) => sum + course.students,
    0
  );
  const avgGrade =
    activeCourses.reduce((sum, course) => sum + course.avgGrade, 0) /
    activeCourses.length;

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
            <p className="text-gray-600">
              Gérez vos cours et suivez les progrès de vos étudiants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Cours
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Cours Actifs
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {activeCourses.length}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Étudiants
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalStudents}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Moyenne Générale
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {avgGrade.toFixed(1)}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Devoirs à Corriger
                  </p>
                  <p className="text-2xl font-bold text-red-600">12</p>
                </div>
                <FileText className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Cours Actifs</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
            <TabsTrigger value="draft">Brouillons</TabsTrigger>
            <TabsTrigger value="activities">Activités</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Rechercher un cours..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {course.name}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            {course.code} • {course.semester}
                          </p>
                        </div>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status === "active" ? "Actif" : "Terminé"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>
                            {course.students}/{course.capacity} étudiants
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span>
                            {course.completedSessions}/{course.sessions}{" "}
                            sessions
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{course.assignments} devoirs</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Moy: {course.avgGrade}%</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Progression du cours
                          </span>
                          <span className="text-sm text-gray-500">
                            {Math.round(
                              (course.completedSessions / course.sessions) * 100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (course.completedSessions / course.sessions) * 100
                          }
                          className="h-2"
                        />
                      </div>

                      {course.nextSession && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="text-blue-800">
                              Prochain cours: {course.nextSession}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                        </div>
                        <Button size="sm">Gérer</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cours Terminés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses
                    .filter((course) => course.status === "completed")
                    .map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {course.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {course.code} • {course.semester}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            <span>
                              Terminé • {course.students} étudiants • Moy:{" "}
                              {course.avgGrade}%
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button size="sm" variant="outline">
                            Archiver
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="draft" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Brouillons de Cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun brouillon de cours</p>
                  <p className="text-sm">
                    Créez un nouveau cours pour commencer
                  </p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un Cours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Activités Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span>Il y a {activity.time}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.course}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Voir
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
