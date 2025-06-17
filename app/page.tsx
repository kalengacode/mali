"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Shield,
  Globe,
  Zap,
  Award,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleLogin = async (role: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        role,
        name:
          role === "student"
            ? "Chris Kalenga"
            : role === "teacher"
            ? "Prof. Smith"
            : "Admin User",
      })
    );

    router.push(`/${role}/dashboard`);
    setIsLoading(false);
  };

  const features = [
    {
      icon: BookOpen,
      title: "Gestion Avancée des Cours",
      description:
        "Création, organisation et suivi des cours avec contenu multimédia intégré",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: Calendar,
      title: "Emploi du Temps Intelligent",
      description:
        "Génération automatique et optimisation des plannings académiques",
      color: "from-green-600 to-green-800",
    },
    {
      icon: Users,
      title: "Gestion Multi-Rôles",
      description:
        "Système complet pour étudiants, enseignants et administrateurs",
      color: "from-purple-600 to-purple-800",
    },
    {
      icon: CreditCard,
      title: "Paiements Mobile Money",
      description:
        "Intégration complète Orange Money, Airtel Money, Africell Money",
      color: "from-orange-600 to-orange-800",
    },
    {
      icon: FileText,
      title: "Documents Automatisés",
      description:
        "Génération automatique de certificats, relevés et attestations",
      color: "from-red-600 to-red-800",
    },
    {
      icon: MessageSquare,
      title: "Communication Temps Réel",
      description: "Chat intégré et système de notifications instantanées",
      color: "from-teal-600 to-teal-800",
    },
    {
      icon: BarChart3,
      title: "Analytics Avancées",
      description: "Tableaux de bord et statistiques détaillées en temps réel",
      color: "from-indigo-600 to-indigo-800",
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Authentification multi-facteurs et protection des données",
      color: "from-gray-600 to-gray-800",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Aminata Traoré",
      role: "Directrice Académique",
      institution: "Université de Bamako",
      content:
        "MALI a révolutionné notre gestion académique. L&apos;efficacité et la simplicité sont remarquables.",
      rating: 5,
    },
    {
      name: "Prof. Ibrahim Keita",
      role: "Enseignant",
      institution: "Institut Polytechnique",
      content:
        "Un outil indispensable pour tout enseignant moderne. La gestion des cours n&apos;a jamais été aussi simple.",
      rating: 5,
    },
    {
      name: "Fatoumata Coulibaly",
      role: "Étudiante",
      institution: "Faculté de Médecine",
      content:
        "Interface intuitive et fonctionnalités complètes. Parfait pour suivre mes études efficacement.",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Universités Partenaires", value: "25+", icon: GraduationCap },
    { label: "Étudiants Actifs", value: "15,000+", icon: Users },
    { label: "Cours Disponibles", value: "500+", icon: BookOpen },
    { label: "Taux de Satisfaction", value: "98%", icon: Star },
  ];

  const heroSlides = [
    {
      title: "Révolutionnez Votre Gestion Académique",
      subtitle:
        "Plateforme complète pour universités et institutions d'enseignement en RDC",
      image:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      title: "Innovation Pédagogique Africaine",
      subtitle:
        "Solutions adaptées aux besoins spécifiques de l'éducation congolaise",
      image:
        "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      title: "Excellence Académique Digitale",
      subtitle: "Transformez votre institution avec nos outils de pointe",
      image:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <GraduationCap className="h-10 w-10 text-black" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-3xl font-bold gradient-text">MALI</span>
                <Badge
                  variant="outline"
                  className="ml-2 border-orange-500 text-orange-600"
                >
                  RDC 🇨🇩
                </Badge>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Fonctionnalités
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                À Propos
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Témoignages
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Contact
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLogin("student")}
              >
                Démo Gratuite
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  🚀 Nouvelle Version 2024
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="gradient-text">Gestion</span>
                  <br />
                  <span className="text-gray-900">Académique</span>
                  <br />
                  <span className="text-gray-600">Moderne</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Plateforme complète de gestion universitaire conçue
                  spécifiquement pour les institutions d&apos;enseignement
                  congolaise. Gérez cours, étudiants, paiements et bien plus.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-8"
                  onClick={() => handleLogin("student")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir la Démo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger Brochure
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-black">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative bg-white rounded-2xl shadow-professional-lg p-8 border">
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>

                <Card className="mt-8 border-0 shadow-none">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold">
                      Accès Sécurisé
                    </CardTitle>
                    <CardDescription className="text-base">
                      Connectez-vous à votre espace personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="form-floating">
                        <Input
                          id="email"
                          type="email"
                          placeholder=" "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-14 text-base border-2 focus:border-black"
                        />
                        <Label htmlFor="email">Adresse Email</Label>
                      </div>
                      <div className="form-floating">
                        <Input
                          id="password"
                          type="password"
                          placeholder=" "
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-14 text-base border-2 focus:border-black"
                        />
                        <Label htmlFor="password">Mot de Passe</Label>
                      </div>
                    </div>

                    <Tabs defaultValue="student" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100">
                        <TabsTrigger
                          value="student"
                          className="data-[state=active]:bg-white data-[state=active]:text-black font-medium"
                        >
                          Étudiant
                        </TabsTrigger>
                        <TabsTrigger
                          value="teacher"
                          className="data-[state=active]:bg-white data-[state=active]:text-black font-medium"
                        >
                          Enseignant
                        </TabsTrigger>
                        <TabsTrigger
                          value="admin"
                          className="data-[state=active]:bg-white data-[state=active]:text-black font-medium"
                        >
                          Admin
                        </TabsTrigger>
                      </TabsList>

                      {["student", "teacher", "admin"].map((role) => (
                        <TabsContent key={role} value={role} className="mt-6">
                          <Button
                            onClick={() => handleLogin(role)}
                            className="w-full h-12 bg-black hover:bg-gray-800 text-white text-base font-medium"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Connexion...
                              </div>
                            ) : (
                              <>
                                Se Connecter
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </TabsContent>
                      ))}
                    </Tabs>

                    <div className="text-center">
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-black transition-colors"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-colors">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section
        id="features"
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              Fonctionnalités Avancées
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Une suite complète d&apos;outils professionnels pour moderniser
              votre institution éducative
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover-lift border-0 shadow-professional bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 p-0 h-auto text-black hover:text-gray-600"
                  >
                    En savoir plus
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Advanced Features Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  Intelligence Artificielle
                </Badge>
                <h2 className="text-4xl font-bold">
                  Fonctionnalités IA Intégrées
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Découvrez nos outils d&apos;intelligence artificielle qui
                  révolutionnent l&apos;expérience éducative
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Recommandations Personnalisées
                    </h3>
                    <p className="text-gray-300">
                      Suggestions de cours adaptées au profil et aux
                      performances de chaque étudiant
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Génération Automatique de Quiz
                    </h3>
                    <p className="text-gray-300">
                      Création automatique de tests et d&apos;évaluations à
                      partir du contenu des cours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Analyse Prédictive
                    </h3>
                    <p className="text-gray-300">
                      Prédiction des performances et identification précoce des
                      étudiants à risque
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Tableau de Bord IA</h3>
                    <Badge className="bg-green-500">En Direct</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">
                          Taux de Réussite Prédit
                        </span>
                        <span className="text-green-400 font-bold">87%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-green-400 h-2 rounded-full"
                          style={{ width: "87%" }}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">
                          Engagement Étudiant
                        </span>
                        <span className="text-blue-400 font-bold">92%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: "92%" }}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">
                          Satisfaction Cours
                        </span>
                        <span className="text-purple-400 font-bold">95%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-purple-400 h-2 rounded-full"
                          style={{ width: "95%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
              Témoignages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez pourquoi plus de 25 universités nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover-lift border-0 shadow-professional bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.institution}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-lg px-6 py-2">
              Offre Spéciale RDC 🇨🇩
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              Prêt à Transformer Votre Institution ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Rejoignez les universités congolaise qui ont déjà fait le choix de
              l&apos;excellence avec MALI
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={() => handleLogin("student")}
              >
                <Eye className="mr-2 h-5 w-5" />
                Demander une Démo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Parler à un Expert
              </Button>
            </div>

            <div className="pt-8 text-center">
              <p className="text-gray-400 mb-4">Déjà utilisé par :</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-lg font-semibold">
                  Université de Bamako
                </div>
                <div className="text-lg font-semibold">
                  Institut Polytechnique
                </div>
                <div className="text-lg font-semibold">USTTB</div>
                <div className="text-lg font-semibold">IPR/IFRA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-white border-t py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="h-8 w-8 text-black" />
                <span className="text-2xl font-bold gradient-text">MALI</span>
                <Badge
                  variant="outline"
                  className="border-orange-500 text-orange-600"
                >
                  RDC
                </Badge>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Révolutionnons ensemble l&apos;éducation Congolaise avec des
                outils modernes et adaptés à nos réalités locales.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white"
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white"
                >
                  LinkedIn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white"
                >
                  Twitter
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-black mb-4">Produit</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Tarification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black mb-4">Support</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Centre d&apos;Aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Formation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Communauté
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black mb-4">Entreprise</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    À Propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Partenaires
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2024 MALI RDC. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Conditions d&apos;Utilisation
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
