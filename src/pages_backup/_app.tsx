import { type AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </main>
  );
}
