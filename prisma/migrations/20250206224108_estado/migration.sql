-- AlterTable
ALTER TABLE `facturas` MODIFY `estado` ENUM('Pendiente_Emision', 'Factura_Emitida', 'Pendiente_Pago', 'Cobro', 'Pagado', 'Anulado') NOT NULL DEFAULT 'Pendiente_Emision';
