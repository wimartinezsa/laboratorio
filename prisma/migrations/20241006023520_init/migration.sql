/*
  Warnings:

  - The primary key for the `detalles_servicios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_axamen` on the `detalles_servicios` table. All the data in the column will be lost.
  - You are about to drop the column `grupo` on the `examenes` table. All the data in the column will be lost.
  - You are about to drop the `grupos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_detalle_servicio` to the `detalles_servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_examen` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_grupo_fkey`;

-- AlterTable
ALTER TABLE `detalles_servicios` DROP PRIMARY KEY,
    DROP COLUMN `id_axamen`,
    ADD COLUMN `id_detalle_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_detalle_servicio`);

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `grupo`,
    ADD COLUMN `tipo_examen` INTEGER NOT NULL;

-- DropTable
DROP TABLE `grupos`;

-- CreateTable
CREATE TABLE `detalles_procedimientos` (
    `id_detalle_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `procedimiento` INTEGER NOT NULL,
    `detalle_servicio` INTEGER NOT NULL,

    PRIMARY KEY (`id_detalle_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_Examenes` (
    `id_tipo_examen` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_tipo_examen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalles_procedimientos` ADD CONSTRAINT `detalles_procedimientos_procedimiento_fkey` FOREIGN KEY (`procedimiento`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalles_procedimientos` ADD CONSTRAINT `detalles_procedimientos_detalle_servicio_fkey` FOREIGN KEY (`detalle_servicio`) REFERENCES `detalles_servicios`(`id_detalle_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_tipo_examen_fkey` FOREIGN KEY (`tipo_examen`) REFERENCES `tipos_Examenes`(`id_tipo_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;
