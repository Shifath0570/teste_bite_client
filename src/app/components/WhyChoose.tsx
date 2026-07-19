"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";

const features = [
    {
        emoji: "👨‍🍳",
        title: "Professional Recipes",
        description:
            "Discover carefully crafted recipes from experienced chefs and passionate home cooks.",
    },
    {
        emoji: "❤️",
        title: "Community Favorites",
        description:
            "Browse the highest-rated recipes loved and recommended by our growing community.",
    },
    {
        emoji: "⚡",
        title: "Easy Step-by-Step",
        description:
            "Follow simple cooking instructions that make every recipe easy to prepare.",
    },
    {
        emoji: "🥗",
        title: "Healthy Choices",
        description:
            "Find nutritious meals with balanced ingredients for every lifestyle.",
    },
    {
        emoji: "📱",
        title: "Mobile Friendly",
        description:
            "Enjoy a seamless cooking experience on mobile, tablet, and desktop devices.",
    },
    {
        emoji: "⭐",
        title: "Top Rated Recipes",
        description:
            "Explore trending recipes with excellent ratings from thousands of food lovers.",
    },
];

export default function WhyChoose() {
    return (
        <section className="bg-default-50 py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Section Heading */}

                <div className="mx-auto mb-14 max-w-3xl text-center">

                    <span className="rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
                        Why Choose TasteBite
                    </span>

                    <h2 className="mt-5 text-4xl font-bold text-foreground md:text-5xl">
                        Cook Smarter with TasteBite
                    </h2>

                    <p className="mt-4 text-lg text-default-500">
                        Discover delicious recipes, connect with food lovers,
                        and make every meal memorable with our modern recipe platform.
                    </p>

                </div>

                {/* Feature Cards */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                        >
                            <Card
                                className="rounded-2xl border p-8 shadow-sm transition hover:-translate-y-2"
                            >
                                <div className="text-center">
                                    <div className="mb-4 text-5xl">{feature.emoji}</div>

                                    <h3 className="text-2xl font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-default-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}