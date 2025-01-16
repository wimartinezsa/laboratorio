/*
  Warnings:

  - You are about to drop the column `acuerdo` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `tarifa` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `tarifas` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `tarifas` table. All the data in the column will be lost.
  - You are about to drop the `acuerdos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tarifa` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrato` to the `Tarifas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicio` to the `Tarifas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_contrato_fkey`;

-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_tarifa_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_acuerdo_fkey`;

-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_tarifa_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `acuerdo`,
    ADD COLUMN `tarifa` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `tarifa`;

-- AlterTable
ALTER TABLE `tarifas` DROP COLUMN `nombre`,
    DROP COLUMN `precio`,
    ADD COLUMN `contrato` INTEGER NOT NULL,
    ADD COLUMN `servicio` INTEGER NOT NULL,
    ADD COLUMN `valor` DECIMAL(10, 2) NOT NULL;

-- DropTable
DROP TABLE `acuerdos`;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_tarifa_fkey` FOREIGN KEY (`tarifa`) REFERENCES `Tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_contrato_fkey` FOREIGN KEY (`contrato`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_servicio_fkey` FOREIGN KEY (`servicio`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
