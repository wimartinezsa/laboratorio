-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `finalidadId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_finalidadId_fkey` FOREIGN KEY (`finalidadId`) REFERENCES `finalidad`(`id_finalidad`) ON DELETE SET NULL ON UPDATE CASCADE;
