-- CreateTable
CREATE TABLE `Parametros` (
    `id_parametro` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `procedimientoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_parametro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parametros` ADD CONSTRAINT `Parametros_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
