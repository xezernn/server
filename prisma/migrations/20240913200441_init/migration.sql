/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Slider` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Slider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slider" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "img" SET NOT NULL,
ALTER COLUMN "img" SET DATA TYPE TEXT;
