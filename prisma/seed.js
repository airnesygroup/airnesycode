const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { slug: "general", title: "General", img: "/bg.png" },
        { slug: "business-finance", title: "Business & Finance", img: "/bg.png" },
        { slug: "technology", title: "Technology", img: "/bg.png" },
        { slug: "science", title: "Science", img: "/bg.png" },
        { slug: "economics", title: "Economics", img: "/bg.png" },
        { slug: "engineering", title: "Engineering", img: "/bg.png" },
        { slug: "mathematics", title: "Mathematics", img: "/bg.png" },
      ],
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
