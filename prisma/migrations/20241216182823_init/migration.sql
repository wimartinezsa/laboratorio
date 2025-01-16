/*
  Warnings:

  - You are about to drop the column `edad_persona` on the `examenes` table. All the data in the column will be lost.
  - You are about to drop the column `prestadorId` on the `usuarios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_prestadorId_fkey`;

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `edad_persona`;

-- AlterTable
ALTER TABLE `prestadores` ADD COLUMN `areaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `prestadorId`;

-- CreateTable
CREATE TABLE `areas` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prestadores` ADD CONSTRAINT `Prestadores_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;
