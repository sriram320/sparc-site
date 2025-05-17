"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconRocket, IconArrowRight } from "@tabler/icons-react";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function JoinCtaSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="container relative mx-auto px-4 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <IconRocket className="h-10 w-10 text-primary" stroke={1.5} />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mb-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
        >
          Ready to Shape the Future of Aerospace?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80"
        >
          Join our team of innovators, dreamers, and doers. Together, we'll push
          the boundaries of what's possible in space technology.
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/join">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary px-8 py-6 text-lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center">
                View Openings & Join Our Team
                <IconArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
