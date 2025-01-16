/*
  Warnings:

  - You are about to drop the `resultado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `resultado` DROP FOREIGN KEY `resultado_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `resultado` DROP FOREIGN KEY `resultado_parametroId_fkey`;

-- DropTable
DROP TABLE `resultado`;

-- CreateTable
CREATE TABLE `resultados` (
    `id_resultado` INTEGER NOT NULL AUTO_INCREMENT,
    `resultado` VARCHAR(200) NULL,
    `examenId` INTEGER NOT NULL,
    `parametroId` INTEGER NOT NULL,

    UNIQUE INDEX `resultados_examenId_parametroId_key`(`examenId`, `parametroId`),
    PRIMARY KEY (`id_resultado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `Parametros`(`id_parametro`) ON DELETE RESTRICT ON UPDATE CASCADE;
