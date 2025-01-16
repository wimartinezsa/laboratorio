/*
  Warnings:

  - The values [MV] on the enum `Pacientes_tipo_identificacion` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tarifaId` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the `tarifas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `acuerdoId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_tarifaId_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_contratoId_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_servicioId_fkey`;

-- AlterTable
ALTER TABLE `pacientes` MODIFY `tipo_identificacion` ENUM('CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS') NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `tarifaId`,
    ADD COLUMN `acuerdoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tarifas`;

-- CreateTable
CREATE TABLE `Acuerdos` (
    `id_acuerdo` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `precio` DECIMAL(10, 2) NOT NULL,
    `iva` DECIMAL(10, 2) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contratoId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id_acuerdo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_acuerdoId_fkey` FOREIGN KEY (`acuerdoId`) REFERENCES `Acuerdos`(`id_acuerdo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
