/*
  Warnings:

  - Added the required column `resultado` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarifas` ADD COLUMN `resultado` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_resultado_fkey` FOREIGN KEY (`resultado`) REFERENCES `resultados`(`id_resultado`) ON DELETE RESTRICT ON UPDATE CASCADE;
