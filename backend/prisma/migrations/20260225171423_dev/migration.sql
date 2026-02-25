-- AlterTable
ALTER TABLE "products" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE;

-- CreateTable
CREATE TABLE "warehouse_product" (
    "warehouse_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "warehouse_product_pkey" PRIMARY KEY ("warehouse_id","product_id")
);

-- AddForeignKey
ALTER TABLE "warehouse_product" ADD CONSTRAINT "warehouse_product_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse_product" ADD CONSTRAINT "warehouse_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
