import { eq, lt, gte, ne } from 'drizzle-orm';
import cloudinary from "../lib/cloudinary.lib.js";
import { db } from "../db/index.ts";
import { primaryCategoriesTable, secondaryCategoriesTable, terciaryCategoriesTable } from "../db/schema/products.schema.ts";

// Function to format the categories data into a compressed nested structure for frontend use
function formatCategories(categories) {
    const formattedResult = {};
    categories.forEach((category) => {
        if (!formattedResult[category.primary_categories.name]) {
            formattedResult[category.primary_categories.id] = {
                name: category.primary_categories.id,
                image_url: category.primary_categories.image_url,
                subcategories: {},
            }
        }
        if (category.secondary_categories) {
            formattedResult[category.primary_categories.id] = {
                ...formattedResult[category.primary_categories.id],
                subcategories: {
                    ...formattedResult[category.primary_categories.id].subcategories,
                    [category.secondary_categories.id]: {
                        name: category.secondary_categories.name,
                        image_url: category.secondary_categories.image_url
                    }
                }
            }
        }
        if(category.terciary_categories) {
            formattedResult[category.secondary_categories.id] = {
                ...formattedResult[category.secondary_categories.id],
                subcategories: {
                    ...formattedResult[category.secondary_categories.id].subcategories,
                    [category.terciary_categories.id]: {
                        name: category.terciary_categories.name,
                        image_url: category.terciary_categories.image_url
                    }
                }
            }
        }

    })
    return formattedResult;
}

export const getAllCategories = async (req, res) => {
    try {
        const result = await db.select().from(primaryCategoriesTable).leftJoin(secondaryCategoriesTable, eq(primaryCategoriesTable.id, secondaryCategoriesTable.primary_category_id)).leftJoin(terciaryCategoriesTable, eq(secondaryCategoriesTable.id, terciaryCategoriesTable.secondary_category_id));
        console.log(result)
        const formattedCategories = formatCategories(result);
        return res.status(200).json({ success: true, data: formattedCategories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createPrimaryCategory = async (req, res) => {
    const { name, image } = req.body;
    if (!name || !image) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newCategory = { name, image_url: "" };
    try {
        if (image !== "") {
            const url = await cloudinary.uploader.upload(image);
            newCategory.image_url = url.secure_url;
        }
        const result = await db.insert(primaryCategoriesTable).values(newCategory).returning();
        return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updatePrimaryCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image_url } = req.body;
    if (!name || !image_url) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const updatedCategory = { name, image_url: "" };
    try {
        //Get previous data
        const prevData = await db.select().from(primaryCategoriesTable).where(eq(primaryCategoriesTable.id, id));
        //Check if there is a new image sent, if so, delete the previous one
        if (image_url !== prevData[0].image_url) {
            await cloudinary.uploader.destroy(prevData[0].image_url);
            //Upload new image if any
            if (image_url === "") {
                updatedCategory.image_url = "";
            } else {
                const url = await cloudinary.uploader.upload(image_url);
                updatedCategory.image_url = url.secure_url;
            }
        }
        const result = await db.update(primaryCategoriesTable).set(updatedCategory).where(eq(primaryCategoriesTable.id, id)).returning();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deletePrimaryCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const prevEntry = await db.select("image_url").from(primaryCategoriesTable).where(eq(primaryCategoriesTable.id, id));
        await cloudinary.uploader.destroy(prevEntry[0].image_url);
        await db.delete(primaryCategoriesTable).where(eq(primaryCategoriesTable.id, id));
        return res.status(204);
    } catch (error) {
        if (error.cause.detail.includes("secondary_categories")) {
            return res.status(409).json({ success: false, message: "Cannot delete category with associated subcategories" });
        }else if(error.cause.detail.includes("models")) {
            return res.status(409).json({ success: false, message: "Cannot delete category with associated products" });
        }
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createSecondaryCategory = async (req, res) => {
    const { name, image, parent_id } = req.body;
    if (!name || !image || !parent_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newCategory = { name, image_url: "", primary_id: parent_id };
    try {
        if (image !== "") {
            const url = await cloudinary.uploader.upload(image);
            newCategory.image_url = url.secure_url;
        }
        const result = await db.insert(secondaryCategoriesTable).values(newCategory).returning();
        return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateSecondaryCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image_url } = req.body;
    if (!name || !image_url) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const updatedCategory = { name, image_url: "" };
    try {
        //Get previous data
        const prevData = await db.select().from(secondaryCategoriesTable).where(eq(secondaryCategoriesTable.id, id));
        //Check if there is a new image sent, if so, delete the previous one
        if (image_url !== prevData[0].image_url) {
            await cloudinary.uploader.destroy(prevData[0].image_url);
            //Upload new image if any
            if (image_url === "") {
                updatedCategory.image_url = "";
            } else {
                const url = await cloudinary.uploader.upload(image_url);
                updatedCategory.image_url = url.secure_url;
            }
        }
        const result = await db.update(secondaryCategoriesTable).set(updatedCategory).where(eq(secondaryCategoriesTable.id, id)).returning();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteSecondaryCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const prevEntry = await db.select("image_url").from(secondaryCategoriesTable).where(eq(secondaryCategoriesTable.id, id));
        await cloudinary.uploader.destroy(prevEntry[0].image_url);
        await db.delete(secondaryCategoriesTable).where(eq(secondaryCategoriesTable.id, id));
        return res.status(204);
    } catch (error) {
        if (error.cause.detail.includes("terciary_categories")) {
            return res.status(409).json({ success: false, message: "Cannot delete category with associated subcategories" });
        }else if(error.cause.detail.includes("models")) {
            return res.status(409).json({ success: false, message: "Cannot delete category with associated products" });
        }
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createTerciaryCategory = async (req, res) => {
    const { name, image, parent_id } = req.body;
    if (!name || !image || !parent_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newCategory = { name, image_url: "", secondary_id: parent_id };
    try {
        if (image !== "") {
            const url = await cloudinary.uploader.upload(image);
            newCategory.image_url = url.secure_url;
        }
        const result = await db.insert(terciaryCategoriesTable).values(newCategory).returning();
        return res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateTerciaryCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image_url } = req.body;
    if (!name || !image_url) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const updatedCategory = { name, image_url: "" };
    try {
        //Get previous data
        const prevData = await db.select().from(terciaryCategoriesTable).where(eq(terciaryCategoriesTable.id, id));
        //Check if there is a new image sent, if so, delete the previous one
        if (image_url !== prevData[0].image_url) {
            await cloudinary.uploader.destroy(prevData[0].image_url);
            //Upload new image if any
            if (image_url === "") {
                updatedCategory.image_url = "";
            } else {
                const url = await cloudinary.uploader.upload(image_url);
                updatedCategory.image_url = url.secure_url;
            }
        }
        const result = await db.update(terciaryCategoriesTable).set(updatedCategory).where(eq(terciaryCategoriesTable.id, id)).returning();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteTerciaryCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const prevEntry = await db.select("image_url").from(terciaryCategoriesTable).where(eq(terciaryCategoriesTable.id, id));
        await cloudinary.uploader.destroy(prevEntry[0].image_url);
        await db.delete(terciaryCategoriesTable).where(eq(terciaryCategoriesTable.id, id));
        return res.status(204);
    } catch (error) {
        if(error.cause.detail.includes("models")) {
            return res.status(409).json({ success: false, message: "Cannot delete category with associated products" });
        }
        console.error(error); 
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}