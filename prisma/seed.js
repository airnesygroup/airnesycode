require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const path = require('path');

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug statement

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { slug: "general", title: "General", icon: "fa-solid fa-circle" },
        { slug: "business-finance", title: "Business & Finance", icon: "fa-solid fa-newspaper" },
        { slug: "technology", title: "Gaming", icon: "fa-solid fa-gamepad" },
        { slug: "science", title: "Artificial Intelligence", icon: "fa-solid fa-robot" },
        { slug: "economics", title: "Gaming", icon: "fa-solid fa-gamepad" },
        { slug: "engineering", title: "Entertainment", icon: "fa-solid fa-film" },
        { slug: "mathematics", title: "Digital Art & Design", icon: "fa-solid fa-paint-brush" }
      ]
    });
    console.log("Sample categories with icons added to the database.");
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
