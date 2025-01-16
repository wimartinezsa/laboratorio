/*
  Warnings:

  - You are about to drop the column `edad_persona` on the `facturas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `edad_persona` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `facturas` DROP COLUMN `edad_persona`;
