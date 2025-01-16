/*
  Warnings:

  - Added the required column `tipo_resultado` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edad_persona` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `tipo_resultado` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `edad_persona` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `direccion` VARCHAR(50) NULL;

-- CreateTable
CREATE TABLE `tipo_resultado` (
    `id_tipo_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_tipo_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_tipo_resultado_fkey` FOREIGN KEY (`tipo_resultado`) REFERENCES `tipo_resultado`(`id_tipo_resultado`) ON DELETE RESTRICT ON UPDATE CASCADE;
