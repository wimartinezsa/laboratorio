/*
  Warnings:

  - Made the column `estado` on table `parametros` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `parametros` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';
