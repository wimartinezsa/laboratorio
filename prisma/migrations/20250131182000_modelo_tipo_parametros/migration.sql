-- AlterTable
ALTER TABLE `parametros` ADD COLUMN `tipo_parametroId` INTEGER NULL;

-- CreateTable
CREATE TABLE `tipo_parametros` (
    `id_tipo_parametro` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_tipo_parametro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `parametros` ADD CONSTRAINT `parametros_tipo_parametroId_fkey` FOREIGN KEY (`tipo_parametroId`) REFERENCES `tipo_parametros`(`id_tipo_parametro`) ON DELETE SET NULL ON UPDATE CASCADE;
