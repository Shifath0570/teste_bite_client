import Link from "next/link";
import { Card } from "@heroui/react";

export default function AboutPage() {
  return (
    <main>

      {/* Hero */}

      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <h1 className="text-5xl font-extrabold md:text-6xl">
            About TasteBite
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-orange-100">
            TasteBite is a recipe-sharing platform where food lovers,
            home cooks, and professional chefs discover, create,
            and share delicious recipes from around the world.
          </p>

        </div>
      </section>

      {/* Our Story */}

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

          <div>
            <h2 className="text-4xl font-bold">
              Our Story
            </h2>

            <p className="mt-6 leading-8 text-default-600">
              TasteBite was created to make cooking more enjoyable and
              accessible. Whether you are preparing your first meal or
              experimenting with advanced recipes, our platform helps you
              discover inspiration from a global community of food lovers.
            </p>

            <p className="mt-4 leading-8 text-default-600">
              We believe that every recipe has a story. Our goal is to bring
              people together by sharing authentic dishes, cooking tips,
              and culinary experiences.
            </p>
          </div>

          <Card className="flex items-center justify-center rounded-3xl p-10">
            <div className="text-center">

              <div className="text-7xl">
                🍽️
              </div>

              <h3 className="mt-6 text-3xl font-bold">
                Cook • Share • Inspire
              </h3>

              <p className="mt-4 text-default-500">
                Connecting food lovers around the world through amazing recipes.
              </p>

            </div>
          </Card>

        </div>
      </section>

      {/* Mission & Vision */}

      <section className="bg-default-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">

          <Card className="rounded-3xl p-8">
            <h3 className="text-3xl font-bold">
              🎯 Our Mission
            </h3>

            <p className="mt-5 leading-8 text-default-600">
              To inspire people to cook confidently by providing easy-to-follow,
              high-quality recipes and creating a welcoming community for
              sharing culinary knowledge.
            </p>
          </Card>

          <Card className="rounded-3xl p-8">
            <h3 className="text-3xl font-bold">
              🌍 Our Vision
            </h3>

            <p className="mt-5 leading-8 text-default-600">
              To become one of the world most trusted recipe-sharing
              platforms where everyone can discover, learn, and celebrate food.
            </p>
          </Card>

        </div>
      </section>

      {/* Why Choose */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-12 text-center text-4xl font-bold">
            Why Choose TasteBite?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "👨‍🍳 Professional Recipes",
              "❤️ Community Favorites",
              "🥗 Healthy Meal Ideas",
              "📱 Mobile Friendly",
            ].map((item) => (
              <Card
                key={item}
                className="rounded-3xl p-8 text-center transition hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold">
                  {item}
                </h3>
              </Card>
            ))}

          </div>

        </div>
      </section>

      {/* Statistics */}

      <section className="bg-success py-20 text-white">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 text-center md:grid-cols-4">

          <div>
            <h2 className="text-5xl font-bold">
              20K+
            </h2>
            <p className="mt-2">
              Recipes
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              150K+
            </h2>
            <p className="mt-2">
              Community Members
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              5K+
            </h2>
            <p className="mt-2">
              Professional Chefs
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              500K+
            </h2>
            <p className="mt-2">
              Monthly Visitors
            </p>
          </div>

        </div>

      </section>

      {/* Core Values */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-12 text-center text-4xl font-bold">
            Our Core Values
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <Card className="rounded-3xl p-8">
              <div className="text-5xl">🤝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Community
              </h3>

              <p className="mt-3 text-default-500">
                We connect people through a shared love of cooking and food.
              </p>
            </Card>

            <Card className="rounded-3xl p-8">
              <div className="text-5xl">💡</div>

              <h3 className="mt-5 text-2xl font-bold">
                Creativity
              </h3>

              <p className="mt-3 text-default-500">
                Encourage everyone to experiment and create unique recipes.
              </p>
            </Card>

            <Card className="rounded-3xl p-8">
              <div className="text-5xl">🌱</div>

              <h3 className="mt-5 text-2xl font-bold">
                Quality
              </h3>

              <p className="mt-3 text-default-500">
                Deliver trusted recipes with clear instructions and quality content.
              </p>
            </Card>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="bg-orange-500 py-20 text-center text-white">

        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-bold">
            Join the TasteBite Community
          </h2>

          <p className="mt-6 text-lg">
            Start exploring delicious recipes or share your own favorite dishes
            with thousands of food lovers today.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/recipes"
            >
              Explore Recipes
            </Link>

            <Link
              href="/recipes/add"
              className="border-white text-white"
            >
              Add Recipe
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}