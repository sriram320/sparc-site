"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Here you would check for authentication
    // For now, we'll use a simple password check
    const checkAuth = async () => {
      const adminPassword = localStorage.getItem('adminPassword');
      if (!adminPassword) {
        const password = prompt('Please enter the admin password:');
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          localStorage.setItem('adminPassword', password);
          setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      } else if (adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        setIsAuthenticated(true);
      } else {
        router.push('/');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
