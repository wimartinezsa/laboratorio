/*
  Warnings:

  - You are about to drop the column `metodo` on the `tipos_resultados` table. All the data in the column will be lost.
  - You are about to drop the column `rango_biologico` on the `tipos_resultados` table. All the data in the column will be lost.
  - You are about to drop the column `unidades` on the `tipos_resultados` table. All the data in the column will be lost.
  - Added the required column `metodo` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rango_biologico` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidades` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `metodo` VARCHAR(30) NOT NULL,
    ADD COLUMN `rango_biologico` VARCHAR(20) NOT NULL,
    ADD COLUMN `unidades` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `tipos_resultados` DROP COLUMN `metodo`,
    DROP COLUMN `rango_biologico`,
    DROP COLUMN `unidades`;
