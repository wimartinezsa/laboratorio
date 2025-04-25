/*
  Warnings:

  - You are about to drop the column `resultado_raboratorio` on the `procedimientos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `resultado_raboratorio`,
    ADD COLUMN `resultado_laboratorio` ENUM('Automatico', 'Manual') NULL DEFAULT 'Automatico';
