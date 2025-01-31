/*
  Warnings:

  - Made the column `tipo_parametroId` on table `parametros` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `parametros` DROP FOREIGN KEY `parametros_tipo_parametroId_fkey`;

-- DropIndex
DROP INDEX `parametros_tipo_parametroId_fkey` ON `parametros`;

-- AlterTable
ALTER TABLE `parametros` MODIFY `tipo_parametroId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `parametros` ADD CONSTRAINT `parametros_tipo_parametroId_fkey` FOREIGN KEY (`tipo_parametroId`) REFERENCES `tipo_parametros`(`id_tipo_parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;
