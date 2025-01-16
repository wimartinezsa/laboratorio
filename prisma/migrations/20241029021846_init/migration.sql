/*
  Warnings:

  - Added the required column `servicioId` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `servicioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
