import { count, sql } from 'drizzle-orm';
import cloudinary from "../lib/cloudinary.lib.js";
import { db } from "../db/index.ts";
import * as schema from "../db/schema/products.schema.ts";


//TODO
export const getAllProducts = async (req, res) => {
    return res.status(501);
}

export const createModel = async (req, res) => {
    const { name, brand_id, collection_id, primary_category_id, secondary_category_id, terciary_category_id } = req.body;
    if (!name || !brand_id || !collection_id || !primary_category_id || !secondary_category_id || !terciary_category_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newModel = { name, brand_id, collection_id, primary_category_id, secondary_category_id, terciary_category_id };
    try {
        const result = await db.insert(schema.modelsTable).values(newModel).returning();
        return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateModel = async (req, res) => {
    const { id } = req.params;
    const { name, brand_id, collection_id, primary_category_id, secondary_category_id, terciary_category_id } = req.body;
    if (!name || !brand_id || !collection_id || !primary_category_id || !secondary_category_id || !terciary_category_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newModel = { name, brand_id, collection_id, primary_category_id, secondary_category_id, terciary_category_id };
    try {
        const result = await db.update(schema.modelsTable).set(newModel).where(schema.modelsTable.id.eq(id)).returning();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteModel = async (req, res) => {
    const { id } = req.params;
    try {
        await db.delete(schema.modelsTable).where(schema.modelsTable.id.eq(id));
        return res.status(204);
    } catch (error) {
        if (error.cause.detail.includes("products")) {
            return res.status(409).json({ success: false, message: "Cannot delete model with associated products" });
        }
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createProduct = async (req, res) => {
    const { name, description, model_id } = req.body;
    if (!name || !model_id || !description) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newProduct = { name, description, model_id };
    try {
        const result = await db.insert(schema.productsTable).values(newProduct).returning();
        return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, model_id } = req.body;
    if (!name || !model_id || !description) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newProduct = { name, description, model_id };
    try {
        const result = await db.update(schema.productsTable).set(newProduct).where(schema.productsTable.id.eq(id)).returning();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.delete(schema.productsTable).where(schema.productsTable.id.eq(id));
        return res.status(204);
    } catch (error) {
        if (error.cause.detail.includes("versions")) {
            return res.status(409).json({ success: false, message: "Cannot delete product with associated versions" });
        }
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createVersion = async (req, res) => {
    const { name, details, price, discount, stock, publish, product_id } = req.body;
    if (!name || !details || !price || !discount || !stock || !publish || !product_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newVersion = { name, details, price, discount, stock, publish, product_id };
    try {
        const result = await db.insert(schema.versionsTable).values(newVersion).returning();
        return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateVersion = async (req, res) => {
    const { id } = req.params;
    const { name, details, price, discount, stock, publish, product_id } = req.body;
    if (!name || !details || !price || !discount || !stock || !publish || !product_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newVersion = { name, details, price, discount, stock, publish, product_id };
    try {
        const result = await db.update(schema.versionsTable).set(newVersion).where(schema.versionsTable.id.eq(id)).returning();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteVersion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.delete(schema.versionsTable).where(schema.versionsTable.id.eq(id));
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createVersionImage = async (req, res) => {
    const { image, version_id, index } = req.body;
    if (!image || !version_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const url = await cloudinary.uploader.upload(image);
        const imageEntry = await db.insert(schema.versionImagesTable).values({ image_url: url.secure_url, image_public_id: url.public_id }).returning();
        const result = await db.insert(schema.versionsImagesTable).values({ version_id, image_id: imageEntry[0].id, index }).returning();
        return res.status(201).json({ success: true, data: url.secure_url });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateVersionImageIndex = async (req, res) => {
    const { id } = req.params; //Image Id
    const { index } = req.body;
    try {
        await db.update(schema.imageToVersionsTable).set({ index }).where(schema.imageToVersionsTable.image_id.eq(id));
        return res.status(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteVersionImage = async (req, res) => {
    const { id } = req.params; //Image Id
    const { version_id } = req.body;
    try {
        //Remove image relation to version
        await db.delete(schema.imageToVersionsTable).where(schema.imageToVersionsTable.version_id.eq(version_id).and(schema.imageToVersionsTable.image_id.eq(id)));
        //Check if the image has other relations
        const countRelations = await db.select(count()).from(schema.imageToVersionsTable).where(schema.imageToVersionsTable.image_id.eq(id));
        //If it is used only in this version, delete the image from cloudinary
        if (countRelations.count === 0) {
            //fetch the image url and delete from cloudinary
            const image = await db.select().from(schema.versionImagesTable).where(schema.versionImagesTable.id.eq(id));
            await cloudinary.uploader.destroy(image[0].image_public_id);
            await db.delete(schema.versionImagesTable).where(schema.versionImagesTable.id.eq(id));
        }
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createVersionToImageRelation = async (req, res) => {
    const { version_id, image_id } = req.body;
    if (!version_id || !image_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        await db.insert(schema.imageToVersionsTable).values({ version_id, image_id });
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createVersionDescription = async (req, res) => {
    const { description, version_id } = req.body;
    if (!description || !version_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const result = await db.insert(schema.versionsDescriptionsTable).values({ description, version_id });
        await db.insert(schema.descriptionToVersionsTable).values({ description_id: result[0].id, version_id });
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateDescription = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        await db.update(schema.versionsDescriptionsTable).set({ description }).where(schema.versionsDescriptionsTable.id.eq(id));
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteDescription = async (req, res) => {
    const { id, version_id } = req.body;
    try {
        await db.delete(schema.descriptionToVersionsTable).where(schema.descriptionToVersionsTable.version_id.eq(version_id).and(schema.descriptionToVersionsTable.description_id.eq(id)));
        const countRelations = await db.select(count()).from(schema.descriptionToVersionsTable).where(schema.descriptionToVersionsTable.description_id.eq(id));
        if (countRelations.count === 0) {
            await db.delete(schema.versionsDescriptionsTable).where(schema.versionsDescriptionsTable.id.eq(id));
        }
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createDescriptionToVersionRelation = async (req, res) => {
    const { description_id, version_id } = req.body;
    if (!description_id || !version_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        await db.insert(schema.descriptionToVersionsTable).values({ description_id, version_id });
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}