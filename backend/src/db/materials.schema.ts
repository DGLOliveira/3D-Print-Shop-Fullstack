
import { integer, pgTable, boolean, varchar, decimal, timestamp, smallint, check, text, pgEnum } from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};


export const materialsSuplierTable = pgTable(
    "materials_suppliers", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    description: text(),
    web_url: varchar({ length: 255 }).notNull(),
    contact_email: varchar({ length: 255 }).notNull(),
    ...timestamps
    }
);

//Table for the different materials and colors of products
export const materialsTable = pgTable(
    "materials", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    color: varchar({ length: 255 }).notNull(),
    supplier: integer("supplier_id").references(() => materialsSuplierTable.id).notNull(),
    cost: decimal({ precision: 6, scale: 2 }).notNull(),
    weight: decimal({ precision: 6, scale: 2 }).notNull(),
    thickness: decimal({ precision: 6, scale: 2 }).notNull(),
    length: decimal({ precision: 6, scale: 2 }).notNull(),
    description: text(),
    ...timestamps
    }
);
