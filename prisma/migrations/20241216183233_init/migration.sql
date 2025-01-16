/*
  Warnings:

  - You are about to drop the column `areaId` on the `prestadores` table. All the data in the column will be lost.
  - Added the required column `areaId` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `prestadores` DROP FOREIGN KEY `Prestadores_areaId_fkey`;

-- AlterTable
ALTER TABLE `areas` ADD COLUMN `prestadorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `prestadores` DROP COLUMN `areaId`;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `areaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id_area`) ON DELETE RESTRICT ON UPDATE CASCADE;
