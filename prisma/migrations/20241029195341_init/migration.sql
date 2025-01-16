/*
  Warnings:

  - You are about to drop the column `detalle_servicioId` on the `acuerdos` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `detalle_servicios` table. All the data in the column will be lost.
  - Added the required column `servicioId` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_detalle_servicioId_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `detalle_servicioId`,
    ADD COLUMN `servicioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `detalle_servicios` DROP COLUMN `nombre`;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
