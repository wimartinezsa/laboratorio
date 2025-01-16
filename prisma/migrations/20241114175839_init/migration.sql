/*
  Warnings:

  - You are about to drop the column `primer_apellido` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `primer_nombre` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `segundo_apellido` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `segundo_nombre` on the `pacientes` table. All the data in the column will be lost.
  - The values [Femenino,Masculino,Indetermidado] on the enum `Pacientes_sexo` will be removed. If these variants are still used in the database, this will fail.
  - The values [Contributivo,Subsidiado,Vinculado,Particular,Otro] on the enum `Pacientes_tipo_paciente` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `codigo` to the `departamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paisId` to the `departamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Municipios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incapacidad` to the `Pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zona` to the `Pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `departamentos` ADD COLUMN `codigo` VARCHAR(10) NOT NULL,
    ADD COLUMN `paisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `municipios` ADD COLUMN `codigo` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `primer_apellido`,
    DROP COLUMN `primer_nombre`,
    DROP COLUMN `segundo_apellido`,
    DROP COLUMN `segundo_nombre`,
    ADD COLUMN `incapacidad` ENUM('SI', 'No') NOT NULL,
    ADD COLUMN `nombres` VARCHAR(50) NOT NULL,
    ADD COLUMN `paisorigen` VARCHAR(10) NULL,
    ADD COLUMN `zona` ENUM('01', '02') NOT NULL,
    MODIFY `sexo` ENUM('H', 'I', 'M') NOT NULL,
    MODIFY `tipo_paciente` ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13') NOT NULL;

-- CreateTable
CREATE TABLE `pais` (
    `id_pais` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id_pais`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `departamentos` ADD CONSTRAINT `departamentos_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `pais`(`id_pais`) ON DELETE RESTRICT ON UPDATE CASCADE;
