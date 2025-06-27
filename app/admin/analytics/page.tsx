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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Calendar,
  Target,
  Activity,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const overviewStats = [
    {
      title: "Étudiants Actifs",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Cours Dispensés",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Revenus Totaux",
      value: "€284,750",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Taux de Réussite",
      value: "87.3%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
    },
  ];

  const performanceData = [
    { name: "Mathématiques", students: 245, completion: 89, satisfaction: 4.7 },
    { name: "Physique", students: 198, completion: 84, satisfaction: 4.5 },
    { name: "Chimie", students: 167, completion: 91, satisfaction: 4.8 },
    { name: "Biologie", students: 203, completion: 87, satisfaction: 4.6 },
    { name: "Informatique", students: 289, completion: 93, satisfaction: 4.9 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000, students: 2100 },
    { month: "Fév", revenue: 52000, students: 2250 },
    { month: "Mar", revenue: 48000, students: 2180 },
    { month: "Avr", revenue: 61000, students: 2400 },
    { month: "Mai", revenue: 58000, students: 2350 },
    { month: "Jun", revenue: 67000, students: 2500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Rapports</h1>
          <p className="text-muted-foreground">
            Tableau de bord analytique complet de votre plateforme
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">7 jours</SelectItem>
              <SelectItem value="month">30 jours</SelectItem>
              <SelectItem value="quarter">3 mois</SelectItem>
              <SelectItem value="year">1 an</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={refreshData} disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Actualiser
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span>vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance des Cours</TabsTrigger>
          <TabsTrigger value="revenue">Revenus & Finances</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Utilisateurs</TabsTrigger>
          <TabsTrigger value="reports">Rapports Détaillés</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance par Matière
                </CardTitle>
                <CardDescription>
                  Analyse des performances académiques par discipline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{course.name}</span>
                      <Badge variant="secondary">
                        {course.students} étudiants
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Taux de completion</span>
                        <span>{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Satisfaction</span>
                      <span>{course.satisfaction}/5 ⭐</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Activité Temps Réel
                </CardTitle>
                <CardDescription>
                  Métriques d'activité en direct
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Utilisateurs connectés</span>
                    <span className="font-bold text-green-600">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cours en cours</span>
                    <span className="font-bold text-blue-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Examens actifs</span>
                    <span className="font-bold text-orange-600">7</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Pics d'activité</h4>
                  <div className="text-sm text-muted-foreground">
                    <div>• 9h-11h: Cours magistraux</div>
                    <div>• 14h-16h: Travaux pratiques</div>
                    <div>• 18h-20h: Révisions</div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Charge serveur</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Évolution des Revenus</CardTitle>
                <CardDescription>
                  Revenus mensuels et nombre d'étudiants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{data.month}</div>
                        <div className="text-sm text-muted-foreground">
                          {data.students} étudiants
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          €{data.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          €{Math.round(data.revenue / data.students)} /étudiant
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des Revenus</CardTitle>
                <CardDescription>
                  Sources de revenus principales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Frais de scolarité</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <Progress value={78} />

                  <div className="flex justify-between items-center">
                    <span>Cours premium</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <Progress value={15} />

                  <div className="flex justify-between items-center">
                    <span>Certifications</span>
                    <span className="font-bold">7%</span>
                  </div>
                  <Progress value={7} />
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      €284,750
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total ce mois
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement des Étudiants</CardTitle>
                <CardDescription>
                  Métriques d'engagement et de participation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-muted-foreground">
                      Taux de connexion
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">76%</div>
                    <div className="text-sm text-muted-foreground">
                      Participation active
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Temps moyen par session</span>
                      <span className="text-sm font-medium">2h 34min</span>
                    </div>
                    <Progress value={85} />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Complétion des devoirs</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">
                        Participation aux discussions
                      </span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Globale</CardTitle>
                <CardDescription>
                  Retours et évaluations des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500">4.7</div>
                  <div className="text-sm text-muted-foreground">
                    Note moyenne
                  </div>
                  <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">5 étoiles</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={68} className="w-20" />
                      <span className="text-sm">68%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">4 étoiles</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={23} className="w-20" />
                      <span className="text-sm">23%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">3 étoiles</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={7} className="w-20" />
                      <span className="text-sm">7%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">2 étoiles</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={2} className="w-20" />
                      <span className="text-sm">2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapports Disponibles</CardTitle>
                <CardDescription>
                  Générez des rapports détaillés pour l'analyse
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Rapport d'activité mensuel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Analyse des performances
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Rapport financier
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Statistiques d'engagement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Rapport de satisfaction
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertes & Notifications</CardTitle>
                <CardDescription>
                  Surveillez les métriques importantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">
                      Objectif de revenus atteint
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +15% par rapport au mois dernier
                  </div>
                </div>

                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">
                      Nouveau pic d'inscriptions
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    127 nouvelles inscriptions cette semaine
                  </div>
                </div>

                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">
                      Attention: Baisse d'engagement
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    -5% de participation aux discussions
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
