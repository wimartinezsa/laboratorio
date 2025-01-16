/*
  Warnings:

  - You are about to drop the `_prestadortousuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prestadorId` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_prestadortousuario` DROP FOREIGN KEY `_PrestadorToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_prestadortousuario` DROP FOREIGN KEY `_PrestadorToUsuario_B_fkey`;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `prestadorId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_prestadortousuario`;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;
