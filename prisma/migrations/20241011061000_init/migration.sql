/*
  Warnings:

  - You are about to drop the column `prestadorId` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identificacion]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_prestadorId_fkey`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `prestadorId`;

-- CreateTable
CREATE TABLE `_PrestadorToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PrestadorToUsuario_AB_unique`(`A`, `B`),
    INDEX `_PrestadorToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_identificacion_key` ON `usuarios`(`identificacion`);

-- AddForeignKey
ALTER TABLE `_PrestadorToUsuario` ADD CONSTRAINT `_PrestadorToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PrestadorToUsuario` ADD CONSTRAINT `_PrestadorToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
