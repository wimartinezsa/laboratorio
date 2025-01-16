/*
  Warnings:

  - Added the required column `observacion` to the `detalles_procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultado` to the `detalles_procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalles_procedimientos` ADD COLUMN `observacion` VARCHAR(200) NOT NULL,
    ADD COLUMN `resultado` VARCHAR(50) NOT NULL;
