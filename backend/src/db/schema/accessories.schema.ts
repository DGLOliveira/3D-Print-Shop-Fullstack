import { integer, pgTable, pgEnum, varchar, timestamp, text, decimal, smallint, unique, boolean } from "drizzle-orm/pg-core";
import { brandsTable } from "./brands.schema.ts";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};

export const groupings = pgEnum("grouping", ["Standalone", "Pieces", "Color", "Weight", "Qualitative"]);

export const accessoriesCategoryTable = pgTable(
    "accessories_categories", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    ...timestamps
    }
)

export const accessoriesSubCategoryTable = pgTable(
    "accessories_sub_categories", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    categoryId: integer("category_id").references(() => accessoriesCategoryTable.id).notNull(),
    ...timestamps
    }
)

export const accessoriesTable = pgTable(
    "accessories", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(), //If several accessories have the same name, they will be grouped
    subname: varchar({ length: 255 }),
    grouping: groupings().notNull(),
    brandId: integer("brand_id").references(() => brandsTable.id).notNull(),
    categoryId: integer("category_id").references(() => accessoriesCategoryTable.id).notNull(),
    subcategoryId: integer("sub_category_id").references(() => accessoriesSubCategoryTable.id),
    price: decimal({ precision: 6, scale: 2 }).notNull(),
    discount: smallint().notNull(),
    stock: smallint().notNull(),
    description: text(),
    publish: boolean().notNull(),
    ...timestamps
    }
);


export const accessoriesImagesTable = pgTable(
    "accessories_images", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    accessoryId: integer("accessory_id").references(() => accessoriesTable.id).notNull(),
    image_url: varchar({ length: 255 }).notNull(), //Image url is on an external service
    index: smallint().notNull(),
    ...timestamps
    },
    (table) => [
        unique().on(table.accessoryId, table.image_url), //Prevent duplicate images per accessory
    ]
)