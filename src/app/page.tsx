"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { CompanyOverview } from '@/components/sections/company-overview';
import { ProjectShowcase } from '@/components/sections/project-showcase';
import { JoinCtaSection } from '@/components/sections/join-cta-section';
import { ContactForm } from '@/components/sections/contact-form';

export default function SparcLaunchpadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CompanyOverview />
        <ProjectShowcase />
        <JoinCtaSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
