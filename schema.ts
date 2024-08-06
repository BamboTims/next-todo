import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todo_table", {
  id: serial("id").primaryKey(),
  task: text("task").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
