/*
  Warnings:

  - You are about to drop the `prestaciones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `prestaciones` DROP FOREIGN KEY `prestaciones_facturaId_fkey`;

-- DropForeignKey
ALTER TABLE `prestaciones` DROP FOREIGN KEY `prestaciones_procedimientoId_fkey`;

-- DropTable
DROP TABLE `prestaciones`;

-- CreateTable
CREATE TABLE `resultado` (
    `id_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `resultado` VARCHAR(200) NULL,
    `examenId` INTEGER NOT NULL,
    `parametroId` INTEGER NOT NULL,

    PRIMARY KEY (`id_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examenes` (
    `id_examen` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `fecha_muestra` DATETIME(3) NULL,
    `fecha_analisis` DATETIME(3) NULL,
    `fecha_resultado` DATETIME(3) NULL,
    `estado` ENUM('Solicitado', 'Confirmado', 'En_Toma_de_Muestra', 'Muestra_Recibida', 'En_Proceso_de_Analisis', 'Analisis_Completo', 'Resultados_Listos', 'Resultados_Entregados') NOT NULL DEFAULT 'Solicitado',
    `observacion` VARCHAR(200) NULL,
    `profesional` INTEGER NULL,
    `procedimientoId` INTEGER NOT NULL,
    `facturaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_examen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resultado` ADD CONSTRAINT `resultado_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado` ADD CONSTRAINT `resultado_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `Parametros`(`id_parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `facturas`(`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE;
