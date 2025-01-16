/*
  Warnings:

  - You are about to drop the `empleados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `empleados` DROP FOREIGN KEY `Empleados_prestador_fkey`;

-- AlterTable
ALTER TABLE `resultados` MODIFY `fecha_muestra` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `empleados`;

-- CreateTable
CREATE TABLE `profesionales` (
    `id_profesional` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` BIGINT NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo') NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `prestador` INTEGER NOT NULL,

    PRIMARY KEY (`id_profesional`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profesionales` ADD CONSTRAINT `profesionales_prestador_fkey` FOREIGN KEY (`prestador`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;
