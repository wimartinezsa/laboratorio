/*
  Warnings:

  - You are about to drop the `examensercio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_examensercioId_fkey`;

-- DropForeignKey
ALTER TABLE `examensercio` DROP FOREIGN KEY `examensercio_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `examensercio` DROP FOREIGN KEY `examensercio_servicioId_fkey`;

-- DropTable
DROP TABLE `examensercio`;

-- CreateTable
CREATE TABLE `examenservicio` (
    `id_examenservicio` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `examenId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_examenservicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_examensercioId_fkey` FOREIGN KEY (`examensercioId`) REFERENCES `examenservicio`(`id_examenservicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenservicio` ADD CONSTRAINT `examenservicio_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenservicio` ADD CONSTRAINT `examenservicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
