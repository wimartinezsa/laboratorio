-- DropIndex
DROP INDEX `usuarios_identificacion_key` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `identificacion` VARCHAR(20) NOT NULL;
