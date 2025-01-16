/*
  Warnings:

  - You are about to drop the column `metodo` on the `procedimientos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `metodo`,
    ADD COLUMN `tecnica` VARCHAR(50) NULL;
