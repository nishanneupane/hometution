const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.deleteMany();
  await prisma.admin.upsert({
    where: { email: "info@hrhometuition.com" },
    update: {},
    create: {
      id: "admin_001",
      email: "info@hrhometuition.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
      name: "System Administrator",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

main()
  .then(() => {
    console.log("✅ Seed successful");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seed failed", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
