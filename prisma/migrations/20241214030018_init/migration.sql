/*
  Warnings:

  - You are about to drop the column `unidad` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `valor_referencia` on the `procedimientos` table. All the data in the column will be lost.
  - Added the required column `unidad` to the `Parametros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_referencia` to the `Parametros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parametros` ADD COLUMN `unidad` VARCHAR(30) NOT NULL,
    ADD COLUMN `valor_referencia` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `unidad`,
    DROP COLUMN `valor_referencia`;
