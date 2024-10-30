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
        { slug: "artificial-intelligence", title: "Artificial Intelligence", icon: "fa-solid fa-robot" },
        { slug: "gaming", title: "Gaming", icon: "fa-solid fa-gamepad" },
        { slug: "entertainment", title: "Entertainment", icon: "fa-solid fa-film" },
        { slug: "metaverse", title: "Metaverse", icon: "fa-solid fa-vr-cardboard" },
        { slug: "blockchain", title: "Blockchain", icon: "fa-solid fa-coins" },
        { slug: "virtual-reality", title: "Virtual Reality", icon: "fa-solid fa-vr-cardboard" },
        { slug: "augmented-reality", title: "Augmented Reality", icon: "fa-solid fa-glasses" },
        { slug: "threed-printing", title: "3D Printing", icon: "fa-solid fa-print" },
        { slug: "fintech", title: "FinTech", icon: "fa-solid fa-piggy-bank" },
        { slug: "wearable-tech", title: "Wearable Tech", icon: "fa-solid fa-hand-paper" },
        { slug: "media", title: "Media ", icon: "fa-solid fa-bullhorn" },
        { slug: "e-commerce", title: "E-Commerce", icon: "fa-solid fa-shopping-cart" },
        { slug: "machine-learning", title: "Machine Learning", icon: "fa-solid fa-brain" },
        { slug: "data-science", title: "Data Science", icon: "fa-solid fa-database" },
        { slug: "software", title: "Software", icon: "fa-solid fa-code" },
        { slug: "robotics", title: "Robotics", icon: "fa-solid fa-robot" },
        { slug: "cloud-computing", title: "Cloud Computing", icon: "fa-solid fa-cloud" },
        { slug: "quantum-computing", title: "Quantum Computing", icon: "fa-solid fa-atom" },
        { slug: "cybersecurity", title: "Cybersecurity", icon: "fa-solid fa-lock" },
        { slug: "internet-of-things", title: "Internet of Things", icon: "fa-solid fa-wifi" },
        { slug: "networking", title: "Networking", icon: "fa-solid fa-network-wired" },
        { slug: "fashion", title: "Fashion", icon: "fa-solid fa-tshirt" },
        { slug: "foodtech", title: "FoodTech", icon: "fa-solid fa-utensils" },
        { slug: "electrical", title: "Electrical ", icon: "fa-solid fa-bolt" },
        { slug: "electronics", title: "Electronics", icon: "fa-solid fa-desktop" },
        { slug: "automotive", title: "Automotive", icon: "fa-solid fa-car" },
        { slug: "aerospace", title: "Aerospace", icon: "fa-solid fa-rocket" },
        { slug: "energy", title: "Energy", icon: "fa-solid fa-battery-half" },
        { slug: "physics", title: "Physics", icon: "fa-solid fa-flask" },
        { slug: "mathematics", title: "Mathematics", icon: "fa-solid fa-square-root-alt" },
        { slug: "biotech", title: "Biotech", icon: "fa-solid fa-dna" },
        { slug: "geospatial", title: "Geospatial", icon: "fa-solid fa-map-marked-alt" },
        { slug: "mechanics", title: "Mechanics ", icon: "fa-solid fa-cogs" },
        
        { slug: "industrial", title: "Industrial", icon: "fa-solid fa-industry" },

        { slug: "construction", title: "Construction", icon: "fa-solid fa-hammer" },
        { slug: "medtech", title: "MedTech", icon: "fa-solid fa-heartbeat" },
        { slug: "agritech", title: "AgriTech", icon: "fa-solid fa-seedling" },
        { slug: "envirotech", title: "EnviroTech", icon: "fa-solid fa-leaf" },
        { slug: "marine-tech", title: "Marine Technology", icon: "fa-solid fa-anchor" },
        { slug: "military-tech", title: "Military Technology", icon: "fa-solid fa-fighter-jet" },
        { slug: "supply-chain", title: "Supply Chain", icon: "fa-solid fa-boxes" },
        { slug: "smart-city", title: "Smart City", icon: "fa-solid fa-city" },
        { slug: "textile-tech", title: "Textile Technology", icon: "fa-solid fa-tshirt" },
        { slug: "sports-tech", title: "Sports Technology", icon: "fa-solid fa-football-ball" },
        { slug: "digital-art-design", title: "Digital Art & Design", icon: "fa-solid fa-paint-brush" }
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
