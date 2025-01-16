/*
  Warnings:

  - You are about to drop the column `iva` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `servicios` table. All the data in the column will be lost.
  - Added the required column `iva` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `iva`,
    DROP COLUMN `precio`;

-- AlterTable
ALTER TABLE `tarifas` ADD COLUMN `iva` DECIMAL(10, 2) NOT NULL;
