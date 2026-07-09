//NOTE: Create a separate schema for discount seasons

import { sql } from "drizzle-orm";
import { integer, pgTable, boolean, varchar, decimal, timestamp, smallint, check, text, pgEnum, unique } from "drizzle-orm/pg-core";
import { materialsTable } from "./materials.schema.js";

//Hardcoded enums, no expectation of future changes
export const productCreativeCommonsEnum = pgEnum("creative_commons", ["BY", "BY-SA", "BY-ND"]);
//"BY-NC", "BY-NC-SA", "BY-NC-ND" creative commons licences are not allowed, as they are for non-commercial use only

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};

//----------------------------------Stand Alone Tables----------------------------------//


//Table for the different categories of products, to facilitate search 
export const productTagsTable = pgTable(
    "product_tags",
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
        is_published: boolean().notNull(),
        size_ratio_xyz: varchar({ length: 255 }).notNull(),
        description: text(),
        author_source: varchar({ length: 255 }).notNull(),
        creativecommons_url: productCreativeCommonsEnum().notNull(),
        ...timestamps
    }
);

//----------------------------------Linked Tables----------------------------------//


//Table for product variants and their prices, for multiple variants of the same product
export const productVariantsTable = pgTable(
    "product_variants", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    material_id: integer("material_id").references(() => materialsTable.id).notNull(),
    is_published: boolean().notNull(),
    is_price_manual: boolean().notNull(), //Determines if the price is manually set or automatically calculated
    price: decimal({ precision: 6, scale: 2 }),
    upper_size_ratio_mm: smallint().notNull(), //The size of the biggest side of the product in millimeters, used to calculate the size of the product in conjunction with the size_ratio_xyz
    weight_grams: smallint().notNull(), //Weight in grams
    quality_micron: smallint().notNull(), //Quality in micrometers
    avg_production_time_mint: smallint().notNull(), //Average production time in minutes
    ...timestamps
    },
    (table) => [
        unique().on(table.product_id, table.material_id, table.quality_micron, table.upper_size_ratio_mm), //Only one variant for each product, material and quality combination
        check("valid_price", sql`${table.price} > 0 AND ${table.price} IS NOT NULL`),
    ],
)

//Table for product images, many images for one product variant
export const productImagesTable = pgTable(
    "product_images", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    variant_id: integer("variant_id").references(() => productVariantsTable.id).notNull(),
    image_url: varchar({ length: 255 }).unique().notNull(), //Image url is on an external service
    index: smallint().notNull(),
    is_thumbnail: boolean().notNull(), //Determines if the image is the preview image used for the store list
    ...timestamps
    },
    (table) => [
        unique().on(table.id, table.image_url), //Prevent duplicate images
    ]
);

//Table for 3D models used in preview, only one model per product
export const productModelsTable = pgTable(
    "product_models", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    model_url: varchar({ length: 255 }).unique().notNull(), //Model url is on an external service
    ...timestamps
    },
    (table) => [
        unique().on(table.product_id, table.model_url), //Only one model per product
    ]
);

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

//Table for relationship between product tags and products
export const productsTagsTable = pgTable(
    "product_tags", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    product_id: integer("product_id").references(() => productsListTable.id).notNull(),
    tag_id: integer("tag_id").references(() => productTagsTable.id).notNull(),
    ...timestamps
    }
)