/*
  Warnings:

  - Added the required column `servicioId` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `detalle_servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `acuerdos` ADD COLUMN `servicioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `detalle_servicios` ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
