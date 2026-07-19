"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="relative overflow-hidden rounded-[32px]">

          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
            alt="Cooking"
            width={1600}
            height={700}
            className="h-[420px] w-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/65" />

          {/* Decorative Blur */}
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-6">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .6 }}
              viewport={{ once: true }}
              className="max-w-3xl text-center text-white"
            >

              <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
                🍽️ Join the TasteBite Community
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
                Ready to Share
                <br />
                Your Favorite Recipe?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
                Inspire thousands of food lovers by sharing your delicious
                recipes, cooking tips, and unique culinary creations.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap justify-center gap-5">

                <Link
                  href="/recipes/add"
                  className="px-8 font-semibold"
                >
                  🍳 Add Recipe
                </Link>

                <Link
                  href="/recipes"
                  className="border-white px-8 font-semibold text-white hover:bg-white hover:text-black"
                >
                  📖 Explore Recipes
                </Link>

              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}