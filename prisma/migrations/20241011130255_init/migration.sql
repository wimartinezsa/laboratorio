/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Prestadores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pacientes` MODIFY `identificacion` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `prestadores` MODIFY `codigo` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `identificacion` VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Prestadores_codigo_key` ON `Prestadores`(`codigo`);
