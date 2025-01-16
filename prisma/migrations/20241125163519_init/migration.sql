/*
  Warnings:

  - You are about to alter the column `estado` on the `facturas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(11))` to `Enum(EnumId(8))`.

*/
-- AlterTable
ALTER TABLE `facturas` MODIFY `estado` ENUM('Pendiente_Emision', 'Factura_Emitida', 'Pendiente_Pago', 'Pagado', 'Cancelada') NOT NULL DEFAULT 'Pendiente_Emision';
