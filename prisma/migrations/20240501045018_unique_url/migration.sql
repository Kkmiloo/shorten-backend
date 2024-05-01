/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `URLs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "URLs_shortCode_key" ON "URLs"("shortCode");
