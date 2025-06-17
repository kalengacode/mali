'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  Clock,
  TrendingUp,
  Award,
  AlertCircle,
  Users,
  Target,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Bell,
  MessageSquare,
  BarChart3
} from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('grades');
  const [unreadAnnouncements, setUnreadAnnouncements] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Mettre à jour l&apos;onglet actif en fonction de l&apos;URL
  useEffect(() => {
    if (pathname.includes('grades')) setActiveTab('grades');
    else if (pathname.includes('announcements')) setActiveTab('announcements');
    else if (pathname.includes('achievements')) setActiveTab('achievements');
    else if (pathname.includes('analytics')) setActiveTab('analytics');
  }, [pathname]);

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simuler un chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Mettre à jour l&apos;URL sans recharger la page
    window.history.pushState({}, '', `/student/dashboard?tab=${value}`);
  };
  const upcomingClasses = [
    { 
      subject: 'Mathématiques Avancées', 
      time: '09:00', 
      room: 'Salle A-101', 
      instructor: 'Prof. Johnson',
      type: 'Cours Magistral',
      duration: '2h',
      status: 'confirmed'
    },
    { 
      subject: 'Physique Quantique', 
      time: '11:00', 
      room: 'Lab B-205', 
      instructor: 'Dr. Smith',
      type: 'Travaux Pratiques',
      duration: '3h',
      status: 'confirmed'
    },
    { 
      subject: 'Chimie Organique', 
      time: '14:00', 
      room: 'Lab C-301', 
      instructor: 'Prof. Wilson',
      type: 'Laboratoire',
      duration: '2h30',
      status: 'pending'
    },
  ];

  const recentGrades = [
    { subject: 'Mathématiques', grade: 85, date: '2024-01-15', trend: 'up', improvement: '+5' },
    { subject: 'Physique', grade: 92, date: '2024-01-10', trend: 'up', improvement: '+8' },
    { subject: 'Chimie', grade: 78, date: '2024-01-08', trend: 'down', improvement: '-2' },
    { subject: 'Informatique', grade: 88, date: '2024-01-05', trend: 'up', improvement: '+3' },
  ];

  const announcements = [
    { 
      title: 'Inscription Semestre de Printemps', 
      date: '2024-01-20', 
      priority: 'high',
      category: 'Académique',
      read: false
    },
    { 
      title: 'Horaires Bibliothèque Étendus', 
      date: '2024-01-18', 
      priority: 'medium',
      category: 'Information',
      read: false
    },
    { 
      title: 'Nouveaux Supports de Cours Disponibles', 
      date: '2024-01-15', 
      priority: 'low',
      category: 'Ressources',
      read: true
    },
  ];

  const achievements = [
    { title: 'Étudiant du Mois', icon: Award, color: 'text-yellow-600', date: 'Janvier 2024' },
    { title: 'Parfaite Assiduité', icon: CheckCircle, color: 'text-green-600', date: 'Décembre 2023' },
    { title: 'Excellence Académique', icon: Star, color: 'text-purple-600', date: 'Novembre 2023' },
  ];

  const quickStats = [
    { label: 'Cours Suivis', value: '6', change: '+1', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Moyenne Générale', value: '85%', change: '+5%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Paiements En Attente', value: '2', change: '-1', icon: CreditCard, color: 'bg-orange-500' },
    { label: 'Certificats Obtenus', value: '3', change: '+1', icon: Award, color: 'bg-purple-500' },
  ];

  const learningProgress = [
    { course: 'Mathématiques Avancées', progress: 75, totalLessons: 20, completedLessons: 15 },
    { course: 'Physique Quantique', progress: 60, totalLessons: 18, completedLessons: 11 },
    { course: 'Chimie Organique', progress: 85, totalLessons: 16, completedLessons: 14 },
    { course: 'Informatique', progress: 45, totalLessons: 22, completedLessons: 10 },
  ];

  return (
    <DashboardLayout role="student">
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
      <div className="space-y-8 animate-fade-in-up">
        {/* Enhanced Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-4 sm:p-8 rounded-2xl shadow-professional-lg">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-4 border-white/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-white/20 text-white text-xl font-bold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Bon retour, chris!</h1>
                  <p className="text-blue-100 text-base sm:text-lg">Prêt à continuer votre parcours d&apos;apprentissage?</p>
                  <Badge className="mt-2 bg-white/20 text-white border-white/30">
                    Étudiant en Licence 3
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-center hidden xs:block">
                <div className="text-xl sm:text-2xl font-bold">15</div>
                <div className="text-blue-100 text-xs sm:text-sm">Jours restants</div>
              </div>
              <div className="text-center hidden xs:block">
                <div className="text-xl sm:text-2xl font-bold">4.2</div>
                <div className="text-blue-100 text-xs sm:text-sm">GPA</div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16" />
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-6 sm:translate-y-12 -translate-x-6 sm:-translate-x-12" />
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover-lift border-0 shadow-professional bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">depuis le mois dernier</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Planning du jour (responsive) */}
          <Card className="lg:col-span-2 border-0 shadow-professional">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
                  <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                  Planning d&apos;Aujourd&apos;hui
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800 mt-2 sm:mt-0">
                  {upcomingClasses.length} cours
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((class_, index) => (
                  <div key={index} className="group relative p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border hover:shadow-md transition-all duration-200">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Clock className="h-6 w-6 text-white" aria-label="Heure du cours" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <h4 className="font-semibold text-gray-900 truncate">{class_.subject}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {class_.time}
                            </Badge>
                            <Badge 
                              variant={class_.status === 'confirmed' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {class_.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" aria-label="Instructeur" />
                            {class_.instructor}
                          </span>
                          <span>{class_.room}</span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" aria-label="Durée" />
                            {class_.duration}
                          </span>
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {class_.type}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity w-full md:w-auto mt-2 md:mt-0">
                        <Play className="h-4 w-4 mr-1" />
                        Rejoindre
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/student/schedule" className="w-full block">
                <Button className="w-full mt-4" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Voir Planning Complet
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Progression (responsive) */}
          <Card className="border-0 shadow-professional">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
                <Target className="mr-3 h-6 w-6 text-green-600" />
                Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningProgress.map((course, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-xs sm:text-sm text-gray-900 mb-1">{course.course}</h4>
                        <p className="text-xs text-gray-500">
                          {course.completedLessons}/{course.totalLessons} leçons
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {course.progress}%
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
              <Link href="/student/courses" className="w-full block">
                <Button className="w-full mt-6" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continuer l&apos;Apprentissage
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-12 bg-gray-100">
            <TabsTrigger value="grades" className="data-[state=active]:bg-white font-medium text-xs sm:text-base">
              Notes Récentes
            </TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-white font-medium text-xs sm:text-base">
              Annonces
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white font-medium text-xs sm:text-base">
              Réussites
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white font-medium text-xs sm:text-base">
              Analytiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="mt-6 animate-fade-in">
            <Card className="border-0 shadow-professional overflow-x-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Évolution des Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 min-w-[320px]">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border gap-2">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          grade.grade >= 80 ? 'bg-green-100 text-green-600' : 
                          grade.grade >= 60 ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-red-100 text-red-600'
                        }`}>
                          <span className="font-bold text-sm">{grade.grade}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-xs sm:text-base">{grade.subject}</h4>
                          <p className="text-xs sm:text-sm text-gray-500">{grade.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={grade.trend === 'up' ? 'default' : 'secondary'}
                          className={grade.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {grade.improvement}
                        </Badge>
                        <Progress value={grade.grade} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Annonces récentes</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {unreadAnnouncements} non lues
              </Badge>
            </div>
            <Card className="border-0 shadow-professional">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-blue-600" />
                    Annonces Importantes
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    {announcements.filter(a => !a.read).length} non lues
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      announcement.priority === 'high' ? 'border-red-500 bg-red-50' :
                      announcement.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    } ${!announcement.read ? 'bg-opacity-100' : 'bg-opacity-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                            {!announcement.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{announcement.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {announcement.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            announcement.priority === 'high' ? 'destructive' : 
                            announcement.priority === 'medium' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {announcement.priority === 'high' ? 'Urgent' : 
                           announcement.priority === 'medium' ? 'Important' : 'Info'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6 animate-fade-in">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Vos Réussites</h2>
              <p className="text-muted-foreground">
                Félicitations pour vos accomplissements ! Continuez ainsi pour débloquer plus de succès.
              </p>
            </div>
            <Card className="border-0 shadow-professional">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-600" />
                  Réussites & Récompenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border hover:shadow-md transition-shadow">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-4`}>
                        <achievement.icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.date}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    <Star className="mr-2 h-4 w-4" />
                    Voir Tous les Badges
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Analytiques de Performance</h2>
              <p className="text-muted-foreground">
                Suivez vos progrès et vos performances au fil du temps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-professional">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
                    Performance Mensuelle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Janvier', 'Février', 'Mars', 'Avril'].map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{month}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={75 + index * 5} className="w-24 h-2" />
                          <span className="text-sm font-medium">{75 + index * 5}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-professional">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-orange-600" />
                    Temps d&apos;Étude
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">32h</div>
                    <p className="text-sm text-gray-600">cette semaine</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Objectif hebdomadaire</span>
                      <span className="font-medium">30h</span>
                    </div>
                    <Progress value={107} className="h-2" />
                    <p className="text-xs text-green-600 text-center">+7% au-dessus de l&apos;objectif!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Quick Actions */}
        <Card className="border-0 shadow-professional">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 sm:h-24 flex flex-col items-center justify-center hover-lift group text-xs sm:text-sm">
                <BookOpen className="h-8 w-8 mb-2 group-hover:text-blue-600 transition-colors" aria-label="Mes Cours" />
                <span className="font-medium">Mes Cours</span>
              </Button>
              <Button variant="outline" className="h-20 sm:h-24 flex flex-col items-center justify-center hover-lift group text-xs sm:text-sm">
                <Calendar className="h-8 w-8 mb-2 group-hover:text-green-600 transition-colors" aria-label="Planning" />
                <span className="font-medium">Planning</span>
              </Button>
              <Button variant="outline" className="h-20 sm:h-24 flex flex-col items-center justify-center hover-lift group text-xs sm:text-sm">
                <CreditCard className="h-8 w-8 mb-2 group-hover:text-orange-600 transition-colors" aria-label="Paiements" />
                <span className="font-medium">Paiements</span>
              </Button>
              <Button variant="outline" className="h-20 sm:h-24 flex flex-col items-center justify-center hover-lift group text-xs sm:text-sm">
                <FileText className="h-8 w-8 mb-2 group-hover:text-purple-600 transition-colors" aria-label="Documents" />
                <span className="font-medium">Documents</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      )}
    </DashboardLayout>
  );
}