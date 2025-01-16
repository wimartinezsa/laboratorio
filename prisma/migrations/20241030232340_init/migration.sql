/*
  Warnings:

  - You are about to drop the column `detalle_servicioId` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the `detalle_servicios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `examensercioId` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detalle_servicios` DROP FOREIGN KEY `detalle_servicios_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `detalle_servicios` DROP FOREIGN KEY `detalle_servicios_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_detalle_servicioId_fkey`;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `detalle_servicioId`,
    ADD COLUMN `examensercioId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `detalle_servicios`;

-- CreateTable
CREATE TABLE `examensercio` (
    `id_examenservicio` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `examenId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_examenservicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_examensercioId_fkey` FOREIGN KEY (`examensercioId`) REFERENCES `examensercio`(`id_examenservicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examensercio` ADD CONSTRAINT `examensercio_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examensercio` ADD CONSTRAINT `examensercio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
