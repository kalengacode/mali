"use client";

import { ProtectedRoute } from "@/components/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  School,
  Users,
  GraduationCap,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardStats {
  overview: {
    totalCourses: number;
  };
  enrollments: Array<{
    id: string;
    course: {
      title: string;
      code: string;
      status: string;
    };
    enrolledAt: string;
  }>;
}

interface UserData {
  firstName: string;
  lastName: string;
  role: string;
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setUserData(data.user);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* En-tête de bienvenue */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Bienvenue, {userData?.firstName} {userData?.lastName} !
                </h1>
                <p className="text-blue-100">
                  Tableau de bord étudiant - Plateforme MALI
                </p>
              </div>
              <div className="hidden md:block">
                <GraduationCap className="h-16 w-16 text-blue-200" />
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cours Inscrits
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.overview.totalCourses || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cours actifs cette année
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Présence</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">95%</div>
                <p className="text-xs text-muted-foreground">
                  Taux de présence moyen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Prochains Cours
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreference">
                  Cours cette semaine
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Devoirs</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">2</div>
                <p className="text-xs text-muted-foreground">
                  À rendre cette semaine
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mes cours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Mes Cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.enrollments && stats.enrollments.length > 0 ? (
                <div className="space-y-4">
                  {stats.enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Code: {enrollment.course.code}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Inscrit le:{" "}
                            {new Date(
                              enrollment.enrolledAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            enrollment.course.status === "ACTIVE"
                              ? "default"
                              : enrollment.course.status === "COMPLETED"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {enrollment.course.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Voir le cours
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Aucun cours inscrit
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Vous n'êtes inscrit à aucun cours pour le moment.
                  </p>
                  <Button>Explorer les cours</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
