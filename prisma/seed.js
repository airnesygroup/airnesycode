require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const path = require('path');

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug statement

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
        data: [
          { slug: "news", title: "News", img: "/news.png" },
          { slug: "politics", title: "Politics", img: "/politics.png" },
          { slug: "business", title: "Business  ", img: "/business.png" },
          { slug: "technology", title: "Technology", img: "/technology.png" },
          { slug: "health", title: "Health ", img: "/health.png" },
          { slug: "fitness", title: "Fitness ", img: "/health.png" },
          { slug: "science", title: "Science", img: "/science.png" },
          { slug: "entertainment", title: "entertainment ", img: "/entertainment.png" },
          { slug: "music", title: "Music", img: "/entertainment.png" },
          { slug: "movies", title: "Movies" , img: "/entertainment.png" },
          { slug: "gaming", title: " Gaming", img: "/gaming.png" },
          { slug: "sports", title: "Sports ", img: "/sports.png" },
          { slug: "lifestyle", title: "Lifestyle ", img: "/lifestyle.png" },
          { slug: "fashion", title: " Fashion", img: "/lifestyle.png" },
          { slug: "education", title: "Education", img: "/education.png" },
          { slug: "environment", title: "Environment", img: "/environment.png" },
          { slug: "climate", title: "Climate", img: "/environment.png" },
          { slug: "art", title: "Art", img: "/art.png" },
          { slug: "design", title: " Design", img: "/art.png" },
          { slug: "books", title: "Books", img: "/books.png" },
          { slug: "diy", title: "DIY ", img: "/crafts.png" },
          { slug: "crafts", title: "Crafts", img: "/crafts.png" },
          { slug: "relationships", title: "Relationships ", img: "/relationships.png" },
          { slug: "ama", title: "Ask Me Anything", img: "/ama.png" },
          { slug: "humor", title: "Humor ", img: "/humor.png" },
          { slug: "food", title: "Food ", img: "/food.png" },
          { slug: "travel", title: "Travel ", img: "/travel.png" },
          { slug: "adventure", title: "Adventure", img: "/travel.png" },
          { slug: "opinion", title: "Opinion ", img: "/opinion.png" }
      ],
      
    });
    console.log("Sample categories added to the database.");
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
