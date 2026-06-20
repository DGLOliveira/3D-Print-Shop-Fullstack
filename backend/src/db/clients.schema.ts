
import { integer, pgTable, boolean, varchar, decimal, timestamp, smallint, check, text, unique } from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
};

export const clientsTable = pgTable(
    "clients", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    adress: varchar({ length: 255 }),
    country: varchar({ length: 255 }),
    postal_code: varchar({ length: 255 }),
    fiscal_number: varchar({ length: 255 }),
    contact_email: varchar({ length: 255 }),
    contact_phone: varchar({ length: 255 }),
    is_collective: boolean().notNull(),
    preferred_contact_method: varchar({ length: 255 }),
    notes: text(),
    ...timestamps
    }
);

//Used to flag contacts by type ie: Pending response, Urgent, etc
export const clientContactFlagsTable = pgTable(
    "client_flags", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    flag: varchar({ length: 255 }).notNull(),
    ...timestamps
    }
);

//Used to tag contacts by type ie: Information, Follow up, Order, etc
export const clientContactTagsTable = pgTable(
    "client_tags", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    ...timestamps
    }
)

export const clientsContactLogTable = pgTable(
    "clients_contact_log", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    client_id: integer("client_id").references(() => clientsTable.id).notNull(),
    contact_date: timestamp().notNull(),
    contact_type: varchar({ length: 255 }).notNull(),
    issue: varchar({ length: 255 }).notNull(),
    summary: text().notNull(),
    record_url: varchar({ length: 255 }).notNull(),
    ...timestamps
    }
);

//Relational table between contacts and flags, many to one
export const clientContactToFlagTable = pgTable(
    "client_contact_flags", 
    {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    contact_id: integer("contact_id").references(() => clientsContactLogTable.id).notNull(),
    flag_id: integer("flag_id").references(() => clientContactFlagsTable.id).notNull(),
    ...timestamps
    },
    (table) => [
        unique().on(table.contact_id, table.flag_id), //Prevent duplicate flags
    ]
);
