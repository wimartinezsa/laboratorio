/*
  Warnings:

  - You are about to drop the column `acuerdoId` on the `procedimientos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_acuerdoId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `acuerdoId`;
