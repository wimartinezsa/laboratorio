/*
  Warnings:

  - Added the required column `estado` to the `prestaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prestaciones` ADD COLUMN `estado` ENUM('Solicitado', 'Confirmado', 'En_Toma_de_Muestra', 'Muestra_Recibida', 'En_Proceso_de_Analisis', 'Analisis_Completo', 'Resultados_Listos', 'Resultados_Entregados') NOT NULL;
