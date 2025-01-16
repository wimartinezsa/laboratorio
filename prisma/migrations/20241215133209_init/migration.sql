/*
  Warnings:

  - You are about to drop the column `estado` on the `parametros` table. All the data in the column will be lost.
  - Added the required column `estado` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parametros` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `resultados` ADD COLUMN `estado` ENUM('Pendiente', 'Finalizado') NOT NULL;
