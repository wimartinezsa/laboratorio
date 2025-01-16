/*
  Warnings:

  - Added the required column `paqueteId` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarifas` ADD COLUMN `paqueteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_paqueteId_fkey` FOREIGN KEY (`paqueteId`) REFERENCES `Paquetes`(`id_paquete`) ON DELETE RESTRICT ON UPDATE CASCADE;
