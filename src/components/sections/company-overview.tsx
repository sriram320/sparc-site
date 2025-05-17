"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Users, Zap } from 'lucide-react';
import { IconRocket, IconBrain, IconSatellite } from "@tabler/icons-react";

const overviewItems = [
	{
		icon: Target,
		title: 'Our Mission',
		description: 'To accelerate aerospace innovation through cutting-edge research, development, and collaboration, making space more accessible and sustainable for future generations.',
	},
	{
		icon: Eye,
		title: 'Our Vision',
		description: 'To be a global leader in aerospace technology, pioneering solutions that push the boundaries of exploration and improve life on Earth through space-derived insights.',
	},
	{
		icon: Zap,
		title: 'Core Values',
		description: 'Innovation, Excellence, Integrity, Collaboration, and Sustainability. These principles guide every decision we make and every project we undertake.',
	},
	{
		icon: Users,
		title: 'Our Team',
		description: 'Comprised of visionary engineers, scientists, and strategists, our team is united by a passion for space and a commitment to achieving the extraordinary.',
	},
];

const features = [
	{
		icon: IconRocket,
		title: "Space Innovation",
		description:
			"Pushing the boundaries of aerospace technology with cutting-edge solutions.",
	},
	{
		icon: IconBrain,
		title: "AI Integration",
		description:
			"Leveraging artificial intelligence to revolutionize space exploration.",
	},
	{
		icon: IconSatellite,
		title: "Global Impact",
		description:
			"Creating solutions that benefit both space exploration and life on Earth.",
	},
];

const fadeInUpVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
};

export function CompanyOverview() {
	return (
		<section id="overview" className="relative overflow-hidden py-16 md:py-24 bg-secondary/50">
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
						className="mb-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
					>
						About Sparc Aerospace
					</motion.h2>
					<motion.p
						variants={fadeInUpVariants}
						className="mx-auto mb-16 max-w-2xl text-lg text-foreground/80"
					>
						Fueling the next era of space exploration and technological advancement.
					</motion.p>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
						{overviewItems.map((item, index) => (
							<Card
								key={item.title}
								className="flex flex-col group bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fadeInUp"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardHeader className="flex flex-row items-center space-x-4 pb-4">
									<div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
										<item.icon className="h-7 w-7" />
									</div>
									<CardTitle className="text-xl font-semibold text-foreground">{item.title}</CardTitle>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-muted-foreground leading-relaxed">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="mt-16">
						<motion.h3
							variants={fadeInUpVariants}
							className="mb-4 text-2xl font-bold text-primary"
						>
							Revolutionizing Space Technology
						</motion.h3>
						<motion.p
							variants={fadeInUpVariants}
							className="mx-auto mb-8 max-w-2xl text-lg text-foreground/80"
						>
							Through innovative solutions and cutting-edge technology, we're making
							space more accessible and sustainable for future generations.
						</motion.p>

						<div className="grid gap-8 md:grid-cols-3">
							{features.map((feature, index) => (
								<motion.div
									key={feature.title}
									variants={fadeInUpVariants}
									transition={{ delay: index * 0.2 }}
									whileHover={{ y: -5 }}
									className="group relative rounded-2xl bg-background p-6 shadow-lg transition-shadow hover:shadow-xl"
								>
									<div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
									<feature.icon
										className="mx-auto mb-4 h-12 w-12 text-primary"
										stroke={1.5}
									/>
									<h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
									<p className="text-foreground/80">{feature.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
