/*
  Warnings:

  - You are about to drop the column `unidades` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `unidad` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `unidades`,
    ADD COLUMN `unidad` VARCHAR(30) NOT NULL;
