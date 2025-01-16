/*
  Warnings:

  - You are about to drop the column `areaId` on the `examenes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_areaId_fkey`;

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `areaId`;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `areaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;
