import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { itemTable } from "@/server/db/item/schema";

export const imagesTable = pgTable("images", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("image_url", { length: 256 }).notNull(),
  itemId: serial("item_id")
    .notNull()
    .references(() => itemTable.id),
});