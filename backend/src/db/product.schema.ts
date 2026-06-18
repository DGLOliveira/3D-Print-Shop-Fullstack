//NOTE: Create a separate schema for discount seasons

import { sql } from "drizzle-orm";
import { integer, pgTable, boolean, varchar, decimal, timestamp, smallint, check, text, pgEnum } from "drizzle-orm/pg-core";

export const productCreativeCommonsEnum = pgEnum("creative_commons", ["BY", "BY-SA", "BY-ND"]);
//"BY-NC", "BY-NC-SA", "BY-NC-ND" creative commons licences are not allowed, as they are for non-commercial use only

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};

//----------------------------------Stand Alone Tables----------------------------------//

//Table for the different materials and colors of products
export const materialsTable = pgTable(
    "materials", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    color: varchar({ length: 255 }).notNull(),
    supplier: varchar({ length: 255 }).notNull(),
    cost_kg: decimal({ precision: 6, scale: 2 }).notNull(),
    description: text(),
    ...timestamps
    }
);

//Table for the different categories of products, to facilitate search 
export const categoryTable = pgTable(
    "categories",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 255 }).unique().notNull(),
        ...timestamps
    }
)

//Table for season list

export const seasonsTable = pgTable(
    "seasons",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 255 }).unique().notNull(),
        start_date: timestamp().notNull(),
        end_date: timestamp().notNull(),
        ...timestamps
    }
)

//Table for all unique products
export const productsListTable = pgTable(
    "products",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        stripe_product_id: varchar({ length: 255 }).unique().notNull(),
        name: varchar({ length: 255 }).unique().notNull(),
        size_ratio_xyz: varchar({ length: 255 }).notNull(),
        description: text(),
        author_source: varchar({ length: 255 }).notNull(),
        creativecommons_url: productCreativeCommonsEnum().notNull(),
        
        ...timestamps
    }
);

//----------------------------------Linked Tables----------------------------------//

//Table for product images, many images for one product
export const productImagesTable = pgTable(
    "product_images", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    image_url: varchar({ length: 255 }).notNull(), //Image url is on an external service
    index: smallint().notNull(),
    ...timestamps
    }
);

//Table for 3D models used in preview, only one model per product
export const productModelsTable = pgTable(
    "product_models", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    model_url: varchar({ length: 255 }).notNull(), //Model url is on an external service
    ...timestamps
    }
);

//Table for product variants and their prices, for multiple variants of the same product
export const productVariantsTable = pgTable(
    "product_variants", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    material_id: integer("material_id").references(() => materialsTable.id).notNull(),
    upper_size_ratio_cm: smallint().notNull(), //The size of the biggest side of the product in centimeters, used to calculate the size of the product in conjunction with the size_ratio_xyz
    weight_grams: smallint().notNull(), //Weight in grams
    quality_micron: smallint().notNull(), //Quality in microns
    avg_production_time_mint: smallint().notNull(), //Average production time in minutes
    ...timestamps
    }
)

//Table for product inventory, also acts as a log of changes since product creation
export const productsInventoryTable = pgTable(
    "product_inventory", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    variant_id: integer("variant_id").references(() => productVariantsTable.id).notNull(),
    sold_price: decimal({ precision: 6, scale: 2 }), //The price at which the product was sold, in order to account for discounts and price changes, null if not sold
    discount: smallint().notNull(), //Discount in percent
    ...timestamps,
    deleted_at: timestamp(), //Soft delete
    }
);

//Table for product discounts, can be used in conjunction with seasonal discounts
export const productsDiscountTable = pgTable(
    "product_discounts", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    variant_id: integer("variant_id").references(() => productVariantsTable.id).notNull(),
    discount: smallint().notNull(), //Discount in percent
    is_seasonal: boolean().notNull(),
    season_id: integer("season_id").references(() => seasonsTable.id).notNull(),
    ...timestamps,
    deleted_at: timestamp(), //Soft delete
    }
)