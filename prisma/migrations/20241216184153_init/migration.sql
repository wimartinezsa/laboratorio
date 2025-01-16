/*
  Warnings:

  - You are about to drop the column `profesional` on the `examenes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `profesional`,
    ADD COLUMN `areaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;
