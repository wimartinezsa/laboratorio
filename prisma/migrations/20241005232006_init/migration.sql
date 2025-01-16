/*
  Warnings:

  - Added the required column `tipo_procedimiento` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `tipo_procedimiento` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tito_procedimiento` (
    `id_tipo_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_tipo_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_tipo_procedimiento_fkey` FOREIGN KEY (`tipo_procedimiento`) REFERENCES `Tito_procedimiento`(`id_tipo_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;
