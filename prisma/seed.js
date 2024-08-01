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
      { slug: "newsandpolitics", title: "News & Politics", img: "/news&politics.png" },
      { slug: "businessandfinance", title: "Business & Finance", img: "/business&finance.png" },
      { slug: "technology", title: "Technology", img: "/technology.png" },
      { slug: "science", title: "Science", img: "/science.png" },
      { slug: "qanda", title: "Q & A", img: "/q&a.png" },
      { slug: "healthandfitness", title: "Health & Fitness", img: "/health&fitness.png" },
      { slug: "sports", title: "Sports", img: "/sports.png" },
      { slug: "gaming", title: "Gaming", img: "/gaming.png" },
      { slug: "funny", title: "Funny", img: "/funny.png" },
      { slug: "musicandentertainment", title: "Music & Entertainment", img: "/music&entertainment.png" },
      { slug: "moviesandtv", title: "Movies & TV", img: "/movies&tv.png" },
      { slug: "anime", title: "Anime", img: "/anime.png" },
      { slug: "popandculture", title: "Pop & Culture", img: "/pop&culture.png" },
      { slug: "fashionandbeauty", title: "Fashion & Beauty", img: "/fashion&beauty.png" },
      { slug: "lifestyle", title: "Lifestyle", img: "/lifestyle.png" },
      { slug: "foodanddrinks", title: "Food & Drinks", img: "/food&drinks.png" },
      { slug: "artsandcrafts", title: "Arts & Crafts", img: "/arts&crafts.png" },
      { slug: "hobbiesandcollectibles", title: "Hobbies & Collectibles", img: "/hobbies&collectibles.png" },
      { slug: "placesandtravel", title: "Places & Travel", img: "/places&travel.png" },
      { slug: "homeandgarden", title: "Home & Garden", img: "/home&garden.png" },
      { slug: "educationandcareer", title: "Education & Career", img: "/education&career.png" },
      { slug: "humanitiesandlaw", title: "Humanities & Law", img: "/humanities&law.png" },
      { slug: "books", title: "Books", img: "/books.png" },
      { slug: "natureandoutdoors", title: "Nature & Outdoors", img: "/nature&outdoors.png" },
      { slug: "environmentandclimate", title: "Environment & Climate", img: "/environment&climate.png" },
      { slug: "vehiclesandmachinery", title: "Vehicles & Machinery", img: "/vehicles&machinery.png" }
      
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
