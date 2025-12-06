/*
  Warnings:

  - You are about to drop the column `lastUsedAt` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_expiresAt_idx";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "lastUsedAt";

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chats_roomId_idx" ON "Chats"("roomId");

-- CreateIndex
CREATE INDEX "Chats_userId_idx" ON "Chats"("userId");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
