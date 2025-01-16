/*
  Warnings:

  - The values [Cobrado] on the enum `facturas_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `facturas` MODIFY `estado` ENUM('Solicitud', 'Facturado', 'Cancelado', 'Anulado') NOT NULL DEFAULT 'Solicitud';
