import { integer, pgTable, varchar, timestamp, text, decimal, smallint, unique, boolean } from "drizzle-orm/pg-core";
import { brandsTable } from "./brands.schema.ts";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};

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
    name: varchar({ length: 255 }).unique().notNull(),
    brandId: integer("brand_id").references(() => brandsTable.id).notNull(),
    subcategoryId: integer("sub_category_id").references(() => accessoriesSubCategoryTable.id).notNull(),
    price: decimal({ precision: 6, scale: 2 }),
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
    name: varchar({ length: 255 }).unique().notNull(),
    accessoryId: integer("accessory_id").references(() => accessoriesTable.id).notNull(),
    image_url: varchar({ length: 255 }).unique().notNull(), //Image url is on an external service
    index: smallint().notNull(),
    is_thumbnail: boolean().notNull(), //Determines if the image is the preview image used for the store list
    ...timestamps
    },
    (table) => [
        unique().on(table.id, table.image_url), //Prevent duplicate images
    ]
)