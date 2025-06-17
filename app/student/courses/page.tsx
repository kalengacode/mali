'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Clock, 
  Users, 
  FileText, 
  Video, 
  Download, 
  Search,
  Filter,
  Star,
  Play,
  CheckCircle,
  AlertCircle,
  Calendar,
  Award,
  TrendingUp,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

export default function StudentCourses() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');



  const enrolledCourses = [
    {
      id: 1,
      title: 'Mathématiques Avancées',
      instructor: 'Prof. Johnson',
      instructorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      progress: 75,
      students: 32,
      nextClass: 'Aujourd\'hui à 9:00',
      status: 'active',
      materials: 12,
      assignments: 3,
      rating: 4.8,
      category: 'Sciences',
      difficulty: 'Avancé',
      duration: '16 semaines',
      completedLessons: 12,
      totalLessons: 16,
      lastAccessed: '2 heures',
      certificate: true
    },
    {
      id: 2,
      title: 'Laboratoire de Physique',
      instructor: 'Dr. Smith',
      instructorImage: 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=150',
      progress: 60,
      students: 28,
      nextClass: 'Demain à 11:00',
      status: 'active',
      materials: 8,
      assignments: 2,
      rating: 4.6,
      category: 'Sciences',
      difficulty: 'Intermédiaire',
      duration: '12 semaines',
      completedLessons: 7,
      totalLessons: 12,
      lastAccessed: '1 jour',
      certificate: true
    },
    {
      id: 3,
      title: 'Chimie Fondamentale',
      instructor: 'Prof. Wilson',
      instructorImage: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=150',
      progress: 85,
      students: 25,
      nextClass: 'Vendredi à 14:00',
      status: 'active',
      materials: 15,
      assignments: 1,
      rating: 4.9,
      category: 'Sciences',
      difficulty: 'Débutant',
      duration: '10 semaines',
      completedLessons: 9,
      totalLessons: 10,
      lastAccessed: '3 heures',
      certificate: true
    },
    {
      id: 4,
      title: 'Informatique de Base',
      instructor: 'Dr. Brown',
      instructorImage: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=150',
      progress: 45,
      students: 35,
      nextClass: 'Lundi à 10:00',
      status: 'active',
      materials: 20,
      assignments: 4,
      rating: 4.7,
      category: 'Technologie',
      difficulty: 'Débutant',
      duration: '14 semaines',
      completedLessons: 6,
      totalLessons: 14,
      lastAccessed: '5 heures',
      certificate: false
    }
  ];

  const availableCourses = [
    {
      id: 5,
      title: 'Statistiques Avancées',
      instructor: 'Prof. Davis',
      instructorImage: 'https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=150',
      duration: '12 semaines',
      students: 0,
      capacity: 30,
      startDate: '2024-02-15',
      fee: '150,000 FCFA',
      rating: 4.5,
      category: 'Mathématiques',
      difficulty: 'Avancé',
      description: 'Approfondissez vos connaissances en statistiques avec des applications pratiques.',
      prerequisites: ['Mathématiques de base', 'Probabilités'],
      featured: true
    },
    {
      id: 6,
      title: 'Chimie Organique',
      instructor: 'Dr. Lee',
      instructorImage: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=150',
      duration: '16 semaines',
      students: 15,
      capacity: 25,
      startDate: '2024-02-20',
      fee: '200,000 FCFA',
      rating: 4.8,
      category: 'Sciences',
      difficulty: 'Avancé',
      description: 'Explorez les mécanismes et réactions de la chimie organique moderne.',
      prerequisites: ['Chimie générale', 'Chimie fondamentale'],
      featured: false
    },
    {
      id: 7,
      title: 'Intelligence Artificielle',
      instructor: 'Prof. Martin',
      instructorImage: 'https://images.pexels.com/photos/2182974/pexels-photo-2182974.jpeg?auto=compress&cs=tinysrgb&w=150',
      duration: '20 semaines',
      students: 8,
      capacity: 20,
      startDate: '2024-03-01',
      fee: '300,000 FCFA',
      rating: 4.9,
      category: 'Technologie',
      difficulty: 'Expert',
      description: 'Introduction complète à l\'IA et au machine learning.',
      prerequisites: ['Programmation Python', 'Mathématiques avancées'],
      featured: true
    }
  ];

  const courseMaterials = [
    { 
      name: 'Cours 1: Introduction au Calcul', 
      type: 'video', 
      size: '45 min', 
      downloaded: false,
      course: 'Mathématiques Avancées',
      uploadDate: '2024-01-15',
      views: 234
    },
    { 
      name: 'Série d\'Exercices 1', 
      type: 'pdf', 
      size: '2.5 MB', 
      downloaded: true,
      course: 'Mathématiques Avancées',
      uploadDate: '2024-01-12',
      views: 189
    },
    { 
      name: 'Guide de Référence', 
      type: 'pdf', 
      size: '1.8 MB', 
      downloaded: false,
      course: 'Physique',
      uploadDate: '2024-01-10',
      views: 156
    },
    { 
      name: 'Exemples Pratiques', 
      type: 'video', 
      size: '30 min', 
      downloaded: false,
      course: 'Chimie',
      uploadDate: '2024-01-08',
      views: 203
    },
  ];

  const categories = ['all', 'Sciences', 'Mathématiques', 'Technologie', 'Langues'];

  const filteredEnrolledCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAvailableCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Show a loading state while redirecting
  return (
    <DashboardLayout role="student">

      <div className="space-y-8">

        {/* Search and Filter */}
        <Card className="border-0 shadow-professional">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher des cours, instructeurs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-black"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12 border-2">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100">
            <TabsTrigger value="enrolled" className="data-[state=active]:bg-white font-medium">
              Cours Inscrits ({enrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="available" className="data-[state=active]:bg-white font-medium">
              Cours Disponibles ({availableCourses.length})
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-white font-medium">
              Ressources ({courseMaterials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEnrolledCourses.map((course) => (
                <Card key={course.id} className="hover-lift border-0 shadow-professional bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={course.instructorImage} />
                          <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">{course.title}</CardTitle>
                          <p className="text-gray-600">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {course.status === 'active' ? 'Actif' : course.status}
                        </Badge>
                        {course.certificate && (
                          <Award className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <Badge variant="outline">{course.difficulty}</Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progression du cours</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{course.completedLessons}/{course.totalLessons} leçons</span>
                        <span>Dernière activité: {course.lastAccessed}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{course.students} étudiants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>{course.materials} ressources</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{course.nextClass}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span>{course.assignments} devoirs</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-black hover:bg-gray-800 text-white">
                        <Play className="mr-2 h-4 w-4" />
                        Continuer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAvailableCourses.map((course) => (
                <Card key={course.id} className={`hover-lift border-0 shadow-professional ${course.featured ? 'ring-2 ring-yellow-400' : ''}`}>
                  {course.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 text-sm font-medium">
                      ⭐ Cours Recommandé
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={course.instructorImage} />
                        <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">{course.title}</CardTitle>
                        <p className="text-gray-600 text-sm">{course.instructor}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <Badge variant="outline">{course.difficulty}</Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Inscriptions</span>
                        <span className="font-medium">{course.students}/{course.capacity} étudiants</span>
                      </div>
                      <Progress value={(course.students / course.capacity) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Durée:</span>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Début:</span>
                        <p className="font-medium">{course.startDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Frais:</span>
                        <p className="font-medium text-green-600">{course.fee}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Places:</span>
                        <p className="font-medium">{course.capacity - course.students} restantes</p>
                      </div>
                    </div>

                    {course.prerequisites && (
                      <div>
                        <span className="text-gray-500 text-sm">Prérequis:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.prerequisites.map((prereq, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-black hover:bg-gray-800 text-white">
                        S&apos;inscrire
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-8">
            <Card className="border-0 shadow-professional">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Ressources de Cours</CardTitle>
                <p className="text-gray-600">
                  Accédez à tous vos supports de cours en un seul endroit
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseMaterials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          material.type === 'video' ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          {material.type === 'video' ? (
                            <Video className="h-6 w-6 text-blue-600" />
                          ) : (
                            <FileText className="h-6 w-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{material.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{material.size}</span>
                            <span>•</span>
                            <span>{material.course}</span>
                            <span>•</span>
                            <span>{material.uploadDate}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {material.views}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {material.downloaded && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Téléchargé
                          </Badge>
                        )}
                        <Button size="sm" variant="outline" className="hover:bg-black hover:text-white">
                          <Download className="h-4 w-4 mr-2" />
                          {material.type === 'video' ? 'Regarder' : 'Télécharger'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger Toutes les Ressources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}