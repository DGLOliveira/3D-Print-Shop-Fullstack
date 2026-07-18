import { eq, lt, gte, ne } from 'drizzle-orm';
import cloudinary from "../lib/cloudinary.lib.js";
import { db } from "../db/index.ts";
import { brandsTable } from "../db/schema/products.schema.ts";

const UPLOADER_OPTIONS = {
    resource_type: "image",
    folder: "3D Print Shop/Brands",
    transformation: [{ fetch_format: "auto", quality: "auto", force_strip: true }]
};

function formatData(data) {
    const formattedData = {
        id: data[0].id,
        name: data[0].name,
        website: data[0].website,
        summary: data[0].summary,
        image_url: data[0].image_url
    }
    return formattedData;
}

export const getAllBrands = async (req, res) => {
    try {
        const result = await db.select().from(brandsTable);
        const formattedBrands = result.map((brand) => formatData([brand]));
        return res.status(200).json({ success: true, data: formattedBrands });
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
    const newBrand = { name, website, summary, image_url: "", image_public_id: "" };
    try {
        //Check if logo was sent, if so, upload it
        if (logo !== "") {
            const url = await cloudinary.uploader.upload(logo, UPLOADER_OPTIONS);
            console.log(url)
            newBrand.image_url = url.secure_url;
            newBrand.image_public_id = url.public_id;
        }
        const result = await db.insert(brandsTable).values(newBrand).returning();
        return res.status(201).json({ success: true, message: "Brand created successfully", data: formatData(result) });
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
            await cloudinary.uploader.destroy(prevData[0].public_id);
            const url = await cloudinary.uploader.upload(logo, UPLOADER_OPTIONS);
            updatedBrand.image_url = url.secure_url;
            updatedBrand.image_public_id = url.public_id;
        }
        updatedBrand.image_public_id = prevData[0].public_id;
        //Update brand
        const result = await db.update(brandsTable).set(updatedBrand).where(eq(brandsTable.id, id)).returning();
        return res.status(200).json({ success: true, message: "Brand updated successfully", data: formatData(result) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const prevEntry = await db.select().from(brandsTable).where(eq(brandsTable.id, id));
        await cloudinary.uploader.destroy(prevEntry[0].image_public_id);
        const result = await db.delete(brandsTable).where(eq(brandsTable.id, id));
        return res.status(204);
    } catch (error) {
        console.log(error)
        if (error.cause) {
            if (error.cause.detail.includes("models")) {
                return res.status(409).json({ success: false, message: "Cannot delete Brand with associated Products" });
            }
        }
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
