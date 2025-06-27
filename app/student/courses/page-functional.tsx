"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Download,
  Play,
  CheckCircle,
  Calendar,
  Loader2,
  DollarSign,
  User,
  GraduationCap,
  Heart,
  BookMarked,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  price: number;
  duration: string;
  maxStudents: number;
  status: string;
  startDate: string;
  endDate: string;
  teacher: {
    id: string;
    name: string;
    department: string;
    specialization?: string;
  };
  enrolledStudents: number;
  isEnrolled: boolean;
}

interface Enrollment {
  id: string;
  enrolledAt: string;
  grade: number | null;
  isActive: boolean;
  course: Course;
}

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesRes, enrollmentsRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/enrollments"),
      ]);

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.courses || []);
      }

      if (enrollmentsRes.ok) {
        const enrollmentsData = await enrollmentsRes.json();
        setEnrollments(enrollmentsData.enrollments || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      setEnrolling(courseId);
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Inscription réussie au cours",
        });
        fetchData();
      } else {
        const error = await response.json();
        toast({
          title: "Erreur",
          description: error.error || "Impossible de s'inscrire",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion",
        variant: "destructive",
      });
    } finally {
      setEnrolling(null);
    }
  };

  const enrolledCourseIds = enrollments.map((e) => e.course.id);
  const enrolledCourses = enrollments.filter((e) => e.isActive);
  const availableCourses = courses.filter(
    (course) => !enrolledCourseIds.includes(course.id)
  );

  const filteredAvailableCourses = availableCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateProgress = (enrollment: Enrollment) => {
    const enrolledDate = new Date(enrollment.enrolledAt);
    const now = new Date();
    const daysSinceEnrollment = Math.floor(
      (now.getTime() - enrolledDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.min(daysSinceEnrollment * 5, 100);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement des cours...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mes Cours</h1>
          <p className="text-muted-foreground">
            Gérez vos cours inscrits et découvrez de nouveaux cours
          </p>
        </div>

        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enrolled" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              Mes Cours ({enrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Cours Disponibles ({availableCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Aucun cours inscrit
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Vous n'êtes inscrit à aucun cours pour le moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((enrollment) => {
                  const progress = calculateProgress(enrollment);
                  return (
                    <Card
                      key={enrollment.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="secondary">
                            {enrollment.course.category}
                          </Badge>
                          <Badge
                            variant={
                              enrollment.isActive ? "default" : "secondary"
                            }
                          >
                            {enrollment.isActive ? "Actif" : "Terminé"}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">
                          {enrollment.course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {enrollment.course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {enrollment.course.teacher.name}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progrès</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="w-full" />
                        </div>

                        {enrollment.grade && (
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>Note: {enrollment.grade}/20</span>
                          </div>
                        )}

                        <div className="text-sm text-muted-foreground">
                          Inscrit le:{" "}
                          {new Date(enrollment.enrolledAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Continuer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAvailableCourses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge
                        variant={
                          course.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {course.status === "ACTIVE" ? "Actif" : course.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {course.teacher.name} - {course.teacher.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {course.enrolledStudents} / {course.maxStudents || "∞"}{" "}
                        étudiants
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {course.price} USD
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        size="sm"
                        onClick={() => enrollInCourse(course.id)}
                        disabled={enrolling === course.id}
                      >
                        {enrolling === course.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <GraduationCap className="h-4 w-4 mr-2" />
                        )}
                        S'inscrire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
