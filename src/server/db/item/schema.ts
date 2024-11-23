import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { categoryTable } from "@/server/db/category/schema";
import { sql } from "drizzle-orm";

export const itemTable = pgTable("item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categoryTable.id),
  price: numeric("price", { precision: 8, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 256 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
