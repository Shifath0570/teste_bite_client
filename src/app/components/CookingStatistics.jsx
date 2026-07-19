"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";

const statistics = [
  {
    number: 20,
    suffix: "K+",
    emoji: "🍽️",
    title: "Recipes",
    color: "from-orange-500 to-red-500",
  },
  {
    number: 150,
    suffix: "K+",
    emoji: "❤️",
    title: "Community Members",
    color: "from-pink-500 to-rose-500",
  },
  {
    number: 5,
    suffix: "K+",
    emoji: "👨‍🍳",
    title: "Professional Chefs",
    color: "from-green-500 to-emerald-500",
  },
  {
    number: 500,
    suffix: "K+",
    emoji: "🌍",
    title: "Monthly Visitors",
    color: "from-blue-500 to-cyan-500",
  },
];

export default function CookingStatistics() {
  return (
    <section className="bg-default-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
            Our Community
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            TasteBite in Numbers
          </h2>

          <p className="mt-4 text-default-500">
            Join thousands of food lovers who discover, cook,
            and share amazing recipes every day.
          </p>
        </motion.div>

        {/* Statistics Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {statistics.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-3xl border p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-4xl`}
                >
                  {item.emoji}
                </div>

                <h3 className="mt-6 text-5xl font-extrabold">

                  <CountUp
                    end={item.number}
                    duration={3}
                    enableScrollSpy
                    scrollSpyOnce
                  />

                  {item.suffix}

                </h3>

                <p className="mt-4 text-lg font-semibold text-default-600">
                  {item.title}
                </p>

              </Card>
            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}