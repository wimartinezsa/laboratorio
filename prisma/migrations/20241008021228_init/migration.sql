/*
  Warnings:

  - You are about to drop the column `createAt` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `estudios` table. All the data in the column will be lost.
  - Added the required column `fecha_resultado` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `createAt`,
    DROP COLUMN `precio`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `fecha_resultado` DATETIME(3) NOT NULL;
