//NOTE: Create a separate schema for discount seasons

import {primaryKey , integer, pgTable, boolean, varchar, decimal, timestamp, smallint, text } from "drizzle-orm/pg-core";


const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};


//----------------------------------Categories Tables----------------------------------//


export const primaryCategoriesTable = pgTable(
    "primary_categories",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 255 }).unique().notNull(),
        image_url: varchar({ length: 255 }),
        ...timestamps
    }
)

export const secondaryCategoriesTable = pgTable(
    "secondary_categories",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        primary_id: integer("primary_id").references(() => primaryCategoriesTable.id).notNull(),
        name: varchar({ length: 255 }).unique().notNull(),
        image_url: varchar({ length: 255 }),
        ...timestamps
    }
)

export const terciaryCategoriesTable = pgTable(
    "terciary_categories",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        secondary_id: integer("secondary_id").references(() => secondaryCategoriesTable.id).notNull(),
        name: varchar({ length: 255 }).unique().notNull(),
        image_url: varchar({ length: 255 }),
        ...timestamps
    }
)


//----------------------------------Independent Tables----------------------------------//


//Example, in Samsung Galaxy S10 Pro, the collection is Galaxy
export const collectionsTable = pgTable(
    "collections",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 255 }).unique().notNull(),
        description: text().notNull(),
        image_url: varchar({ length: 255 }),
        ...timestamps
    }
)

//Example, in Samsung Galaxy S10 Pro, the brand is Samsung
export const brandsTable = pgTable(
    "brands",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 255 }).unique().notNull(),
        website: varchar({ length: 255 }).notNull(),
        image_url: varchar({ length: 255 }),
        summary: text(),
        ...timestamps
    }
);


//----------------------------------Product Tables----------------------------------//

//Example, in Samsung Galaxy S10 Pro, the model is Galaxy S10
export const modelsTable = pgTable(
    "models",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 255 }).unique().notNull(),
        brand_id: integer("brand_id").references(() => brandsTable.id).notNull(),
        collection_id: integer("collection_id").references(() => collectionsTable.id).notNull(),
        primary_category_id: integer("primary_category_id").references(() => primaryCategoriesTable.id).notNull(),
        secondary_category_id: integer("secondary_category_id").references(() => secondaryCategoriesTable.id).notNull(),
        terciary_category_id: integer("terciary_category_id").references(() => terciaryCategoriesTable.id).notNull(),
        ...timestamps
    }
)

//Example, in Samsung Galaxy S10 Pro, the product is Pro
export const productsTable = pgTable(
    "model_products",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        model_id: integer("model_id").references(() => modelsTable.id).notNull(),
        name: varchar({ length: 255 }),
        description: text(),
        ...timestamps
    }
)

//Example, in Samsung Galaxy S10 Pro, the Version is relative to different colors and/or capacity

export const VersionsTable = pgTable(
    "product_versions",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        product_id: integer("product_id").references(() => productsTable.id).notNull(),
        name: varchar({ length: 255 }),
        subname: varchar({ length: 255 }),
        price: decimal({ precision: 6, scale: 2 }).notNull(),
        discount: smallint().notNull(),
        stock: smallint().notNull(),
        details: text(),
        publish: boolean().notNull(),
        ...timestamps
    })

export const productImagesTable = pgTable(
    "product_images",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        image_url: varchar({ length: 255 }).notNull(), //Image url is on an external service
        ...timestamps
    }
)

export const productDescriptionsTable = pgTable(
    "product_descriptions",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        title: varchar({ length: 255 }).notNull(),
        description_md: text().notNull(),
        ...timestamps
    }
)


//----------------------------------Relational Tables----------------------------------//


export const descriptionToVersionsTable = pgTable(
    "description_to_versions",
    {
        description_id: integer("description_id").references(() => productDescriptionsTable.id).notNull(),
        version_id: integer("version_id").references(() => VersionsTable.id).notNull(),
        ...timestamps
    },
    (table) => [
        primaryKey({columns: [table.description_id, table.version_id]})
    ]
)

export const imageToVersionsTable = pgTable(
    "image_to_versions",
    {
        version_id: integer("version_id").references(() => VersionsTable.id).notNull(),
        image_id: integer("image_id").references(() => productImagesTable.id).notNull(),
        index: smallint().notNull(),
        ...timestamps
    },
    (table) => [
        primaryKey({columns: [table.version_id, table.image_id]})
    ]
)