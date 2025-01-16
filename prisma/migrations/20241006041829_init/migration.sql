/*
  Warnings:

  - You are about to drop the `detalles_procedimientos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detalles_procedimientos` DROP FOREIGN KEY `detalles_procedimientos_detalle_servicio_fkey`;

-- DropForeignKey
ALTER TABLE `detalles_procedimientos` DROP FOREIGN KEY `detalles_procedimientos_procedimiento_fkey`;

-- DropTable
DROP TABLE `detalles_procedimientos`;

-- CreateTable
CREATE TABLE `resultados` (
    `id_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `resultado` VARCHAR(50) NOT NULL,
    `observacion` VARCHAR(200) NOT NULL,
    `procedimiento` INTEGER NOT NULL,
    `detalle_servicio` INTEGER NOT NULL,

    PRIMARY KEY (`id_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_procedimiento_fkey` FOREIGN KEY (`procedimiento`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_detalle_servicio_fkey` FOREIGN KEY (`detalle_servicio`) REFERENCES `detalles_servicios`(`id_detalle_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
