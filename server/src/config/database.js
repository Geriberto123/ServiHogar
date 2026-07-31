let prisma = null;

try {
  const prismaClientModule = require('@prisma/client');
  prisma = prismaClientModule.PrismaClient ? new prismaClientModule.PrismaClient() : prismaClientModule;
} catch (error) {
  prisma = null;
}

const fallbackUsers = [];

function getClient() {
  if (prisma) {
    return prisma;
  }

  return {
    user: {
      findUnique: async ({ where }) => {
        return fallbackUsers.find((user) => user.email === where.email) || null;
      },
      create: async ({ data }) => {
        const createdUser = {
          id: fallbackUsers.length + 1,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        fallbackUsers.push(createdUser);
        return createdUser;
      },
    },
  };
}

module.exports = getClient();
