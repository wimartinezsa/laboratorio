/*
  Warnings:

  - Made the column `codigo` on table `finalidad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipo_identificacion` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `finalidad` MODIFY `codigo` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `tipo_identificacion` ENUM('CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS') NOT NULL;
