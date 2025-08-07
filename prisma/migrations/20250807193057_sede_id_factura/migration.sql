/*
  Warnings:

  - Added the required column `sedeId` to the `facturas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `facturas` ADD COLUMN `sedeId` INTEGER NOT NULL;
