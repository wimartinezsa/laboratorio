/*
  Warnings:

  - You are about to drop the column `servicioId` on the `acuerdos` table. All the data in the column will be lost.
  - Added the required column `paqueteId` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_servicioId_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `servicioId`,
    ADD COLUMN `paqueteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_paqueteId_fkey` FOREIGN KEY (`paqueteId`) REFERENCES `paquetes`(`id_paquete`) ON DELETE RESTRICT ON UPDATE CASCADE;
