"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IconSend, IconCheck, IconUpload } from "@tabler/icons-react";

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function JoinForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    position: "",
    experience: "",
    resumeUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/.netlify/functions/job-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Application submitted!",
          description: "We'll review your application and get back to you soon.",
          duration: 5000,
        });
        setFormData({
          fullName: "",
          email: "",
          position: "",
          experience: "",
          resumeUrl: "",
        });
      } else {
        throw new Error(data.error || "Failed to submit application");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: { transition: { staggerChildren: 0.1 } },
      }}
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-6"
    >
      <motion.div variants={fadeInUpVariants}>
        <Input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className="h-12 bg-background/50 backdrop-blur"
        />
      </motion.div>

      <motion.div variants={fadeInUpVariants}>
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12 bg-background/50 backdrop-blur"
        />
      </motion.div>

      <motion.div variants={fadeInUpVariants}>
        <Input
          placeholder="Position of Interest"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
          className="h-12 bg-background/50 backdrop-blur"
        />
      </motion.div>

      <motion.div variants={fadeInUpVariants}>
        <Textarea
          placeholder="Tell us about your experience"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          className="min-h-[150px] bg-background/50 backdrop-blur"
        />
      </motion.div>

      <motion.div variants={fadeInUpVariants}>
        <label className="group relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-background/50 backdrop-blur transition-colors hover:border-primary/40">
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              setFormData({
                ...formData,
                resumeUrl: e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : "",
              })
            }
            accept=".pdf,.doc,.docx"
          />
          <IconUpload
            className="mb-2 h-8 w-8 text-primary/60 transition-colors group-hover:text-primary"
            stroke={1.5}
          />
          <span className="text-sm text-muted-foreground">
            {formData.resumeUrl
              ? formData.resumeUrl.split("/").pop()
              : "Upload your resume (PDF, DOC)"}
          </span>
        </label>
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
                Submitting...
              </>
            ) : (
              <>
                <IconSend className="mr-2 h-5 w-5" />
                Submit Application
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </motion.form>
  );
}
