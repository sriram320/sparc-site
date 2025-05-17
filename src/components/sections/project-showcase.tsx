"use client";

import Image from 'next/image';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { IconArrowUpRight } from "@tabler/icons-react";

const projects = [
  {
    id: 1,
    title: 'Project Nova: Reusable Rocket Engine',
    description: 'Developing a next-generation reusable rocket engine for sustainable space exploration and reduced launch costs.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'rocket engine launch',
    tags: ['Propulsion', 'Reusability', 'Sustainability'],
  },
  {
    id: 2,
    title: 'Orion Satellite Constellation',
    description: 'A network of advanced LEO satellites providing global high-speed internet coverage and Earth observation data.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'satellite network space',
    tags: ['Satellites', 'Communication', 'Earth Observation'],
  },
  {
    id: 3,
    title: 'Lunar Gateway Habitation Module',
    description: 'Contributing to the Artemis program by designing and building a key habitation module for the Lunar Gateway space station.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'space station module moon',
    tags: ['Space Stations', 'Lunar Exploration', 'Habitation'],
  },
  {
    id: 4,
    title: 'AI-Powered Mission Control',
    description: 'Implementing advanced AI algorithms for autonomous mission control, enhancing safety and efficiency of space operations.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mission control AI',
    tags: ['Artificial Intelligence', 'Mission Control', 'Autonomy'],
  },
];

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function ProjectShowcase() {
  return (
    <section id="projects" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Our Innovations
          </motion.h2>
          <motion.p
            variants={fadeInUpVariants}
            className="mx-auto mb-16 max-w-2xl text-lg text-foreground/80"
          >
            A glimpse into the pioneering projects driving Sparc Aerospace forward.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary/5 to-primary/10"
              >
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 flex items-center text-xl font-semibold">
                    {project.title}
                    <IconArrowUpRight
                      className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      stroke={1.5}
                    />
                  </h3>
                  <p className="text-foreground/80">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
