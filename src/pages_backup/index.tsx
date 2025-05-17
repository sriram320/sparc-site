import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { CompanyOverview } from '@/components/sections/company-overview';
import { ProjectShowcase } from '@/components/sections/project-showcase';
import { JoinCtaSection } from '@/components/sections/join-cta-section';
import { ContactForm } from '@/components/sections/contact-form';
import { type NextPage } from 'next';
import Head from 'next/head';
import { siteMetadata } from '@/lib/metadata';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
      </Head>
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
    </>
  );
};

export default HomePage;
