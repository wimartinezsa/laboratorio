-- AlterTable
ALTER TABLE `usuarios` MODIFY `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo', 'Auxiliar', 'Invitado') NOT NULL;
