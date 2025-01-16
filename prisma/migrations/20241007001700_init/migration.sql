/*
  Warnings:

  - You are about to drop the column `valor_referencia` on the `examenes` table. All the data in the column will be lost.
  - You are about to alter the column `resultado` on the `examenes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(20)`.
  - Added the required column `rango_biologico` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `valor_referencia`,
    ADD COLUMN `rango_biologico` VARCHAR(20) NOT NULL,
    MODIFY `resultado` VARCHAR(20) NOT NULL;
