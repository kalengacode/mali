'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Home,
  ClipboardList,
  GraduationCap,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  description?: string;
  badge?: number;
  children?: MenuItem[];
}

interface MenuItems {
  [key: string]: MenuItem[];
}

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin';
}

const menuItems: MenuItems = {
  student: [
    { 
      icon: Home, 
      label: 'Tableau de bord', 
      href: '/student/dashboard',
      description: 'Vue d\'ensemble de votre activité'
    },
    { 
      icon: BookOpen, 
      label: 'Mes Cours', 
      href: '/student/courses',
      description: 'Accédez à tous vos cours'
    },
    { 
      icon: Calendar, 
      label: 'Emploi du temps', 
      href: '/student/schedule',
      description: 'Consultez votre planning'
    },
    { 
      icon: ClipboardList, 
      label: 'Examens', 
      href: '/student/exams',
      description: 'Calendrier et résultats d\'examens'
    },
    { 
      icon: CreditCard, 
      label: 'Paiements', 
      href: '/student/payments',
      description: 'Gérez vos paiements et factures'
    },
    { 
      icon: FileText, 
      label: 'Documents', 
      href: '/student/documents',
      description: 'Tous vos documents académiques'
    },
    { 
      icon: MessageSquare, 
      label: 'Messagerie', 
      href: '/student/messages',
      description: 'Communiquez avec vos professeurs',
      badge: 3
    },
    { 
      icon: Settings, 
      label: 'Paramètres', 
      href: '/student/settings',
      description: 'Personnalisez votre compte'
    },
  ],
  teacher: [
    { icon: Home, label: 'Dashboard', href: '/teacher/dashboard' },
    { icon: BookOpen, label: 'My Courses', href: '/teacher/courses' },
    { icon: Calendar, label: 'Schedule', href: '/teacher/schedule' },
    { icon: Users, label: 'Students', href: '/teacher/students' },
    { icon: ClipboardList, label: 'Exams', href: '/teacher/exams' },
    { icon: BarChart3, label: 'Grades', href: '/teacher/grades' },
    { icon: MessageSquare, label: 'Messages', href: '/teacher/messages' },
    { icon: Settings, label: 'Settings', href: '/teacher/settings' },
  ],
  admin: [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
    { icon: Calendar, label: 'Schedules', href: '/admin/schedules' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    { icon: ClipboardList, label: 'Exams', href: '/admin/exams' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: FileText, label: 'Documents', href: '/admin/documents' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ],
};

export function Sidebar({ role }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const items = menuItems[role] || [];

  const SidebarContent: React.FC = () => (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50/80 via-white/60 to-blue-100/80 dark:from-slate-900/80 dark:via-slate-900/50 dark:to-blue-900/60 rounded-xl shadow-2xl backdrop-blur-md border border-blue-100/40 dark:border-blue-900/40">
      {/* Logo et titre uniquement */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-100/60 dark:border-blue-900/60">
        <GraduationCap className="h-8 w-8 text-blue-700 dark:text-blue-300" />
        <div>
          <h2 className="text-xl font-bold text-blue-900 dark:text-white tracking-tight">AcadLink</h2>
          <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
            Plateforme {role === 'student' ? 'Étudiant' : role === 'teacher' ? 'Enseignant' : 'Administrateur'}
          </Badge>
        </div>
      </div>
      <ScrollArea className="flex-1 px-2 pt-2 pb-20">
        {/* Section Navigation principale */}
        <div className="mb-4">
          <div className="px-4 py-1 text-xs font-bold uppercase text-blue-600 dark:text-blue-300 tracking-widest mb-2">Navigation</div>
          <nav className="space-y-1">
            {items.slice(0, 6).map((item) => {
              const isActive = pathname === item.href || 
                           (item.href !== '/student/dashboard' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="block group"
                >
                  <div
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-md",
                      isActive 
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 font-bold dark:from-blue-900/60 dark:to-blue-800/50 dark:text-blue-100 ring-2 ring-blue-300"
                        : "text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900/30"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={cn(
                      "p-2 rounded-lg mr-3 transition-all duration-200",
                      isActive 
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-800/80 dark:text-blue-200 animate-bounce"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                    )}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold break-words whitespace-normal">{item.label}</span>
                        {item.badge && (
                          <span className="ml-2 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 break-words whitespace-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Section Outils */}
        <div className="mb-4">
          <div className="px-4 py-1 text-xs font-bold uppercase text-blue-600 dark:text-blue-300 tracking-widest mb-2">Outils</div>
          <nav className="space-y-1">
            {items.slice(6).map((item) => {
              const isActive = pathname === item.href || 
                           (item.href !== '/student/dashboard' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="block group"
                >
                  <div
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-md",
                      isActive 
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 font-bold dark:from-blue-900/60 dark:to-blue-800/50 dark:text-blue-100 ring-2 ring-blue-300"
                        : "text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900/30"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={cn(
                      "p-2 rounded-lg mr-3 transition-all duration-200",
                      isActive 
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-800/80 dark:text-blue-200 animate-bounce"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                    )}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold break-words whitespace-normal">{item.label}</span>
                        {item.badge && (
                          <span className="ml-2 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 break-words whitespace-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
      {/* Bouton Déconnexion en bas */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center py-4 bg-gradient-to-t from-blue-100/70 via-white/80 to-transparent dark:from-blue-900/60 dark:via-slate-900/80 dark:to-transparent rounded-b-xl shadow-inner">
        <Button variant="destructive" className="w-11/12 max-w-xs font-bold py-2 text-base rounded-lg shadow-lg hover:scale-[1.03] transition-transform">
          <span className="mr-2">Déconnexion</span>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-xl h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      {/* Desktop sidebar - overflow-y-auto/min-h-0/max-w-full pour éviter tout débordement */}
      <div className="hidden md:flex w-64 max-w-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 overflow-y-auto min-h-0">
        <SidebarContent />
      </div>

      {/* Mobile sidebar - overflow-y-auto/min-h-0 pour éviter tout débordement */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 overflow-y-auto min-h-0">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}