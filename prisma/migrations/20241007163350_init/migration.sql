/*
  Warnings:

  - Added the required column `email` to the `profesionales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profesionales` ADD COLUMN `email` VARCHAR(50) NOT NULL,
    MODIFY `password` VARCHAR(100) NOT NULL;
