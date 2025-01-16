/*
  Warnings:

  - You are about to drop the column `primer_apellido` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `primer_nombre` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `segundo_apellido` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `segundo_nombre` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `nombres` to the `Pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `primer_apellido`,
    DROP COLUMN `primer_nombre`,
    DROP COLUMN `segundo_apellido`,
    DROP COLUMN `segundo_nombre`,
    ADD COLUMN `nombres` VARCHAR(50) NOT NULL;
