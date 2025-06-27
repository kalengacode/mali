"use client";

import { ProtectedRoute } from "@/components/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  School,
  Users,
  BookOpen,
  GraduationCap,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Building,
} from "lucide-react";
import { useEffect, useState } from "react";

interface School {
  id: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  totalUsers: number;
  totalCourses: number;
  createdAt: string;
}

interface DashboardStats {
  overview: {
    totalSchools: number;
    totalUsers: number;
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
  };
  recentUsers: Array<{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [newSchool, setNewSchool] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    loadDashboardData();
    loadSchools();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    }
  };

  const loadSchools = async () => {
    try {
      const response = await fetch("/api/schools");
      if (response.ok) {
        const data = await response.json();
        setSchools(data.schools);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des écoles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSchool = async () => {
    if (!newSchool.name || !newSchool.code) {
      toast({
        title: "Erreur",
        description: "Le nom et le code sont requis",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchool),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Succès",
          description: "École créée avec succès",
        });
        setSchools([data.school, ...schools]);
        setIsDialogOpen(false);
        setNewSchool({
          name: "",
          code: "",
          address: "",
          phone: "",
          email: "",
          website: "",
          description: "",
        });
        loadDashboardData();
      } else {
        const error = await response.json();
        toast({
          title: "Erreur",
          description: error.error || "Erreur lors de la création",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion au serveur",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout role="admin">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DashboardLayout role="admin">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Dashboard Administrateur
                </h1>
                <p className="text-purple-100">
                  Gestion globale de la plateforme MALI
                </p>
              </div>
              <div className="hidden md:block">
                <Building className="h-16 w-16 text-purple-200" />
              </div>
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Écoles</CardTitle>
                  <School className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.overview.totalSchools}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Établissements actifs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Utilisateurs
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.overview.totalUsers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Comptes actifs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Étudiants
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.overview.totalStudents}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Étudiants inscrits
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Enseignants
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.overview.totalTeachers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Professeurs actifs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cours</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.overview.totalCourses}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cours disponibles
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  Gestion des Écoles
                </CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une École
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Créer une nouvelle école</DialogTitle>
                      <DialogDescription>
                        Ajoutez un nouvel établissement à la plateforme MALI
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nom de l'école *</Label>
                          <Input
                            id="name"
                            value={newSchool.name}
                            onChange={(e) =>
                              setNewSchool({
                                ...newSchool,
                                name: e.target.value,
                              })
                            }
                            placeholder="Université de Kinshasa"
                          />
                        </div>
                        <div>
                          <Label htmlFor="code">Code *</Label>
                          <Input
                            id="code"
                            value={newSchool.code}
                            onChange={(e) =>
                              setNewSchool({
                                ...newSchool,
                                code: e.target.value,
                              })
                            }
                            placeholder="UNIKIN"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          value={newSchool.address}
                          onChange={(e) =>
                            setNewSchool({
                              ...newSchool,
                              address: e.target.value,
                            })
                          }
                          placeholder="Avenue de l'Université, Kinshasa"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={newSchool.phone}
                            onChange={(e) =>
                              setNewSchool({
                                ...newSchool,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+243 81 234 5678"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newSchool.email}
                            onChange={(e) =>
                              setNewSchool({
                                ...newSchool,
                                email: e.target.value,
                              })
                            }
                            placeholder="info@unikin.ac.cd"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="website">Site Web</Label>
                        <Input
                          id="website"
                          value={newSchool.website}
                          onChange={(e) =>
                            setNewSchool({
                              ...newSchool,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://www.unikin.ac.cd"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newSchool.description}
                          onChange={(e) =>
                            setNewSchool({
                              ...newSchool,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description de l'établissement..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleCreateSchool}
                        disabled={isCreating}
                      >
                        {isCreating ? "Création..." : "Créer l'école"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                  <Card
                    key={school.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {school.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {school.code}
                          </Badge>
                        </div>
                        <School className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {school.address && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{school.address}</span>
                        </div>
                      )}
                      {school.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{school.phone}</span>
                        </div>
                      )}
                      {school.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{school.email}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm">
                          <span>{school.totalUsers} utilisateurs</span>
                          <span>{school.totalCourses} cours</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
