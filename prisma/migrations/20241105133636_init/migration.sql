/*
  Warnings:

  - You are about to drop the `rango_biologicos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `valor_referencia` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rango_biologicos` DROP FOREIGN KEY `rango_biologicos_procedimientoId_fkey`;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `valor_referencia` VARCHAR(80) NOT NULL;

-- DropTable
DROP TABLE `rango_biologicos`;
