-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `Estado_Laboratorio` ENUM('Automatico', 'Manual') NOT NULL DEFAULT 'Automatico';
