/*
  Warnings:

  - You are about to alter the column `estado` on the `contratos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `eps` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `examenes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `procedimientos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `profesionales` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `servicios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `tarifas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `tipos_examenes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `tipos_resultados` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `tipos_servicios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.
  - You are about to alter the column `estado` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(16))`.

*/
-- AlterTable
ALTER TABLE `contratos` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `empresas` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `eps` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `examenes` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `procedimientos` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `profesionales` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `servicios` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tarifas` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tipos_examenes` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tipos_resultados` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `tipos_servicios` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `usuarios` MODIFY `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';
