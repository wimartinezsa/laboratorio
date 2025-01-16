/*
  Warnings:

  - You are about to drop the column `paisorigen` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `paisId` to the `Pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `paisorigen`,
    ADD COLUMN `paisId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `paises`(`id_pais`) ON DELETE RESTRICT ON UPDATE CASCADE;
