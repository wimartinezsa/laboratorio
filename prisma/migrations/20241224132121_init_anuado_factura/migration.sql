/*
  Warnings:

  - The values [Anulada] on the enum `facturas_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `facturas` MODIFY `estado` ENUM('Pendiente_Emision', 'Factura_Emitida', 'Pendiente_Pago', 'Pagado', 'Anulado') NOT NULL DEFAULT 'Pendiente_Emision';
