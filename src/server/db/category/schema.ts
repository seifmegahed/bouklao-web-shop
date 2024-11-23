import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
});

