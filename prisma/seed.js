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
          { slug: "business", title: "Business & Finance ", img: "/business.png" },
          { slug: "technology", title: "Technology", img: "/technology.png" },
          { slug: "health", title: "Health & Wellness", img: "/health.png" },
          { slug: "science", title: "Science", img: "/science.png" },
          { slug: "entertainment", title: "Movies & Music", img: "/entertainment.png" },
          { slug: "gaming", title: " Gaming", img: "/gaming.png" },
          { slug: "sports", title: "Sports & Athletics", img: "/sports.png" },
          { slug: "lifestyle", title: "Lifestyle & Fashion", img: "/lifestyle.png" },
          { slug: "education", title: "Education & Learning", img: "/education.png" },
          { slug: "environment", title: "Environment & Climate", img: "/environment.png" },
          { slug: "art", title: "Art & Design", img: "/art.png" },
          { slug: "books", title: "Books & Literature", img: "/books.png" },
          { slug: "crafts", title: "DIY & Crafts", img: "/crafts.png" },
          { slug: "relationships", title: "Relationships ", img: "/relationships.png" },
          { slug: "ama", title: "Ask Me Anything", img: "/ama.png" },
          { slug: "humor", title: "Humor & Memes", img: "/humor.png" },
          { slug: "food", title: "Food & Drink", img: "/food.png" },
          { slug: "travel", title: "Travel & Adventure", img: "/travel.png" },
          { slug: "opinion", title: "Opinion & Editorials", img: "/opinion.png" }
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
