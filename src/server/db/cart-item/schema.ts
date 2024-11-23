import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { customerTable } from "../customer/schema";
import { itemTable } from "../item/schema";
import { sql } from "drizzle-orm";

export const cartItemTable = pgTable("cart_item", {
  id: serial("id").primaryKey(),
  customerId: serial("customer_id")
    .notNull()
    .references(() => customerTable.id),
  itemId: serial("item_id")
    .notNull()
    .references(() => itemTable.id),
  quantity: integer("quantity").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
