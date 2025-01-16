-- AlterTable
ALTER TABLE `finalidad` ADD COLUMN `codigo` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `tipo_identificacion` ENUM('CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS') NULL;
