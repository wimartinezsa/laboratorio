/*
  Warnings:

  - You are about to drop the column `indice` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `servicios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `indice`,
    DROP COLUMN `nivel`;
