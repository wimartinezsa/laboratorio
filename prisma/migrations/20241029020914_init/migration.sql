/*
  Warnings:

  - You are about to drop the column `paqueteId` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the `paquetes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_paqueteId_fkey`;

-- DropForeignKey
ALTER TABLE `paquetes` DROP FOREIGN KEY `Paquetes_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `paquetes` DROP FOREIGN KEY `Paquetes_servicioId_fkey`;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `paqueteId`;

-- DropTable
DROP TABLE `paquetes`;
