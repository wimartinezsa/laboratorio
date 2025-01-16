/*
  Warnings:

  - You are about to drop the column `finalidadId` on the `servicios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_finalidadId_fkey`;

-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `finalidadId`;
