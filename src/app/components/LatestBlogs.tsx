"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Healthy Breakfast Ideas",
    description:
      "Start your day with delicious and nutritious breakfast recipes packed with protein and fresh ingredients.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
    category: "Healthy",
    date: "July 15, 2026",
  },
  {
    id: 2,
    title: "Summer BBQ Guide",
    description:
      "Discover the best BBQ recipes, grilling techniques, and summer side dishes for your next outdoor party.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=80",
    category: "BBQ",
    date: "July 10, 2026",
  },
  {
    id: 3,
    title: "5 Easy Pasta Recipes",
    description:
      "Quick and delicious and flavorful pasta recipes that are perfect for busy weekdays and family dinners.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&q=80",
    category: "Italian",
    date: "July 05, 2026",
  },
];

export default function LatestBlogs() {
  return (
    <section className="py-20 bg-default-50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
            Latest Articles
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Latest Food Blogs
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-default-500">
            Explore cooking tips, healthy recipes, and food inspiration from
            our latest blog posts.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden rounded-3xl border shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-60 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Chip
                      color="success"
                      size="sm"
                    >
                      {blog.category}
                    </Chip>

                    <span className="text-sm text-default-500">
                      {blog.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">
                    {blog.title}
                  </h3>

                  <p className="mt-3 mb-5 text-default-500">
                    {blog.description}
                  </p>

                  <Link
                    href={`/blog/${blog.id}`}
                    color="warning"
                    className="mt-6"
                  >
                    Read More →
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}