/*
  Warnings:

  - You are about to drop the `resultados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `resultados` DROP FOREIGN KEY `resultados_procedimiento_fkey`;

-- DropForeignKey
ALTER TABLE `resultados` DROP FOREIGN KEY `resultados_tarifa_fkey`;

-- DropTable
DROP TABLE `resultados`;

-- CreateTable
CREATE TABLE `Estudios` (
    `id_estudio` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `fecha_muestra` DATETIME(3) NOT NULL,
    `resultado` VARCHAR(30) NOT NULL,
    `observacion` VARCHAR(200) NOT NULL,
    `profesional` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `tarifa` INTEGER NOT NULL,
    `procedimiento` INTEGER NOT NULL,

    PRIMARY KEY (`id_estudio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_tarifa_fkey` FOREIGN KEY (`tarifa`) REFERENCES `Tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_procedimiento_fkey` FOREIGN KEY (`procedimiento`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
