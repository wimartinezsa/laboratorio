/*
  Warnings:

  - You are about to drop the column `createAt` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `pacientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`;
