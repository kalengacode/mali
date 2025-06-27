"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  FileText,
  Award,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Download,
  Search,
  Filter,
  TrendingUp,
  Target,
} from "lucide-react";
import { format, addDays, isBefore, isAfter } from "date-fns";
import { fr } from "date-fns/locale";

interface Exam {
  id: string;
  subject: string;
  type: "partiel" | "final" | "rattrapage" | "cc";
  date: Date;
  duration: string;
  room: string;
  instructor: string;
  status: "upcoming" | "completed" | "missed";
  grade?: number;
  maxGrade: number;
  coefficient: number;
  description?: string;
}

interface ExamResult {
  id: string;
  subject: string;
  type: string;
  date: Date;
  grade: number;
  maxGrade: number;
  coefficient: number;
  rank?: number;
  classAverage?: number;
  comments?: string;
}

export default function StudentExams() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("current");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const exams: Exam[] = [
    {
      id: "1",
      subject: "Mathématiques Avancées",
      type: "partiel",
      date: addDays(new Date(), 5),
      duration: "3h",
      room: "Amphi A",
      instructor: "Prof. Johnson",
      status: "upcoming",
      maxGrade: 20,
      coefficient: 2,
      description: "Examen sur les intégrales et dérivées complexes",
    },
    {
      id: "2",
      subject: "Physique Quantique",
      type: "cc",
      date: addDays(new Date(), 2),
      duration: "2h",
      room: "Salle B-205",
      instructor: "Dr. Smith",
      status: "upcoming",
      maxGrade: 20,
      coefficient: 1,
      description: "Contrôle continu sur les principes de base",
    },
    {
      id: "3",
      subject: "Chimie Organique",
      type: "final",
      date: addDays(new Date(), -7),
      duration: "4h",
      room: "Amphi Grand",
      instructor: "Prof. Wilson",
      status: "completed",
      grade: 16,
      maxGrade: 20,
      coefficient: 3,
      description: "Examen final du semestre",
    },
    {
      id: "4",
      subject: "Informatique",
      type: "partiel",
      date: addDays(new Date(), -14),
      duration: "2h30",
      room: "Salle Info-12",
      instructor: "Dr. Brown",
      status: "completed",
      grade: 14,
      maxGrade: 20,
      coefficient: 2,
      description: "Programmation orientée objet",
    },
  ];

  const examResults: ExamResult[] = [
    {
      id: "1",
      subject: "Chimie Organique",
      type: "Examen Final",
      date: addDays(new Date(), -7),
      grade: 16,
      maxGrade: 20,
      coefficient: 3,
      rank: 5,
      classAverage: 13.2,
      comments: "Très bon travail, continuez ainsi!",
    },
    {
      id: "2",
      subject: "Informatique",
      type: "Partiel",
      date: addDays(new Date(), -14),
      grade: 14,
      maxGrade: 20,
      coefficient: 2,
      rank: 8,
      classAverage: 12.8,
      comments: "Bonne compréhension des concepts",
    },
    {
      id: "3",
      subject: "Statistiques",
      type: "Contrôle Continu",
      date: addDays(new Date(), -21),
      grade: 18,
      maxGrade: 20,
      coefficient: 1,
      rank: 2,
      classAverage: 14.5,
      comments: "Excellent travail!",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "final":
        return "bg-red-100 text-red-800";
      case "partiel":
        return "bg-orange-100 text-orange-800";
      case "cc":
        return "bg-blue-100 text-blue-800";
      case "rattrapage":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const upcomingExams = exams.filter((exam) => exam.status === "upcoming");
  const completedExams = exams.filter((exam) => exam.status === "completed");
  const averageGrade =
    completedExams.length > 0
      ? completedExams.reduce((sum, exam) => sum + (exam.grade || 0), 0) /
        completedExams.length
      : 0;

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Examens</h1>
            <p className="text-gray-600">
              Calendrier et résultats de vos examens
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relevé de Notes
            </Button>
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Planning
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Examens À Venir
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {upcomingExams.length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
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
                  <p
                    className={`text-2xl font-bold ${getGradeColor(
                      averageGrade,
                      20
                    )}`}
                  >
                    {averageGrade.toFixed(1)}/20
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Examens Réussis
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {completedExams.filter((e) => (e.grade || 0) >= 10).length}/
                    {completedExams.length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Classement Moyen
                  </p>
                  <p className="text-2xl font-bold text-purple-600">5ème</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">À Venir</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="preparation">Préparation</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Examens à Venir</span>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="upcoming">À venir</SelectItem>
                        <SelectItem value="completed">Terminés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {exam.subject}
                            </h3>
                            <Badge className={getTypeColor(exam.type)}>
                              {exam.type.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(exam.status)}>
                              {exam.status === "upcoming"
                                ? "À venir"
                                : "Terminé"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {exam.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {format(exam.date, "EEEE d MMMM yyyy", {
                                locale: fr,
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {exam.duration}
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              {exam.room}
                            </div>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-1" />
                              Coef. {exam.coefficient}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Réviser
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-1" />
                            Rappel
                          </Button>
                        </div>
                      </div>
                      {isBefore(exam.date, addDays(new Date(), 7)) && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-center">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                          <span className="text-yellow-800 text-sm">
                            Examen dans{" "}
                            {Math.ceil(
                              (exam.date.getTime() - new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            jour(s)
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Résultats d'Examens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {result.subject}
                            </h3>
                            <Badge variant="outline">{result.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span>
                              {format(result.date, "d MMMM yyyy", {
                                locale: fr,
                              })}
                            </span>
                            <span>Coef. {result.coefficient}</span>
                            {result.rank && <span>Rang: {result.rank}</span>}
                          </div>
                          {result.comments && (
                            <p className="text-sm text-gray-600 italic">
                              {result.comments}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${getGradeColor(
                              result.grade,
                              result.maxGrade
                            )}`}
                          >
                            {result.grade}/{result.maxGrade}
                          </div>
                          <div className="text-sm text-gray-500">
                            Moy. classe: {result.classAverage}/20
                          </div>
                          <div className="mt-2">
                            <Progress
                              value={(result.grade / result.maxGrade) * 100}
                              className="w-24 h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Calendrier des Examens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Calendrier interactif des examens</p>
                    <p className="text-sm">Fonctionnalité en développement</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prochains Examens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingExams.slice(0, 3).map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center p-2 border rounded"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {exam.subject}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(exam.date, "d MMM", { locale: fr })} -{" "}
                            {exam.duration}
                          </div>
                        </div>
                        <Badge className={getTypeColor(exam.type)} size="sm">
                          {exam.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guide de Préparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Révisions Organisées
                        </h4>
                        <p className="text-sm text-blue-700">
                          Planifiez vos révisions 2 semaines avant l'examen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-green-50 rounded-lg">
                      <Target className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">
                          Objectifs Clairs
                        </h4>
                        <p className="text-sm text-green-700">
                          Définissez des objectifs de révision quotidiens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-orange-50 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-900">
                          Gestion du Temps
                        </h4>
                        <p className="text-sm text-orange-700">
                          Utilisez des techniques de gestion du temps
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ressources de Révision</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Fiches de Révision
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Annales d'Examens
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Quiz d'Entraînement
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Supports de Cours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
