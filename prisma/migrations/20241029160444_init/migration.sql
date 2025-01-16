/*
  Warnings:

  - You are about to drop the column `servicioId` on the `examenes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_servicioId_fkey`;

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `servicioId`;
