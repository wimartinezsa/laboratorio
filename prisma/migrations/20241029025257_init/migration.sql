/*
  Warnings:

  - Added the required column `centro_costoId` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicios` ADD COLUMN `centro_costoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `centro_costos` (
    `id_centro_costo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    `unidad_funcional` VARCHAR(30) NOT NULL,
    `concepto` INTEGER NOT NULL,

    PRIMARY KEY (`id_centro_costo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_centro_costoId_fkey` FOREIGN KEY (`centro_costoId`) REFERENCES `centro_costos`(`id_centro_costo`) ON DELETE RESTRICT ON UPDATE CASCADE;
