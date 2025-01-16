/*
  Warnings:

  - You are about to drop the column `paqueteId` on the `acuerdos` table. All the data in the column will be lost.
  - You are about to drop the column `paqueteId` on the `prestaciones` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the `paquetes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `procedimientoId` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedimientoId` to the `prestaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicioId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_paqueteId_fkey`;

-- DropForeignKey
ALTER TABLE `paquetes` DROP FOREIGN KEY `paquetes_procedimientoId_fkey`;

-- DropForeignKey
ALTER TABLE `paquetes` DROP FOREIGN KEY `paquetes_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `prestaciones` DROP FOREIGN KEY `prestaciones_paqueteId_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `paqueteId`,
    ADD COLUMN `procedimientoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `prestaciones` DROP COLUMN `paqueteId`,
    ADD COLUMN `procedimientoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `nombre`,
    ADD COLUMN `servicioId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `paquetes`;

-- AddForeignKey
ALTER TABLE `prestaciones` ADD CONSTRAINT `prestaciones_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
