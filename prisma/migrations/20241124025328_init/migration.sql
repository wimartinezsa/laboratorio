/*
  Warnings:

  - Added the required column `precio` to the `prestaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prestaciones` ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;
