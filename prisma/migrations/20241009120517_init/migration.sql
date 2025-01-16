/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pacienteId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_epsId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_municipioId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `usuarioId`,
    ADD COLUMN `pacienteId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `Pacientes` (
    `id_paciente` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_identificacion` ENUM('AS', 'CC', 'CE', 'MV', 'RC', 'TI') NOT NULL,
    `identificacion` BIGINT NOT NULL,
    `primer_nombre` VARCHAR(50) NOT NULL,
    `segundo_nombre` VARCHAR(50) NULL,
    `primer_apellido` VARCHAR(50) NOT NULL,
    `segundo_apellido` VARCHAR(50) NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `sexo` ENUM('Femenino', 'Masculino', 'Indetermidado') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(50) NULL,
    `tipo_paciente` ENUM('Contributivo', 'Subsidiado', 'Vinculado', 'Particular', 'Otro') NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `municipioId` INTEGER NOT NULL,
    `epsId` INTEGER NOT NULL,

    UNIQUE INDEX `Pacientes_identificacion_key`(`identificacion`),
    UNIQUE INDEX `Pacientes_email_key`(`email`),
    PRIMARY KEY (`id_paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_epsId_fkey` FOREIGN KEY (`epsId`) REFERENCES `eps`(`id_eps`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Pacientes`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;
