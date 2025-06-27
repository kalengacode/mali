"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Shield,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const users = [
    {
      id: "1",
      name: "Chris Kalenga",
      email: "chris.kalenga@example.com",
      role: "student",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-02-10",
      phone: "+243 999 123 456",
      department: "Informatique",
      year: "L3",
    },
    {
      id: "2",
      name: "Prof. Johnson",
      email: "johnson@example.com",
      role: "teacher",
      status: "active",
      joinDate: "2023-08-20",
      lastLogin: "2024-02-09",
      phone: "+243 999 234 567",
      department: "Mathématiques",
      courses: 3,
    },
    {
      id: "3",
      name: "Dr. Smith",
      email: "smith@example.com",
      role: "teacher",
      status: "active",
      joinDate: "2023-09-01",
      lastLogin: "2024-02-08",
      phone: "+243 999 345 678",
      department: "Physique",
      courses: 2,
    },
    {
      id: "4",
      name: "Marie Dubois",
      email: "marie.dubois@example.com",
      role: "student",
      status: "inactive",
      joinDate: "2023-12-10",
      lastLogin: "2024-01-20",
      phone: "+243 999 456 789",
      department: "Médecine",
      year: "L2",
    },
    {
      id: "5",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      joinDate: "2023-01-01",
      lastLogin: "2024-02-10",
      phone: "+243 999 567 890",
      department: "Administration",
      permissions: "full",
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "teacher":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Shield;
      case "teacher":
        return BookOpen;
      case "student":
        return GraduationCap;
      default:
        return Users;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const students = users.filter((u) => u.role === "student").length;
  const teachers = users.filter((u) => u.role === "teacher").length;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600">
              Gérez les étudiants, enseignants et administrateurs
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter Utilisateur
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Utilisateurs
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalUsers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Utilisateurs Actifs
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeUsers}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Étudiants</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {students}
                  </p>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Enseignants
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {teachers}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Liste des Utilisateurs</CardTitle>
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
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="student">Étudiants</SelectItem>
                    <SelectItem value="teacher">Enseignants</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="active">Actifs</SelectItem>
                    <SelectItem value="inactive">Inactifs</SelectItem>
                    <SelectItem value="suspended">Suspendus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <div
                    key={user.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <Badge className={getRoleColor(user.role)}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {user.role === "student"
                            ? "Étudiant"
                            : user.role === "teacher"
                            ? "Enseignant"
                            : "Admin"}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status === "active"
                            ? "Actif"
                            : user.status === "inactive"
                            ? "Inactif"
                            : "Suspendu"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {user.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {user.phone}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Inscrit: {user.joinDate}
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        <span>Département: {user.department}</span>
                        {user.year && <span> • Année: {user.year}</span>}
                        {user.courses && <span> • {user.courses} cours</span>}
                        {user.permissions && (
                          <span> • Permissions: {user.permissions}</span>
                        )}
                        <span> • Dernière connexion: {user.lastLogin}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
