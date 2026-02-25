-- This is an empty migration.
alter table warehouse_product
add constraint not_negative check (warehouse_product.quantity >= 0)