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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Users,
  Calendar,
  Clock,
  Star,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Mathématiques Avancées",
      description: "Cours de mathématiques niveau universitaire",
      instructor: "Dr. Aminata Traoré",
      category: "Sciences",
      students: 245,
      duration: "12 semaines",
      status: "active",
      rating: 4.8,
      price: "€299",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
    },
    {
      id: 2,
      title: "Physique Quantique",
      description: "Introduction à la physique quantique moderne",
      instructor: "Prof. Ibrahim Keita",
      category: "Sciences",
      students: 189,
      duration: "10 semaines",
      status: "active",
      rating: 4.6,
      price: "€349",
      startDate: "2024-02-01",
      endDate: "2024-04-12",
    },
    {
      id: 3,
      title: "Littérature Africaine",
      description: "Étude de la littérature africaine contemporaine",
      instructor: "Dr. Fatoumata Coulibaly",
      category: "Littérature",
      students: 156,
      duration: "8 semaines",
      status: "draft",
      rating: 4.9,
      price: "€199",
      startDate: "2024-03-01",
      endDate: "2024-04-26",
    },
    {
      id: 4,
      title: "Programmation Python",
      description: "Apprentissage complet du langage Python",
      instructor: "M. Moussa Diallo",
      category: "Informatique",
      students: 312,
      duration: "16 semaines",
      status: "active",
      rating: 4.7,
      price: "€399",
      startDate: "2024-01-08",
      endDate: "2024-04-29",
    },
    {
      id: 5,
      title: "Histoire de l'Afrique",
      description: "Histoire précoloniale et contemporaine de l'Afrique",
      instructor: "Prof. Sekou Touré",
      category: "Histoire",
      students: 98,
      duration: "6 semaines",
      status: "completed",
      rating: 4.5,
      price: "€149",
      startDate: "2023-11-01",
      endDate: "2023-12-15",
    },
  ];

  const categories = [
    "Sciences",
    "Littérature",
    "Informatique",
    "Histoire",
    "Langues",
    "Arts",
  ];
  const statuses = [
    { value: "active", label: "Actif", color: "bg-green-500" },
    { value: "draft", label: "Brouillon", color: "bg-yellow-500" },
    { value: "completed", label: "Terminé", color: "bg-blue-500" },
    { value: "suspended", label: "Suspendu", color: "bg-red-500" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || course.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "suspended":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return statuses.find((s) => s.value === status)?.label || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Cours</h1>
          <p className="text-muted-foreground">
            Gérez tous les cours de votre plateforme
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Cours
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un Nouveau Cours</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer un nouveau cours
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du cours</Label>
                  <Input id="title" placeholder="Ex: Mathématiques Avancées" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description détaillée du cours..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix</Label>
                  <Input id="price" placeholder="€299" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée</Label>
                  <Input id="duration" placeholder="12 semaines" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructeur</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-traore">
                        Dr. Aminata Traoré
                      </SelectItem>
                      <SelectItem value="prof-keita">
                        Prof. Ibrahim Keita
                      </SelectItem>
                      <SelectItem value="dr-coulibaly">
                        Dr. Fatoumata Coulibaly
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Créer le Cours
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Cours
                </p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Étudiants Inscrits
                </p>
                <p className="text-2xl font-bold">
                  {courses.reduce((sum, course) => sum + course.students, 0)}
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
                  Cours Actifs
                </p>
                <p className="text-2xl font-bold">
                  {courses.filter((c) => c.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Note Moyenne
                </p>
                <p className="text-2xl font-bold">
                  {(
                    courses.reduce((sum, course) => sum + course.rating, 0) /
                    courses.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un cours ou un instructeur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des cours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(course.status)}
                  <Badge
                    variant={
                      course.status === "active" ? "default" : "secondary"
                    }
                  >
                    {getStatusLabel(course.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students} étudiants
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {course.rating}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Instructeur</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Prix</p>
                  <p className="font-bold text-green-600">{course.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline">{course.category}</Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun cours trouvé</h3>
            <p className="text-muted-foreground">
              Aucun cours ne correspond à vos critères de recherche.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
