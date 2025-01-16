/*
  Warnings:

  - You are about to drop the column `examenId` on the `acuerdos` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `indice` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_examenId_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `examenId`;

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `precio`;

-- AlterTable
ALTER TABLE `servicios` ADD COLUMN `indice` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `detalle_servicios` (
    `id_detalle_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `examenId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_detalle_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalle_servicios` ADD CONSTRAINT `detalle_servicios_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_servicios` ADD CONSTRAINT `detalle_servicios_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
