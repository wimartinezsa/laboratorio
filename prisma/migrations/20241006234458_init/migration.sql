/*
  Warnings:

  - Added the required column `contrato` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `contrato` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_contrato_fkey` FOREIGN KEY (`contrato`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;
