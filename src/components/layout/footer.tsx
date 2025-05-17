"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconRocket, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin } from "@tabler/icons-react";

const socialLinks = [
	{
		name: "Github",
		href: "/#",
		icon: IconBrandGithub,
	},
	{
		name: "Twitter",
		href: "/#",
		icon: IconBrandTwitter,
	},
	{
		name: "LinkedIn",
		href: "/#",
		icon: IconBrandLinkedin,
	},
];

const footerVariants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
};

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<motion.footer
			initial="initial"
			whileInView="animate"
			viewport={{ once: true }}
			variants={footerVariants}
			className="relative border-t border-border/40 bg-background"
		>
			{/* Background decoration */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute bottom-0 left-0 h-32 w-32 bg-primary/5 blur-2xl" />
				<div className="absolute bottom-0 right-0 h-32 w-32 bg-primary/5 blur-2xl" />
			</div>

			<div className="container mx-auto relative">
				<div className="grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
					{/* Brand */}
					<motion.div variants={itemVariants} className="space-y-4">
						<Link href="/" className="flex items-center space-x-2">
							<IconRocket className="h-6 w-6 text-primary" stroke={1.5} />
							<span className="text-lg font-semibold">Sparc Launchpad</span>
						</Link>
						<p className="text-sm text-muted-foreground max-w-xs">
							Pioneering the future of space technology with innovative solutions and
							groundbreaking research.
						</p>
					</motion.div>

					{/* Quick Links */}
					<motion.div variants={itemVariants} className="space-y-4">
						<h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
						<div className="flex flex-col space-y-2">
							<Link
								href="/#overview"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								Overview
							</Link>
							<Link
								href="/#projects"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								Projects
							</Link>
							<Link
								href="/join"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								Careers
							</Link>
							<Link
								href="/#contact"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								Contact
							</Link>
						</div>
					</motion.div>

					{/* Connect */}
					<motion.div variants={itemVariants} className="space-y-4">
						<h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
						<div className="flex space-x-4">
							{socialLinks.map((social) => (
								<motion.a
									key={social.name}
									href={social.href}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className="text-muted-foreground hover:text-primary transition-colors"
									aria-label={social.name}
								>
									<social.icon className="h-5 w-5" stroke={1.5} />
								</motion.a>
							))}
						</div>
					</motion.div>
				</div>

				<motion.div
					variants={itemVariants}
					className="border-t border-border/40 px-4 py-6 md:px-8"
				>
					<p className="text-center text-sm text-muted-foreground">
						© {currentYear} Sparc Aerospace. All rights reserved.
					</p>
				</motion.div>
			</div>
		</motion.footer>
	);
}
