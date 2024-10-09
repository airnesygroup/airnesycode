const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { slug: "general", title: "General", icon: "/bg.png" },
        { slug: "business-finance", title: "Business & Finance", icon: "/bg.png" },
        { slug: "technology", title: "Technology", icon: "/bg.png" },
        { slug: "science", title: "Science", icon: "/bg.png" },
        { slug: "economics", title: "Economics", icon: "/bg.png" },
        { slug: "engineering", title: "Engineering", icon: "/bg.png" },
        { slug: "mathematics", title: "Mathematics", icon: "/bg.png" },
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
