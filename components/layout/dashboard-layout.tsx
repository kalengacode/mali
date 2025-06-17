'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'teacher' | 'admin';
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    } else if (user && user.role !== role) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, isLoading, role, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  if (!user || user.role !== role) {
    return null;
  }

  return (
    // overflow-x-hidden empêche la sidebar de provoquer un scroll horizontal
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex overflow-x-hidden">
      <Sidebar role={role} />
      {/* min-w-0 permet au contenu principal de ne pas forcer le débordement */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}