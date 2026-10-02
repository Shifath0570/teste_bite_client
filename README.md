# 🍽️ TasteBite

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  <strong>Discover • Cook • Share</strong>
</p>

<p align="center">
  A modern recipe-sharing platform for food lovers, home cooks, and professional chefs.
</p>

---

## 🌐 Live Demo

### TasteBite

🔗 https://teste-bite.vercel.app/

---

# 📖 About The Project

**TasteBite** is a modern recipe-sharing platform designed to bring food lovers, home cooks, and professional chefs together in one community.

The platform allows users to discover recipes, explore cooking inspiration, learn cooking tips, and share their own recipes with the community.

The core idea behind TasteBite is:

```text
        🍽️
        TasteBite
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
 Discover  Cook  Share
```

The live website describes TasteBite as a platform where users can discover thousands of recipes, save and share their favorite meals, and connect with food lovers around the world.

---

# 🎯 Project Objectives

The main objectives of TasteBite are:

* 🍳 Make recipes easy to discover
* 👨‍🍳 Connect home cooks and professional chefs
* 📚 Provide easy-to-follow cooking instructions
* 🥗 Promote healthy meal ideas
* ❤️ Build a food-loving community
* ✍️ Allow users to share their own recipes
* 📱 Provide a responsive cooking experience
* 📊 Provide useful recipe and community analytics

---

# ✨ Features

## 🍳 1. Recipe Discovery

Users can explore a collection of recipes and discover new meal ideas.

The platform focuses on:

* Delicious recipes
* Professional recipes
* Community favorites
* Healthy meals
* Trending recipes
* Step-by-step cooking instructions

The live homepage highlights recipe discovery as one of the core features of TasteBite.

---

# 👨‍🍳 2. Professional Recipes

TasteBite provides recipes from experienced chefs and passionate home cooks.

Users can explore different cooking styles and discover new culinary ideas.

The platform specifically highlights **Professional Recipes** as one of its main benefits.

---

# ❤️ 3. Community Favorites

TasteBite includes community-focused recipe discovery.

Users can explore highly-rated recipes that are popular among other food lovers.

This helps users discover recipes based on community interest and ratings.

---

# ⚡ 4. Step-by-Step Recipes

Recipes are designed around clear cooking instructions.

The goal is to make recipes accessible to both beginners and experienced cooks.

```text
Recipe
  ↓
Ingredients
  ↓
Preparation
  ↓
Cooking Steps
  ↓
Finished Meal 🍽️
```

TasteBite specifically highlights easy step-by-step cooking as a core feature.

---

# 🥗 5. Healthy Meal Ideas

TasteBite includes healthy recipe content and nutrition-focused inspiration.

Users can discover meals designed around balanced ingredients and different lifestyles.

---

# 📱 6. Responsive Design

The platform is designed to work across:

* 📱 Mobile
* 📲 Tablet
* 💻 Laptop
* 🖥️ Desktop

The live site explicitly highlights its mobile-friendly cooking experience.

---

# ✍️ 7. Share Your Recipe

TasteBite allows users to contribute their own recipes.

The homepage includes an **Add Recipe** call-to-action, and the contact page explains that users can sign in and select **Add Recipe** from their dashboard to submit a recipe.

### Recipe sharing flow

```text
Create Account
      ↓
   Sign In
      ↓
  Add Recipe
      ↓
Enter Recipe Information
      ↓
     Save
      ↓
Community Recipe
```

---

# 📰 8. Food Blogs

TasteBite includes a food-blog section with cooking tips, healthy recipe ideas, and food inspiration.

Current examples on the live site include:

* **Healthy Breakfast Ideas**
* **Summer BBQ Guide**
* **5 Easy Pasta Recipes**

The live homepage displays these articles with categories and publication dates.

---

# ⭐ 9. Testimonials

The platform includes a community testimonial section featuring feedback from different types of food enthusiasts.

Example user profiles include:

* Home Chef
* Food Blogger
* Nutrition Coach
* Professional Chef

This reinforces TasteBite's community-oriented purpose.

---

# 📊 10. Community Statistics

The About page presents the platform's community metrics as:

| Metric             | Displayed Value |
| ------------------ | --------------: |
| Recipes            |            20K+ |
| Community Members  |           150K+ |
| Professional Chefs |             5K+ |
| Monthly Visitors   |           500K+ |

These figures are presented as website content rather than independently verified statistics.

---

# 📬 11. Contact & Support

TasteBite includes a dedicated contact page where users can send messages for questions, suggestions, and feedback.

The page includes:

* Name
* Email
* Message subject
* Message
* Contact information
* Working hours
* FAQ section

The displayed contact location is **Chattogram, Bangladesh**, with support email and phone information.

---

# ❓ 12. Frequently Asked Questions

The contact page provides answers to common questions such as:

### How can I submit a recipe?

Users can sign in and select **Add Recipe** from their dashboard.

### Is TasteBite free?

The website states that users can explore recipes and create an account for free.

### How do I contact support?

Users can contact support through the contact form or the displayed support email.

---

# 🏠 Main Pages

```text
TasteBite
│
├── 🏠 Home
│
├── 🍳 Recipes
│
├── 📰 Food Blogs
│
├── ℹ️ About
│
├── 📞 Contact
│
├── 🔐 Authentication
│
└── 👤 User Dashboard
    │
    └── ✍️ Add Recipe
```

> The live site's Categories footer link currently returns 404, so it should be fixed before documenting it as an active page.

---

# 🔄 User Flow

