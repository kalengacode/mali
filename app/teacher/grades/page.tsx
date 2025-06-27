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
  GraduationCap,
  TrendingUp,
  Users,
  BarChart3,
  Download,
  Edit,
  Save,
} from "lucide-react";

export default function TeacherGradesPage() {
  const [selectedCourse, setSelectedCourse] = useState("math-advanced");
  const [editMode, setEditMode] = useState(false);

  const students = [
    {
      id: 1,
      name: "Fatoumata Coulibaly",
      email: "fatoumata.c@email.com",
      grades: {
        midterm: 85,
        final: 92,
        assignments: 88,
        participation: 90,
      },
      average: 88.75,
    },
    {
      id: 2,
      name: "Ibrahim Keita",
      email: "ibrahim.k@email.com",
      grades: {
        midterm: 78,
        final: 84,
        assignments: 82,
        participation: 85,
      },
      average: 82.25,
    },
  ];

  const courses = [
    { id: "math-advanced", name: "Mathématiques Avancées", students: 45 },
    { id: "algebra", name: "Algèbre Linéaire", students: 32 },
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Notes</h1>
          <p className="text-muted-foreground">
            Gérez les notes et évaluations de vos étudiants
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            <Edit className="h-4 w-4 mr-2" />
            {editMode ? "Arrêter" : "Modifier"}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Étudiants
                </p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Moyenne Classe
                </p>
                <p className="text-2xl font-bold">
                  {(
                    students.reduce((sum, s) => sum + s.average, 0) /
                    students.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Taux de Réussite
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (students.filter((s) => s.average >= 70).length /
                      students.length) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Meilleure Note
                </p>
                <p className="text-2xl font-bold">
                  {Math.max(...students.map((s) => s.average)).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notes des Étudiants</CardTitle>
              <CardDescription>
                Consultez et modifiez les notes de vos étudiants
              </CardDescription>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Étudiant</th>
                  <th className="text-center p-4">Examen Intermédiaire</th>
                  <th className="text-center p-4">Examen Final</th>
                  <th className="text-center p-4">Devoirs</th>
                  <th className="text-center p-4">Participation</th>
                  <th className="text-center p-4">Moyenne</th>
                  <th className="text-center p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      {editMode ? (
                        <Input
                          type="number"
                          defaultValue={student.grades.midterm}
                          className="w-20 text-center"
                          min="0"
                          max="100"
                        />
                      ) : (
                        <span
                          className={`font-medium ${getGradeColor(
                            student.grades.midterm
                          )}`}
                        >
                          {student.grades.midterm}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {editMode ? (
                        <Input
                          type="number"
                          defaultValue={student.grades.final}
                          className="w-20 text-center"
                          min="0"
                          max="100"
                        />
                      ) : (
                        <span
                          className={`font-medium ${getGradeColor(
                            student.grades.final
                          )}`}
                        >
                          {student.grades.final}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {editMode ? (
                        <Input
                          type="number"
                          defaultValue={student.grades.assignments}
                          className="w-20 text-center"
                          min="0"
                          max="100"
                        />
                      ) : (
                        <span
                          className={`font-medium ${getGradeColor(
                            student.grades.assignments
                          )}`}
                        >
                          {student.grades.assignments}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {editMode ? (
                        <Input
                          type="number"
                          defaultValue={student.grades.participation}
                          className="w-20 text-center"
                          min="0"
                          max="100"
                        />
                      ) : (
                        <span
                          className={`font-medium ${getGradeColor(
                            student.grades.participation
                          )}`}
                        >
                          {student.grades.participation}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      <Badge
                        variant={
                          student.average >= 70 ? "default" : "destructive"
                        }
                        className="font-bold"
                      >
                        {student.average.toFixed(1)}
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      {editMode ? (
                        <Button size="sm" variant="outline">
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          Détails
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques de la Classe</CardTitle>
            <CardDescription>
              Analyse des performances de vos étudiants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Excellent (90-100)</span>
                <span className="text-sm font-medium">
                  {students.filter((s) => s.average >= 90).length} étudiants
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (students.filter((s) => s.average >= 90).length /
                        students.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Bien (80-89)</span>
                <span className="text-sm font-medium">
                  {
                    students.filter((s) => s.average >= 80 && s.average < 90)
                      .length
                  }{" "}
                  étudiants
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (students.filter((s) => s.average >= 80 && s.average < 90)
                        .length /
                        students.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Passable (70-79)</span>
                <span className="text-sm font-medium">
                  {
                    students.filter((s) => s.average >= 70 && s.average < 80)
                      .length
                  }{" "}
                  étudiants
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (students.filter((s) => s.average >= 70 && s.average < 80)
                        .length /
                        students.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Outils de gestion des notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Exporter les notes (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Générer le bulletin de notes
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Rapport de performance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Envoyer les notes aux étudiants
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
