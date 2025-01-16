/*
  Warnings:

  - You are about to drop the column `precio` on the `detalle_servicios` table. All the data in the column will be lost.
  - You are about to drop the column `acuerdoId` on the `estudios` table. All the data in the column will be lost.
  - Added the required column `detalle_servicioId` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_acuerdoId_fkey`;

-- AlterTable
ALTER TABLE `detalle_servicios` DROP COLUMN `precio`;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `acuerdoId`,
    ADD COLUMN `detalle_servicioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_detalle_servicioId_fkey` FOREIGN KEY (`detalle_servicioId`) REFERENCES `detalle_servicios`(`id_detalle_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
