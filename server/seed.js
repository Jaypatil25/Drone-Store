const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");

const dbUrl = `file:${path.resolve(__dirname, "prisma/dev.db")}`;
const adapter = new PrismaLibSql({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

const drones = [
  {
    name: "Phantom X Pro",
    description: "Professional-grade aerial powerhouse with AI-stabilized 8K camera.",
    price: 4199, category: "Professional", brand: "Phantom",
    imageUrl: "/assets/drone-phantom.png", stock: 10,
    purpose: "photography", experience: "expert",
    rangeKm: 10, flightTimeMin: 45, cameraMP: 48, weight: 1.2,
  },
  {
    name: "AeroScout Mini",
    description: "Compact, yet incredibly powerful — the AeroScout Mini is your perfect travel companion.",
    price: 1499, category: "Travel", brand: "AeroScout",
    imageUrl: "/assets/drone-mini.png", stock: 25,
    purpose: "photography", experience: "beginner",
    rangeKm: 5, flightTimeMin: 30, cameraMP: 12, weight: 0.3,
  },
  {
    name: "Volt XRT",
    description: "Built for speed and agility — dominate the skies with the Volt XRT racing drone.",
    price: 2799, category: "Racing", brand: "Volt",
    imageUrl: "/assets/drone-volt.png", stock: 15,
    purpose: "racing", experience: "intermediate",
    rangeKm: 3, flightTimeMin: 20, cameraMP: 0, weight: 0.5,
  },
  {
    name: "Sky Edge",
    description: "Precision agriculture and mapping drone with multi-spectral imaging.",
    price: 3599, category: "Agriculture", brand: "SkyEdge",
    imageUrl: "/assets/drone-sky.png", stock: 8,
    purpose: "agriculture", experience: "expert",
    rangeKm: 8, flightTimeMin: 40, cameraMP: 20, weight: 2.1,
  },
];

async function seed() {
  await prisma.user.upsert({
    where: { email: "guest@droneshop.com" },
    update: {},
    create: { name: "Guest", email: "guest@droneshop.com", password: "guest", role: "user" },
  });

  for (const drone of drones) {
    await prisma.product.upsert({
      where: { id: drones.indexOf(drone) + 1 },
      update: drone,
      create: drone,
    });
  }
  console.log("✅ Seeded 4 drones + guest user");
  await prisma.$disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });
