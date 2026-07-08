import { integer, pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};

export const brandsTable = pgTable(
    "brands", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    website: varchar({ length: 255 }).notNull(),
    logo: varchar({ length: 255 }),
    summary: text(),
    ...timestamps
    }
);
