/*
  Warnings:

  - Added the required column `grupo` to the `Parametros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parametros` ADD COLUMN `grupo` ENUM('Eritrograma', 'Leucograma', 'Fisico_Quimico', 'Microscopico', 'Examen_en_fresco', 'Urocultivo', 'Antibiograma', 'Cultivo_de_germenes_comunes') NOT NULL;
