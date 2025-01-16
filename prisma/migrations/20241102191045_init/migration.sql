/*
  Warnings:

  - You are about to drop the column `procedimientoId` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the `procedimientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tito_procedimiento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facturaId` to the `Estudios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_contratoId_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_pacienteId_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_tipo_procedimientoId_fkey`;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `procedimientoId`,
    ADD COLUMN `facturaId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `procedimientos`;

-- DropTable
DROP TABLE `tito_procedimiento`;

-- CreateTable
CREATE TABLE `Tipo_procedimiento` (
    `id_tipo_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_tipo_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facturas` (
    `id_factura` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `edad_persona` VARCHAR(20) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `contratoId` INTEGER NOT NULL,
    `pacienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id_factura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Pacientes`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `facturas`(`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE;
