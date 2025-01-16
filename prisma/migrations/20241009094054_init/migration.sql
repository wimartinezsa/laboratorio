/*
  Warnings:

  - A unique constraint covering the columns `[identificacion]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `usuarios_identificacion_key` ON `usuarios`(`identificacion`);
