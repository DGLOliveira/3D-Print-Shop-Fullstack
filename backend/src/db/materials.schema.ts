
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
    web_url: varchar({ length: 255 }),
    contact_email: varchar({ length: 255 }),
    contact_phone: varchar({ length: 255 }),
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
    current_cost: decimal({ precision: 6, scale: 2 }).notNull(),
    weight_grams: decimal({ precision: 6, scale: 2 }).notNull(),
    thickness: decimal({ precision: 6, scale: 2 }).notNull(),
    length: decimal({ precision: 6, scale: 2 }).notNull(),
    description: text(),
    ...timestamps
    }
);

//Table for inventory of materials
export const materialsInventoryTable = pgTable(
    "materials_inventory", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    material_id: integer("material_id").references(() => materialsTable.id).notNull(),
    initial_quantity_grams: smallint().notNull(),
    bought_price_before_discount: decimal({ precision: 6, scale: 2 }).notNull(),
    current_quantity: smallint().notNull(),
    discount: smallint().notNull(),
    //receipt:
    ...timestamps
    }
);

//Table for the waste log, since every product produced has a certain amount of recyclable waste
export const materialsWasteLogTable = pgTable(
    "materials_waste_log", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    material_id: integer("material_id").references(() => materialsTable.id).notNull(),
    quantity_grams: decimal({ precision: 8, scale: 2 }).notNull(), //The quantity of the waste
    value_grams: decimal({ precision: 8, scale: 2 }).notNull(), //The value of the waste in grams
    recyclable: boolean().notNull(),
    ...timestamps
    }
);