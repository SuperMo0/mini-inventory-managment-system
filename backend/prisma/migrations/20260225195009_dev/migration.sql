/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `warehouses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_title_key" ON "warehouses"("title");
