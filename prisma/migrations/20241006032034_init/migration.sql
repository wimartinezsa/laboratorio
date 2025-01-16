/*
  Warnings:

  - You are about to drop the column `protocolo` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the `protocolos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `valor` to the `detalles_procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad` to the `detalles_servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_servicio` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_protocolo_fkey`;

-- AlterTable
ALTER TABLE `detalles_procedimientos` ADD COLUMN `valor` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `detalles_servicios` ADD COLUMN `cantidad` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `protocolo`,
    ADD COLUMN `tipo_servicio` INTEGER NOT NULL;

-- DropTable
DROP TABLE `protocolos`;

-- CreateTable
CREATE TABLE `tipos_servicios` (
    `id_tipo_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_tipo_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_tipo_servicio_fkey` FOREIGN KEY (`tipo_servicio`) REFERENCES `tipos_servicios`(`id_tipo_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
