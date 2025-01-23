/*
  Warnings:

  - You are about to alter the column `tipo` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(12))` to `Enum(EnumId(19))`.

*/
-- AlterTable
ALTER TABLE `empresas` MODIFY `tipo` ENUM('Particular', 'Empresa', 'Eps', 'Ese') NULL;
