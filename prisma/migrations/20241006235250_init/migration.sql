/*
  Warnings:

  - You are about to drop the column `resultado` on the `tarifas` table. All the data in the column will be lost.
  - Added the required column `tarifa` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_resultado_fkey`;

-- AlterTable
ALTER TABLE `resultados` ADD COLUMN `tarifa` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tarifas` DROP COLUMN `resultado`;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_tarifa_fkey` FOREIGN KEY (`tarifa`) REFERENCES `Tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;
