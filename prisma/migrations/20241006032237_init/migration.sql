/*
  Warnings:

  - Added the required column `cantidad` to the `detalles_procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalles_procedimientos` ADD COLUMN `cantidad` INTEGER NOT NULL;
