import { sql } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const adminTable = pgTable("admin", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),

  lastLogin: timestamp("last_login", { withTimezone: true }),
  lastIp: varchar("last_ip", { length: 256 }),

  failedLoginAttempts: serial("failed_login_attempts").default(0).notNull(),
  blockedUntil: timestamp("blocked_until", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
