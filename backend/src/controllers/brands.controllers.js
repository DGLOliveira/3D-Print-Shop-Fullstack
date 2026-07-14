import { eq, lt, gte, ne } from 'drizzle-orm';
import cloudinary from "../lib/cloudinary.lib.js";
import { db } from "../db/index.ts";
import { brandsTable } from "../db/schema/products.schema.ts";


export const getAllBrands = async (req, res) => {
    try {
        const result = await db.select().from(brandsTable);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    };
}

export const createBrand = async (req, res) => {
    const { name, logo, summary, website } = req.body;
    if (!name || !website || !logo || !summary) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newBrand = { name, website, summary, image_url: "" };
    try {
        //Check if logo was sent, if so, upload it
        if (logo !== "") {
            const url = await cloudinary.uploader.upload(image);
            newBrand.image_url = url.secure_url;
        }
        const result = await db.insert(brandsTable).values(newBrand).returning();
        return res.status(201).json({ success: true, message: "Brand created successfully", data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name, image_url, summary, website } = req.body;
    if (!name || !website || !image_url || !summary) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const updatedBrand = { name, website, summary, image_url };
    try {
        //Check if there is new logo, if so, delete the previous one and upload the new one
        const prevData = await db.select().from(brandsTable).where(eq(brandsTable.id, id));
        if (image_url !== prevData[0].logo) {
            await cloudinary.uploader.destroy(prevData[0].image_url);
            const url = await cloudinary.uploader.upload(logo);
            updatedBrand.image_url = url.secure_url;
        }
        //Update brand
        const result = await db.update(brandsTable).set(updatedBrand).where(eq(brandsTable.id, id)).returning();
        return res.status(200).json({ success: true, message: "Brand updated successfully", data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const prevImage = await db.select("image_url").from(brandsTable).where(eq(brandsTable.id, id));
        await cloudinary.uploader.destroy(prevImage[0].image_url);
        const result = await db.delete(brandsTable).where(eq(brandsTable.id, id));
        return res.status(200).json({ success: true, message: "Brand deleted successfully" });
    } catch (error) {
        if(error.cause.detail.includes("models")) {
            return res.status(409).json({ success: false, message: "Cannot delete Brand with associated Products" });
        }
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
