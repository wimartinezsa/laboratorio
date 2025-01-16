-- AlterTable
ALTER TABLE `prestaciones` ADD COLUMN `fecha_analisis` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo', 'Auxiliar') NOT NULL;
