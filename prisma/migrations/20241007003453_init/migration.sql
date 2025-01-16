/*
  Warnings:

  - You are about to alter the column `resultado` on the `resultados` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to drop the column `valor` on the `tarifas` table. All the data in the column will be lost.
  - Added the required column `precio` to the `resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profesional` to the `resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resultados` ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `profesional` INTEGER NOT NULL,
    MODIFY `resultado` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `tarifas` DROP COLUMN `valor`,
    ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;
