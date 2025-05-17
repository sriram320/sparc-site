"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JoinForm } from '@/components/sections/join-form';
import { Briefcase } from 'lucide-react';

export default function JoinPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Join Our Team
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Become a part of Sparc Launchpad and help us redefine the future of aerospace.
              We're looking for innovators, dreamers, and doers.
            </p>
          </div>
          <JoinForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
