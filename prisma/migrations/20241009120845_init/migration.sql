/*
  Warnings:

  - You are about to drop the `profesionales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profesionales` DROP FOREIGN KEY `profesionales_prestadorId_fkey`;

-- DropTable
DROP TABLE `profesionales`;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` BIGINT NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo') NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `prestadorId` INTEGER NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;
