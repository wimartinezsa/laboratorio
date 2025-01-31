-- AlterTable
ALTER TABLE `parametros` ADD COLUMN `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo';
