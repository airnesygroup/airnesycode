require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const path = require('path');

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug statement

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
      { slug: "general", title: "General", img: "/general.png" },
      { slug: "news-politics", title: "News & Politics", img: "/news&politics.png" },
      { slug: "business-finance", title: "Business & Finance", img: "/business&finance.png" },
      { slug: "technology", title: "Technology", img: "/technology.png" },
      { slug: "science", title: "Science", img: "/science.png" },
      { slug: "q-a", title: "Q & A", img: "/q&a.png" },
      { slug: "health-fitness", title: "Health & Fitness", img: "/health&fitness.png" },
      { slug: "sports", title: "Sports", img: "/sports.png" },
      { slug: "gaming", title: "Gaming", img: "/gaming.png" },
      { slug: "funny", title: "Funny", img: "/funny.png" },
      { slug: "music-entertainment", title: "Music & Entertainment", img: "/music&entertainment.png" },
      { slug: "movies-tv", title: "Movies & TV", img: "/movies&tv.png" },
      { slug: "anime", title: "Anime", img: "/anime.png" },
      { slug: "pop-culture", title: "Pop & Culture", img: "/pop&culture.png" },
      { slug: "fashion-beauty", title: "Fashion & Beauty", img: "/fashion&beauty.png" },
      { slug: "lifestyle", title: "Lifestyle", img: "/lifestyle.png" },
      { slug: "food-drinks", title: "Food & Drinks", img: "/food&drinks.png" },
      { slug: "arts-crafts", title: "Arts & Crafts", img: "/arts&crafts.png" },
      { slug: "hobbies-collectibles", title: "Hobbies & Collectibles", img: "/hobbies&collectibles.png" },
      { slug: "places-travel", title: "Places & Travel", img: "/places&travel.png" },
      { slug: "home-garden", title: "Home & Garden", img: "/home&garden.png" },
      { slug: "education-career", title: "Education & Career", img: "/education&career.png" },
      { slug: "humanities-law", title: "Humanities & Law", img: "/humanities&law.png" },
      { slug: "books", title: "Books", img: "/books.png" },
      { slug: "nature-outdoors", title: "Nature & Outdoors", img: "/nature&outdoors.png" },
      { slug: "environment-climate", title: "Environment & Climate", img: "/environment&climate.png" },
      { slug: "vehicles-machinery", title: "Vehicles & Machinery", img: "/vehicles&machinery.png" }
      
      ]
      
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
