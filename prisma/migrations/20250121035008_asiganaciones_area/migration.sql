/*
  Warnings:

  - You are about to drop the column `areaId` on the `usuarios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_areaId_fkey`;

-- DropIndex
DROP INDEX `usuarios_areaId_fkey` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `areaId`;

-- CreateTable
CREATE TABLE `vinculaciones` (
    `id_vincuacion` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `areaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_vincuacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vinculaciones` ADD CONSTRAINT `vinculaciones_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vinculaciones` ADD CONSTRAINT `vinculaciones_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id_area`) ON DELETE RESTRICT ON UPDATE CASCADE;
