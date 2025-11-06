import { PrismaClient } from "./Prisma/prisma.js";

// lets build singleton pattern so that in dev enviromanet we dont get too many connections erros