```text
                     ┌──────────────┐
                     │     Home     │
                     └──────┬───────┘
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
        ┌──────────────┐          ┌──────────────┐
        │   Recipes    │          │  Food Blogs  │
        └──────┬───────┘          └──────────────┘
               │
               ▼
        ┌──────────────┐
        │ Recipe View  │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │     Cook     │
        └──────────────┘


             Recipe Sharing Flow

        ┌──────────────┐
        │    Sign In   │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  Add Recipe  │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │ Submit Recipe│
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  Community   │
        └──────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* **Next.js**
* **React.js**
* **TypeScript**
* **Tailwind CSS**
* **HeroUI v3**
* **Gravity UI Icons**
* **Recharts**

## Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **REST API**

## Database

* **MongoDB**
* **Mongoose**

## Deployment

* **Vercel**

---

# 📊 Data Visualization

TasteBite uses **Recharts** for presenting data visually in dashboard and analytics interfaces.

Potential analytics include:

* Recipe statistics
* Community activity
* Recipe performance
* User engagement
* Category distribution

---

# 🧩 UI Component System

The frontend uses **HeroUI v3** to create reusable interface components.

The project also uses **Gravity UI Icons** for consistent iconography throughout the application.

This helps maintain:

* Consistent UI
* Reusable components
* Responsive layouts
* Accessible interactions
* Clean visual hierarchy

---

# 📂 Project Structure

A representative structure for the project:

```text
TasteBite/
│
├── client/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── recipes/
│   │   ├── about/
│   │   ├── contact/
│   │   └── dashboard/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── RecipeCard/
│   │   ├── RecipeDetails/
│   │   ├── BlogCard/
│   │   └── Dashboard/
│   │
│   ├── public/
│   │   └── images/
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   │
│   └── package.json
│
├── .env
├── README.md
└── package.json
```

> Update the structure above to exactly match your GitHub repository.

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/your-username/tastebite.git
```

## 2. Navigate to the project

```bash
cd tastebite
```

## 3. Install dependencies

```bash
npm install
```

If frontend and backend are separated:

```bash
cd client
npm install

cd ../server
npm install
```

---

# 🔐 Environment Variables

Create the required `.env` or `.env.local` files.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_API_URL=your_api_url

JWT_SECRET=your_secret_key
```

Add any additional environment variables required by your implementation.

---

# 🚀 Run Locally

Start the development server:

```bash
npm run dev
```

For a separated backend:

```bash
cd server
npm run dev
```

Then start the frontend:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🌐 Deployment

The live TasteBite application is deployed through **Vercel**.

### Live Website

https://teste-bite.vercel.app/

---

# 🎨 UI/UX Highlights

TasteBite focuses on a modern, friendly cooking experience.

### Design principles

* 🍽️ Food-focused visual design
* ✨ Modern interface
* 📱 Responsive layout
* 🧭 Simple navigation
* 🃏 Recipe card presentation
* 📖 Clear recipe information
* 👨‍🍳 Community-focused content
* 📰 Blog/article presentation
* 📊 Data visualization
* 📬 Accessible contact/support

---

# 🧠 Key Learning Outcomes

Building TasteBite helped strengthen my practical experience with:

* TypeScript
* Next.js
* Tailwind CSS
* HeroUI v3
* Gravity UI
* Recharts
* Express.js
* MongoDB
* REST API development
* Full-stack application architecture
* CRUD operations
* Recipe management
* Dashboard development
* Data visualization
* Responsive UI/UX
* Component-based development
* Vercel deployment
* GitHub

---

# 🔮 Future Improvements

Possible future improvements include:

* 🔎 Advanced recipe search
* 🏷️ Working recipe categories
* 🥗 Dietary filters
* 🌶️ Ingredient-based search
* ⏱️ Cooking-time filters
* ❤️ Favorite recipes
* 📚 Personal recipe collection
* ⭐ Recipe ratings
* 💬 Recipe comments
* 👨‍🍳 Chef profiles
* 👥 Follow other cooks
* 🔔 Notifications
* 📊 Advanced analytics dashboard
* 🤖 AI recipe recommendations
* 🤖 AI meal planner
* 🧾 Automatic shopping-list generation
* 📱 Progressive Web App support

---

# 📸 Screenshots

Create a `screenshots` folder and add screenshots of the project.

### 🏠 Homepage

```md
![TasteBite Homepage](./screenshots/homepage.png)
```

### 🍳 Recipe Collection

```md
![TasteBite Recipes](./screenshots/recipes.png)
```

### 📖 Recipe Details

```md
![TasteBite Recipe Details](./screenshots/recipe-details.png)
```

### ✍️ Add Recipe

```md
![TasteBite Add Recipe](./screenshots/add-recipe.png)
```

### 📊 Dashboard

```md
![TasteBite Dashboard](./screenshots/dashboard.png)
```

### 📰 Food Blog

```md
![TasteBite Food Blog](./screenshots/food-blog.png)
```

---

# 👨‍💻 Developer

## Kazi Mohammad Shariful Amin Shifath

**Software Engineer | Full Stack Developer**

TasteBite was developed as a full-stack recipe-sharing platform to demonstrate practical experience in modern web development, TypeScript, responsive UI/UX, REST APIs, MongoDB, dashboard development, and data visualization.

### Technical Skills

```text
TypeScript
Next.js
Node.js
Express.js
MongoDB
Tailwind CSS
HeroUI
Gravity UI
Recharts
REST API
GitHub
Vercel
```

---

# 🌐 Connect With Me

### GitHub

https://github.com/Shifath0570

### LinkedIn

Add your LinkedIn profile here.

---

# 📄 License

This project was developed for **educational and portfolio purposes**.

---

<p align="center">
  🍽️ <strong>TasteBite</strong> — Discover • Cook • Share
</p>

<p align="center">
  Made with ❤️ by <strong>Kazi Mohammad Shariful Amin Shifath</strong>
</p>
