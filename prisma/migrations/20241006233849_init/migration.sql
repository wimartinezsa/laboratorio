/*
  Warnings:

  - Added the required column `examen` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarifas` ADD COLUMN `examen` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_examen_fkey` FOREIGN KEY (`examen`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;
