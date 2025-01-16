/*
  Warnings:

  - Added the required column `contratoId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `contratoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;
