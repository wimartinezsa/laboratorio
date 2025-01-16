/*
  Warnings:

  - You are about to drop the column `rango_biologico` on the `examenes` table. All the data in the column will be lost.
  - You are about to drop the column `resultado` on the `examenes` table. All the data in the column will be lost.
  - You are about to drop the column `unidades` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `rango_biologico` to the `tipos_resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidades` to the `tipos_resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `rango_biologico`,
    DROP COLUMN `resultado`,
    DROP COLUMN `unidades`;

-- AlterTable
ALTER TABLE `tipos_resultados` ADD COLUMN `rango_biologico` VARCHAR(20) NOT NULL,
    ADD COLUMN `unidades` VARCHAR(30) NOT NULL;
