/*
  Warnings:

  - You are about to drop the column `rango_biologico` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the `tipos_resultados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tipos_resultados` DROP FOREIGN KEY `tipos_resultados_procedimientoId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `rango_biologico`;

-- DropTable
DROP TABLE `tipos_resultados`;

-- CreateTable
CREATE TABLE `rango_biologicos` (
    `id_rango_biologogico` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(80) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `procedimientoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_rango_biologogico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rango_biologicos` ADD CONSTRAINT `rango_biologicos_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
