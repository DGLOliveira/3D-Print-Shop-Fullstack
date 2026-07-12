
import { db } from "../db/index.ts";
import cloudinary from "../lib/cloudinary.lib.js";
import { accessoriesTable, accessoriesImagesTable, accessoriesCategoryTable, accessoriesSubCategoryTable } from "../db/schema/accessories.schema.ts";
import { eq } from "drizzle-orm";



function formatAccessoriesCategories(result) {
    const formattedResult = {};
    result.forEach((category) => {
        if (!formattedResult[category.accessories_categories.name]) {
            formattedResult[category.accessories_categories.name] = {
                id: category.accessories_categories.id,
                subcategories: {},
            }
        }
        if (category.accessories_sub_categories) {
            formattedResult[category.accessories_categories.name] = {
                ...formattedResult[category.accessories_categories.name],
                subcategories: {
                    ...formattedResult[category.accessories_categories.name].subcategories,
                    [category.accessories_sub_categories.name]: {
                        id: category.accessories_sub_categories.id
                    }
                }
            }
        }
    })
    return formattedResult
}

export const getAllAccessoriesCategories = async (req, res) => {
    try {
        const result = await db.select().from(accessoriesCategoryTable).leftJoin(accessoriesSubCategoryTable, eq(accessoriesCategoryTable.id, accessoriesSubCategoryTable.categoryId));
        return res.status(200).json({ success: true, data: formatAccessoriesCategories(result) });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createAccessoryCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await db.insert(accessoriesCategoryTable).values({ name }).returning();
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateAccessoryCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db.update(accessoriesCategoryTable).set({ name }).where(eq(accessoriesCategoryTable.id, id)).returning();
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteAccessoryCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(accessoriesCategoryTable).where(eq(accessoriesCategoryTable.id, id)).returning();
        return res.status(204).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        if (error.cause.detail.includes("accessories_sub_categories")) {
            return res.status(400).json({ success: false, message: "Cannot delete category with associated subcategories" });
        }
        if (error.cause.detail.includes("accessories")) {
            return res.status(400).json({ success: false, message: "Cannot delete category with associated accessories" });
        }
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createSubAccessoryCategory = async (req, res) => {
    const { name, categoryId } = req.body;
    try {
        const result = await db.insert(accessoriesSubCategoryTable).values({ name, categoryId }).returning();
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateSubAccessoryCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db.update(accessoriesSubCategoryTable).set({ name }).where(eq(accessoriesSubCategoryTable.id, id)).returning();
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteSubAccessoryCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.delete(accessoriesSubCategoryTable).where(eq(accessoriesSubCategoryTable.id, id)).returning();
        return res.status(204).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        if (error.cause.detail.includes("accessories")) {
            return res.status(400).json({ success: false, message: "Cannot delete subcategory with associated accessories" });
        }
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllAccessoryImagesByAccessoryId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.select().from(accessoriesImagesTable).where(eq(accessoriesImagesTable.accessoryId, id));
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const uploadAccessoryImage = async (req, res) => {
    const { id } = req.params;
    const { image, index } = req.body;
    console.log(req.body)
    try {
        //Note: While inneficient, it is necessary to make multiple queries in order to guarantee that the image will be registered in the database, and not only in the cloudinary service
        //check if image name is unique
        /*const find = await db.select().from(accessoriesImagesTable).where(eq(accessoriesImagesTable.name, name));
        if (find.length > 0) {
            return res.status(400).json({ success: false, message: "Image name already exists" });
        }
        //check if accessoryId exists
        const accessory = await db.select().from(accessoriesTable).where(eq(accessoriesTable.id, id));
        if (accessory.length === 0) {
            return res.status(400).json({ success: false, message: "Accessory not found" });
        }*/
        //upload image
        const url = await cloudinary.uploader.upload(image);
        console.log(url)
        const newImage = {
            image_url: url.secure_url,
            accessoryId: id,
            index: index
        };
        const result = await db.insert(accessoriesImagesTable).values(newImage).returning();
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteAccessoryImage = async (req, res) => {
    const { id } = req.params;
    const { image_url } = req.body;
    try {
        await cloudinary.uploader.destroy(image_url);
        const result = await db.delete(accessoriesImagesTable).where(eq(accessoriesImagesTable.id, id)).returning();
        return res.status(204).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//TODO Get by pagination and get thubnail image
export const getAllAccessories = async (req, res) => {
    try {
        const result = await db.select().from(accessoriesTable);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//TODO Also get the accessories images
export const getSingleAccessoryById = async (req, res) => {
    try {
        const result = await db.select().from(accessoriesTable).where(eq(accessoriesTable.id, req.params.id));
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Accessory not found" });
        }
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//In order to create an accessory from scratch, we need to create a category first if missing, then create the accessory, and finally upload the images  
//these steps will be done in separate controllers in order to provide feedback to the user if something goes wrong and during which step the error occurred
//this is not the most efficient way to do it, but it is the most secure, and the tradeoff is ideal since we want to provide feedback to the employee, and the process wont be done regularly, so it wont have a significant impact

export const createAccessory = async (req, res) => {
    const { name, subname, grouping, description, categoryId, subcategoryId, brandId, price, discount, stock, publish } = req.body;
    const newAccessory = {}
    console.log(req.body)
    //Check if all required fields are present
    /*if (!name || !subname || !grouping || !description || !subcategoryId || !brandId || !price || !discount || !stock) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }*/
    //TODO validate data
    newAccessory.name = name;
    newAccessory.subname = subname;
    newAccessory.grouping = grouping;
    newAccessory.description = description;
    newAccessory.categoryId = categoryId;
    newAccessory.subcategoryId = subcategoryId;
    newAccessory.brandId = brandId;
    newAccessory.price = price;
    newAccessory.discount = discount;
    newAccessory.stock = stock;
    newAccessory.publish = publish;
    try {
        const result = await db.insert(accessoriesTable).values(newAccessory).returning();
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        console.log(error.cause.detail)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateAccessory = async (req, res) => {
    const { id } = req.params;
    const { name, description, subcategoryId, brandId, price, discount, stock } = req.body;
    try {
        const result = await db.update(accessoriesTable).set({ name, description, subcategoryId, brandId, price, discount, stock }).where(eq(accessoriesTable.id, id)).returning();
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//TODO: Delete accessory and images
export const deleteAccessory = async (req, res) => {
    const { id } = req.body;
    try {
        //get all images and delete them from cloudinary
        const images = await db.select().from(accessoriesImagesTable).where(eq(accessoriesImagesTable.accessoryId, id));
        for (let i = 0; i < images.length; i++) {
            await cloudinary.uploader.destroy(images[i].image_url);
        }
        //delete images from db
        await db.delete(accessoriesImagesTable).where(eq(accessoriesImagesTable.accessoryId, id));
        //delete accessory
        const result = await db.delete(accessoriesTable).where(eq(accessoriesTable.id, id)).returning();
        return res.status(204).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};