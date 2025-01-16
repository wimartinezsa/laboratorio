/*
  Warnings:

  - You are about to drop the column `precio` on the `paquetes` table. All the data in the column will be lost.
  - Added the required column `precio` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paquetes` DROP COLUMN `precio`;

-- AlterTable
ALTER TABLE `servicios` ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;
