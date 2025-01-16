/*
  Warnings:

  - You are about to drop the `tipo_resultado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tipo_resultado` DROP FOREIGN KEY `tipo_resultado_examen_fkey`;

-- DropTable
DROP TABLE `tipo_resultado`;

-- CreateTable
CREATE TABLE `tipos_resultados` (
    `id_tipo_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `examen` INTEGER NOT NULL,

    PRIMARY KEY (`id_tipo_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tipos_resultados` ADD CONSTRAINT `tipos_resultados_examen_fkey` FOREIGN KEY (`examen`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;
