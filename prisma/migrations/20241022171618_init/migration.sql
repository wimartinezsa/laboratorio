/*
  Warnings:

  - You are about to drop the column `nombres` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `primer_apellido` to the `Pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primer_nombre` to the `Pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segundo_apellido` to the `Pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segundo_nombre` to the `Pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `nombres`,
    ADD COLUMN `primer_apellido` VARCHAR(50) NOT NULL,
    ADD COLUMN `primer_nombre` VARCHAR(50) NOT NULL,
    ADD COLUMN `segundo_apellido` VARCHAR(50) NOT NULL,
    ADD COLUMN `segundo_nombre` VARCHAR(50) NOT NULL;
