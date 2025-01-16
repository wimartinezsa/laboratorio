/*
  Warnings:

  - You are about to drop the column `servicioId` on the `acuerdos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_servicioId_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `servicioId`;
