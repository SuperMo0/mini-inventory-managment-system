-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "location" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);
