/*
  Warnings:

  - You are about to drop the column `tarifa` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `detalle_servicio` on the `resultados` table. All the data in the column will be lost.
  - You are about to drop the `detalles_servicios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fecha_muestra` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detalles_servicios` DROP FOREIGN KEY `detalles_servicios_examen_fkey`;

-- DropForeignKey
ALTER TABLE `detalles_servicios` DROP FOREIGN KEY `detalles_servicios_servicio_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_tarifa_fkey`;

-- DropForeignKey
ALTER TABLE `resultados` DROP FOREIGN KEY `resultados_detalle_servicio_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `tarifa`;

-- AlterTable
ALTER TABLE `resultados` DROP COLUMN `detalle_servicio`,
    ADD COLUMN `fecha_muestra` DATE NOT NULL,
    MODIFY `valor` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `detalles_servicios`;
