/*
  Warnings:

  - You are about to drop the column `consecutivo` on the `procedimientos` table. All the data in the column will be lost.
  - Added the required column `consecutivo` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factura` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estudios` ADD COLUMN `consecutivo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `consecutivo`,
    ADD COLUMN `factura` INTEGER NOT NULL;
