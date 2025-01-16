/*
  Warnings:

  - You are about to drop the column `contratoId` on the `procedimientos` table. All the data in the column will be lost.
  - Added the required column `tarifaId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_contratoId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `contratoId`,
    ADD COLUMN `tarifaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_tarifaId_fkey` FOREIGN KEY (`tarifaId`) REFERENCES `Tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;
