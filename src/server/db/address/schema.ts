import {
  integer,
  pgTable,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { customerTable } from "../customer/schema";
import { sql } from "drizzle-orm";

export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customerTable.id),

  name: varchar("name", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  addressLine1: varchar("address_line1", { length: 256 }).notNull(),
  addressLine2: varchar("address_line2", { length: 256 }),
  city: smallint("city").notNull(),
  country: smallint("country").notNull(),
  postalCode: varchar("postal_code", { length: 256 }),
  notes: varchar("notes", { length: 256 }),

  createAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
