"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

const navItems = [
	{ name: "Overview", href: "/#overview" },
	{ name: "Projects", href: "/#projects" },
	{ name: "Join Us", href: "/join" },
	{ name: "Contact", href: "/#contact" },
];

export function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<motion.header
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
		>
			<div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
				<Link
					href="/"
					className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Image
							src="/images/logo.png"
							alt="Sparc Launchpad Logo"
							width={40}
							height={40}
							className="h-10 w-auto"
						/>
					</motion.div>
					<span className="font-bold text-xl tracking-tight">
						Sparc Launchpad
					</span>
				</Link>

				<nav className="hidden md:flex items-center space-x-6">
					{navItems.map((item) => (
						<motion.div
							key={item.name}
							whileHover={{ y: -2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<Link
								href={item.href}
								className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
							>
								{item.name}
							</Link>
						</motion.div>
					))}
				</nav>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="md:hidden"
				>
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10"
						aria-label="Open Menu"
						onClick={() => setIsMobileMenuOpen(true)}
					>
						<Menu className="h-6 w-6" />
					</Button>
				</motion.div>
			</div>
			<MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
		</motion.header>
	);
}
