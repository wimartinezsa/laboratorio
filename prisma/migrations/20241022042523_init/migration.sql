/*
  Warnings:

  - You are about to drop the column `tarifaId` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `paqueteId` on the `tarifas` table. All the data in the column will be lost.
  - Added the required column `paqueteId` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicioId` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_tarifaId_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_paqueteId_fkey`;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `tarifaId`,
    ADD COLUMN `paqueteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tarifas` DROP COLUMN `paqueteId`,
    ADD COLUMN `servicioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_paqueteId_fkey` FOREIGN KEY (`paqueteId`) REFERENCES `Paquetes`(`id_paquete`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
