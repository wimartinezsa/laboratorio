-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `estado_pago` ENUM('Pendiente_Pago', 'Cobro', 'Pagado') NULL DEFAULT 'Pendiente_Pago',
    MODIFY `estado` ENUM('Solicitado', 'En_Toma_de_Muestra', 'Muestra_Recibida', 'En_Proceso_de_Analisis', 'Analisis_Completo', 'Resultados_Listos', 'Resultados_Entregados') NULL DEFAULT 'Solicitado';
