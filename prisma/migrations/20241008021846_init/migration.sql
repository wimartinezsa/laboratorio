/*
  Warnings:

  - Added the required column `nit` to the `Prestadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `profesionales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prestadores` ADD COLUMN `nit` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `profesionales` ADD COLUMN `estado` ENUM('Activo', 'Inactivo') NOT NULL;
