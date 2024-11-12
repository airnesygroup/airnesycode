const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { slug: "idea", title: "Ideas", icon: "/general.png" },
        { slug: "business", title: "Business ", icon: "/business-finance.png" },
        { slug: "technology", title: "Technology", icon: "/technology.png" },
        { slug: "science", title: "Science", icon: "/science.jpeg" },
        { slug: "economics", title: "Economics", icon: "/economics.jpeg" },
        { slug: "engineering", title: "Engineering", icon: "/engineering.png" },
        { slug: "mathematics", title: "Mathematics", icon: "/mathematics.png" },
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
