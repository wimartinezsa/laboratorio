/*
  Warnings:

  - Added the required column `examenId` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `acuerdos` ADD COLUMN `examenId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;
