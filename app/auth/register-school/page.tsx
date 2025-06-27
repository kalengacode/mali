"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  School,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterSchoolPage() {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolCode: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolEmail: "",
    schoolWebsite: "",
    schoolDescription: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhone: "",
    adminPassword: "",
    confirmPassword: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.schoolName || !formData.schoolCode || !formData.adminFirstName || 
        !formData.adminLastName || !formData.adminEmail || !formData.adminPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (formData.adminPassword !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (formData.adminPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/schools/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        toast({
          title: "Inscription réussie !",
          description: `École ${data.school.name} créée avec succès. Vous pouvez maintenant vous connecter.`,
        });

        setTimeout(() => {
          router.push("/auth/login?message=school-created");
        }, 2000);
      } else {
        const error = await response.json();
        toast({
          title: "Erreur d'inscription",
          description: error.error || "Une erreur est survenue lors de l'inscription",
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
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          <div className="flex justify-center">
            <div className="relative">
              <School className="h-16 w-16 text-primary" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inscrire votre École sur MALI
            </h1>
            <p className="text-muted-foreground">
              Rejoignez les établissements qui digitalisent leur gestion académique
            </p>
          </div>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Inscription Établissement</CardTitle>
            <CardDescription>
              Créez le compte de votre école et devenez administrateur principal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Informations de l'École</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">Nom de l'école *</Label>
                    <Input
                      id="schoolName"
                      placeholder="Université de Kinshasa"
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange("schoolName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolCode">Code de l'école *</Label>
                    <Input
                      id="schoolCode"
                      placeholder="UNIKIN"
                      value={formData.schoolCode}
                      onChange={(e) => handleInputChange("schoolCode", e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolAddress">Adresse complète</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="schoolAddress"
                      placeholder="Avenue de l'Université, Mont-Amba, Kinshasa"
                      value={formData.schoolAddress}
                      onChange={(e) => handleInputChange("schoolAddress", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolPhone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="schoolPhone"
                        placeholder="+243 81 234 5678"
                        value={formData.schoolPhone}
                        onChange={(e) => handleInputChange("schoolPhone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail">Email officiel</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="schoolEmail"
                        type="email"
                        placeholder="info@unikin.ac.cd"
                        value={formData.schoolEmail}
                        onChange={(e) => handleInputChange("schoolEmail", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolWebsite">Site Web</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="schoolWebsite"
                      placeholder="https://www.unikin.ac.cd"
                      value={formData.schoolWebsite}
                      onChange={(e) => handleInputChange("schoolWebsite", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolDescription">Description de l'établissement</Label>
                  <Textarea
                    id="schoolDescription"
                    placeholder="Décrivez votre établissement, ses spécialités, son histoire..."
                    value={formData.schoolDescription}
                    onChange={(e) => handleInputChange("schoolDescription", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Compte Administrateur Principal</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminFirstName">Prénom *</Label>
                    <Input
                      id="adminFirstName"
                      placeholder="Jean"
                      value={formData.adminFirstName}
                      onChange={(e) => handleInputChange("adminFirstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminLastName">Nom *</Label>
                    <Input
                      id="adminLastName"
                      placeholder="Mukendi"
                      value={formData.adminLastName}
                      onChange={(e) => handleInputChange("adminLastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email administrateur *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@unikin.ac.cd"
                        value={formData.adminEmail}
                        onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminPhone"
                        placeholder="+243 81 234 5678"
                        value={formData.adminPhone}
                        onChange={(e) => handleInputChange("adminPhone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminPassword"
                        type="password"
                        placeholder="Minimum 6 caractères"
                        value={formData.adminPassword}
                        onChange={(e) => handleInputChange("adminPassword", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-900">Après inscription :</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Votre école sera ajoutée à la plateforme MALI</li>
                      <li>• Vous deviendrez administrateur principal avec tous les droits</li>
                      <li>• Vous pourrez inviter vos enseignants et étudiants</li>
                      <li>• Accès immédiat à tous les outils de gestion académique</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Création en cours..."
                  ) : (
                    <>
                      <School className="mr-2 h-5 w-5" />
                      Créer l'École et le Compte Administrateur
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Déjà inscrit ?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                      Se connecter
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
