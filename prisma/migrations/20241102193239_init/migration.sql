/*
  Warnings:

  - You are about to drop the `estudios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo_procedimientoId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_facturaId_fkey`;

-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_paqueteId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `tipo_procedimientoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `estudios`;

-- CreateTable
CREATE TABLE `prestaciones` (
    `id_prestacion` INTEGER NOT NULL AUTO_INCREMENT,
    `consecutivo` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fecha_muestra` DATETIME(3) NOT NULL,
    `fecha_resultado` DATETIME(3) NOT NULL,
    `resultado` VARCHAR(30) NOT NULL,
    `observacion` VARCHAR(200) NOT NULL,
    `profesional` INTEGER NOT NULL,
    `facturaId` INTEGER NOT NULL,
    `paqueteId` INTEGER NOT NULL,

    PRIMARY KEY (`id_prestacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prestaciones` ADD CONSTRAINT `prestaciones_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `facturas`(`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestaciones` ADD CONSTRAINT `prestaciones_paqueteId_fkey` FOREIGN KEY (`paqueteId`) REFERENCES `paquetes`(`id_paquete`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_tipo_procedimientoId_fkey` FOREIGN KEY (`tipo_procedimientoId`) REFERENCES `Tipo_procedimiento`(`id_tipo_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
