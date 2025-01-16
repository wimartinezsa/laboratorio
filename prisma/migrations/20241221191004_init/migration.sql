/*
  Warnings:

  - The values [Confirmado] on the enum `examenes_estado` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `grupo` on the `parametros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `examenes` MODIFY `estado` ENUM('Solicitado', 'En_Toma_de_Muestra', 'Muestra_Recibida', 'En_Proceso_de_Analisis', 'Analisis_Completo', 'Resultados_Listos', 'Resultados_Entregados') NOT NULL DEFAULT 'Solicitado';

-- AlterTable
ALTER TABLE `parametros` DROP COLUMN `grupo`;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `metodo` VARCHAR(50) NULL;
