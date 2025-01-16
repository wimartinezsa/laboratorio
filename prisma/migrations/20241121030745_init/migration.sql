/*
  Warnings:

  - Added the required column `codigo` to the `Tipo_Servicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tipo_servicio` ADD COLUMN `codigo` VARCHAR(10) NOT NULL;
