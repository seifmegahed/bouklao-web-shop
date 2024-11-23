import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const customerTable = pgTable("customer", {
  id: serial("id").primaryKey(),

  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),

  email: varchar("email", { length: 256 }),

  lastAddressId: integer("last_address_id"),
  authId: varchar("auth_id", { length: 256 }).unique(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
