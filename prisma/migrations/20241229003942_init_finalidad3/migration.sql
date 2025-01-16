/*
  Warnings:

  - Made the column `finalidadId` on table `procedimientos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_finalidadId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` MODIFY `finalidadId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_finalidadId_fkey` FOREIGN KEY (`finalidadId`) REFERENCES `finalidad`(`id_finalidad`) ON DELETE RESTRICT ON UPDATE CASCADE;
