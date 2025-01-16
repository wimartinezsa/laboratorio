/*
  Warnings:

  - You are about to drop the column `metodo` on the `procedimientos` table. All the data in the column will be lost.
  - Added the required column `estado` to the `Parametros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodo` to the `Parametros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parametros` ADD COLUMN `estado` ENUM('Pendiente', 'Finalizado') NOT NULL,
    ADD COLUMN `metodo` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `metodo`;
