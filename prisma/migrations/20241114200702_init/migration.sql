/*
  Warnings:

  - The values [No] on the enum `Pacientes_incapacidad` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `pacientes` MODIFY `incapacidad` ENUM('SI', 'NO') NOT NULL;
