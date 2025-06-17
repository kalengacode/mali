'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, GraduationCap } from 'lucide-react';

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Liens de navigation
  const links = [
    { href: '/', label: 'Accueil' },
    { 
      href: '/student/dashboard', 
      label: 'Étudiant',
      roles: ['student', 'admin'] // Seuls les étudiants et admins peuvent voir ce lien
    },
    { 
      href: '/teacher/dashboard', 
      label: 'Enseignant',
      roles: ['teacher', 'admin'] // Seuls les enseignants et admins peuvent voir ce lien
    },
    { 
      href: '/admin/dashboard', 
      label: 'Admin',
      roles: ['admin'] // Uniquement pour les admins
    },
  ];
  
  // Récupérer le rôle de l'utilisateur depuis le localStorage
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">AcadLink</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links
              .filter(link => !link.roles || link.roles.includes(userRole || ''))
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname.startsWith(link.href.replace('/dashboard', '')) 
                      ? 'text-foreground font-medium' 
                      : 'text-foreground/60',
                    'px-3 py-2 rounded-md text-sm font-medium'
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold inline-block">AcadLink</span>
            </Link>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {links
                .filter(link => !link.roles || link.roles.includes(userRole || ''))
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex w-full items-center rounded-md p-3 text-sm font-medium',
                      pathname.startsWith(link.href.replace('/dashboard', ''))
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground/70 hover:bg-accent/50',
                      'transition-colors duration-200'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
