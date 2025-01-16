-- CreateTable
CREATE TABLE `Tipo_Resultados` (
    `id_tipo_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `parametroId` INTEGER NOT NULL,

    PRIMARY KEY (`id_tipo_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tipo_Resultados` ADD CONSTRAINT `Tipo_Resultados_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `Parametros`(`id_parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;
