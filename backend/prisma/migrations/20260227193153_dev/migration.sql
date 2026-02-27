/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "stock_changes" (
    "id" SERIAL NOT NULL,
    "product_title" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "source_warehouse_title" TEXT NOT NULL,
    "destination_warehouse_title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "stock_changes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stock_changes_created_at_idx" ON "stock_changes"("created_at");

-- CreateIndex
CREATE INDEX "stock_changes_source_warehouse_title_idx" ON "stock_changes"("source_warehouse_title");

-- CreateIndex
CREATE INDEX "stock_changes_product_title_idx" ON "stock_changes"("product_title");

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");
