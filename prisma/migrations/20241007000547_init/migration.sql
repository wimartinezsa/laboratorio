/*
  Warnings:

  - You are about to drop the column `factura` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `resultados` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `factura`;

-- AlterTable
ALTER TABLE `resultados` DROP COLUMN `valor`;
