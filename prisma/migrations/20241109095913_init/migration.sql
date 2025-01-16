/*
  Warnings:

  - You are about to alter the column `estado` on the `facturas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(12))` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `facturas` MODIFY `estado` ENUM('Reservado', 'Facturado', 'Pagado', 'Anulado') NOT NULL DEFAULT 'Reservado';
