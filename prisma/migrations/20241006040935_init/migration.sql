/*
  Warnings:

  - The primary key for the `examenes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_axamen` on the `examenes` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_resultado` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `id_examen` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examen` to the `tipo_resultado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detalles_servicios` DROP FOREIGN KEY `detalles_servicios_examen_fkey`;

-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_tipo_resultado_fkey`;

-- AlterTable
ALTER TABLE `examenes` DROP PRIMARY KEY,
    DROP COLUMN `id_axamen`,
    DROP COLUMN `tipo_resultado`,
    ADD COLUMN `id_examen` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_examen`);

-- AlterTable
ALTER TABLE `tipo_resultado` ADD COLUMN `examen` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `detalles_servicios` ADD CONSTRAINT `detalles_servicios_examen_fkey` FOREIGN KEY (`examen`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipo_resultado` ADD CONSTRAINT `tipo_resultado_examen_fkey` FOREIGN KEY (`examen`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;
