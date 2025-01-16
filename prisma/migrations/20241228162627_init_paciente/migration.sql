-- DropForeignKey
ALTER TABLE `pacientes` DROP FOREIGN KEY `Pacientes_epsId_fkey`;

-- DropForeignKey
ALTER TABLE `pacientes` DROP FOREIGN KEY `Pacientes_municipioId_fkey`;

-- DropForeignKey
ALTER TABLE `pacientes` DROP FOREIGN KEY `Pacientes_paisId_fkey`;

-- AlterTable
ALTER TABLE `pacientes` MODIFY `fecha_nacimiento` DATE NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `municipioId` INTEGER NULL,
    MODIFY `epsId` INTEGER NULL,
    MODIFY `incapacidad` ENUM('SI', 'NO') NOT NULL DEFAULT 'NO',
    MODIFY `zona` ENUM('01', '02') NULL,
    MODIFY `paisId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `paises`(`id_pais`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacientes` ADD CONSTRAINT `Pacientes_epsId_fkey` FOREIGN KEY (`epsId`) REFERENCES `eps`(`id_eps`) ON DELETE SET NULL ON UPDATE CASCADE;
