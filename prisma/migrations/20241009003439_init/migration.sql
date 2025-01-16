/*
  Warnings:

  - You are about to alter the column `estado` on the `contratos` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(10))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `eps` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `examenes` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `profesionales` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(11))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `tarifas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `tipos_examenes` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `tipos_resultados` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `tipos_servicios` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `VarChar(191)`.
  - You are about to alter the column `estado` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(14))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `contratos` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `empresas` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `eps` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `examenes` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `profesionales` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tarifas` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tipos_examenes` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tipos_resultados` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tipos_servicios` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `usuarios` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'Activo';
