/*
  Warnings:

  - Added the required column `nombre` to the `Contratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acuerdoId` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contratos` ADD COLUMN `nombre` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `estudios` ADD COLUMN `acuerdoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_acuerdoId_fkey` FOREIGN KEY (`acuerdoId`) REFERENCES `Acuerdos`(`id_acuerdo`) ON DELETE RESTRICT ON UPDATE CASCADE;
