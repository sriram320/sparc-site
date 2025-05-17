"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ScrollLink } from '@/components/layout/scroll-link';
import { motion } from "framer-motion";
import Link from "next/link";
import { IconRocket } from "@tabler/icons-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 -top-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-blue-400/30 to-emerald-400/30 blur-3xl" />
        <div className="absolute -right-1/2 -bottom-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-l from-indigo-400/30 to-rose-400/30 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
          >
            Pioneering the Future of
            <br />
            Space Technology
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80"
          >
            Join us in revolutionizing aerospace innovation. We combine cutting-edge AI
            with space technology to create solutions that push the boundaries of
            what's possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="#contact">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="outline" size="lg" className="group">
                Join Our Team
                <IconRocket 
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                  stroke={1.5} 
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
