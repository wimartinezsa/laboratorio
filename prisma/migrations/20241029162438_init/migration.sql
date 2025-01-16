/*
  Warnings:

  - You are about to drop the column `servicioId` on the `acuerdos` table. All the data in the column will be lost.
  - Added the required column `detalle_servicioId` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_servicioId_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `servicioId`,
    ADD COLUMN `detalle_servicioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_detalle_servicioId_fkey` FOREIGN KEY (`detalle_servicioId`) REFERENCES `detalle_servicios`(`id_detalle_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
