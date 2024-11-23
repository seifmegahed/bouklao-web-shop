import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { orderTable } from "../order/schema";
import { itemTable } from "../item/schema";
import { sql } from "drizzle-orm";

export const orderItemTable = pgTable("order_item", {
  id: serial("id").primaryKey(),
  orderId: serial("order_id")
    .notNull()
    .references(() => orderTable.id),
  itemId: serial("item_id")
    .notNull()
    .references(() => itemTable.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
