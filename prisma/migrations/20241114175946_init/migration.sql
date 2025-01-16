/*
  Warnings:

  - You are about to drop the `pais` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `departamentos` DROP FOREIGN KEY `departamentos_paisId_fkey`;

-- DropTable
DROP TABLE `pais`;

-- CreateTable
CREATE TABLE `paises` (
    `id_pais` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(5) NOT NULL,
    `nombre` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id_pais`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `departamentos` ADD CONSTRAINT `departamentos_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `paises`(`id_pais`) ON DELETE RESTRICT ON UPDATE CASCADE;
