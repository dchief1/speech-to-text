import { pgTable, serial, varchar, text, timestamp, index, integer } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const speechToText = pgTable("speech", {
//   id: serial("id").primaryKey(),
//   userId: serial("user_id")
//     .references(() => user.id)
//     .notNull(),
//   text: text("text").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

export const speechToText = pgTable(
  "speech",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => user.id)
      .notNull(),
    text: text("text").notNull(),
    fileName: varchar("file_name", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  }
);
