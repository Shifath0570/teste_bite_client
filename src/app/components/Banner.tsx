"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Chip, Input } from "@heroui/react";

export default function Banner() {
    return (
        <section className="relative min-h-[65vh] overflow-hidden">

            {/* Background Image */}
            <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
                alt="TasteBite Hero"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />


            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-7xl items-center px-6">

                <div className="max-w-3xl text-white">


                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .8 }}
                        className="mb-4 text-xl"
                    >
                        🍽️ Welcome to TasteBite
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .8 }}
                        className="text-5xl font-extrabold leading-tight md:text-7xl"
                    >
                        Discover.
                        <br />
                        Cook.
                        <br />
                        Share.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .2 }}
                        className="mt-6 max-w-xl text-lg text-gray-200"
                    >
                        Thousands of delicious recipes from home cooks and
                        professional chefs around the world. Explore, save,
                        and share your favorite meals.
                    </motion.p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                            href="/recipes"
                            className="rounded-full bg-green-600 px-8 py-3 font-semibold transition hover:bg-green-700"
                        >
                            Explore Recipes
                        </Link>

                        <Link
                            href="/recipes/add"
                            className="rounded-full border-2 border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black"
                        >
                            Share Recipe
                        </Link>

                    </div>

                </div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-white"
            >
                <p className="text-xs uppercase tracking-[4px]">
                    Scroll Down
                </p>

                <div className="mt-2 text-3xl">
                    ↓
                </div>
            </motion.div>

        </section>
    );
}