/*
  Warnings:

  - You are about to drop the column `Estado_Laboratorio` on the `procedimientos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `Estado_Laboratorio`,
    ADD COLUMN `resultado_raboratorio` ENUM('Automatico', 'Manual') NULL DEFAULT 'Automatico';
