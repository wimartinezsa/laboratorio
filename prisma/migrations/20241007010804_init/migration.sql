/*
  Warnings:

  - You are about to drop the column `tecnica` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `metodo` to the `tipos_resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `tecnica`;

-- AlterTable
ALTER TABLE `tipos_resultados` ADD COLUMN `metodo` VARCHAR(30) NOT NULL;
