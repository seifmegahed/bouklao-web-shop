import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { customerTable } from "../customer/schema";
import { sql } from "drizzle-orm";
import { addressTable } from "../address/schema";

export const orderTable = pgTable("order", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customerTable.id),
  total: integer("total").notNull(),
  status: integer("status").notNull(),

  shippingAddressId: integer("shipping_address_id")
    .references(() => addressTable.id)
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
