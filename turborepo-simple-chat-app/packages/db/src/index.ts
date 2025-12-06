// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {
    // Private constructor ensures class cannot be instantiated directly
  }

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }

    return PrismaSingleton.instance;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? PrismaSingleton.getInstance();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;