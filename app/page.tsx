"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Redirection automatique selon le rôle
      switch (user.role) {
        case "STUDENT":
          router.push("/student/dashboard");
          break;
        case "TEACHER":
          router.push("/teacher/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        default:
          break;
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est connecté, afficher un message de redirection
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Redirection en cours...</h2>
          <p className="text-gray-600 mb-4">
            Bienvenue {user.firstName} {user.lastName}
          </p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Page d'accueil simple pour les utilisateurs non connectés
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MALI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Se connecter</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                S&apos;inscrire
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <GraduationCap className="h-24 w-24 text-blue-600" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plateforme Éducative
            <span className="block text-blue-600">MALI</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Une solution complète pour la gestion académique et
            l&apos;apprentissage en ligne
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                Commencer maintenant
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Se connecter
              </Button>
            </Link>
          </div>

          {/* Comptes de test */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">
              Comptes de test disponibles
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Étudiant:</strong> etudiant1@mali.cd
              </p>
              <p>
                <strong>Enseignant:</strong> prof.kamau@mali.cd
              </p>
              <p>
                <strong>Administrateur:</strong> admin@mali.cd
              </p>
              <p className="text-xs mt-2">
                <strong>Mot de passe:</strong> password123
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 MALI - Plateforme Éducative. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
