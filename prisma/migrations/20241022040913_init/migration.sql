/*
  Warnings:

  - You are about to drop the column `examenId` on the `tarifas` table. All the data in the column will be lost.
  - You are about to drop the column `servicioId` on the `tarifas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_servicioId_fkey`;

-- AlterTable
ALTER TABLE `tarifas` DROP COLUMN `examenId`,
    DROP COLUMN `servicioId`;

-- CreateTable
CREATE TABLE `Paquetes` (
    `id_paquete` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `precio` DECIMAL(10, 2) NOT NULL,
    `examenId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_paquete`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paquetes` ADD CONSTRAINT `Paquetes_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paquetes` ADD CONSTRAINT `Paquetes_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
