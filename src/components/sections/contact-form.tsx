"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IconSend, IconCheck } from "@tabler/icons-react";

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you soon.",
          duration: 5000,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-muted/50 py-16 md:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeInUpVariants} className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h2>
          <p className="text-foreground/80">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.form
          variants={fadeInUpVariants}
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-lg space-y-6"
        >
          <motion.div variants={fadeInUpVariants}>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 bg-background/50 backdrop-blur"
            />
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 bg-background/50 backdrop-blur"
            />
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <Textarea
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[150px] bg-background/50 backdrop-blur"
            />
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="relative h-12 w-full overflow-hidden bg-primary"
              disabled={isSubmitting}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                initial={{ x: "-100%" }}
                animate={{ x: isSubmitting ? "0%" : "-100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <IconCheck className="mr-2 h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  <>
                    <IconSend className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </span>
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
