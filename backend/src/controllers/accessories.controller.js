/*
  const results = await cloudinary.uploader.upload('./images/my_image.jpg');
  console.log(results);
  */

import { db } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";
import { accessoriesTable, accessoriesImagesTable, accessoriesCategoryTable } from "../db/schema/accessories.schema.js";


/* Accessories Base */

//TODO Get by pagination and get thubnail image
export const getAllAccessories = async (req, res) => {
    try {
        const result = await db.select().from(accessoriesTable);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
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
    const { name, description, categoryId, brandId, price, discount, stock } = req.body;
    const newAccessory = {}
    //Check if all required fields are present
    if (!name || !description || !categoryId || !brandId || !price || !discount || !stock || !images) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    //TODO validate data
    newAccessory.name = name;
    newAccessory.description = description;
    newAccessory.categoryId = categoryId;
    newAccessory.brandId = brandId;
    newAccessory.price = price;
    newAccessory.discount = discount;
    newAccessory.stock = stock;
    try {
        const result = await db.insert(accessoriesTable).values(newAccessory).returning();
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateAccessory = async (req, res) => {
    const { id } = req.params;
    const { name, description, categoryId, brandId, price, discount, stock } = req.body;
    try {
        const result = await db.update(accessoriesTable).set({ name, description, categoryId, brandId, price, discount, stock }).where(eq(accessoriesTable.id, id)).returning();
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


export const getAllAccessoriesCategories = async (req, res) => {
    try {
        const result = await db.select().from(accessoriesCategoryTable);
        return res.status(200).json({ success: true, data: result });
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

export const deleteAccessoryCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db.delete(accessoriesCategoryTable).where(eq(accessoriesCategoryTable.id, id)).returning();
        return res.status(204).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

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
    const { name, image, accessoryId, index, is_thumbnail } = req.body;
    try {
        //Note: While inneficient, it is necessary to make multiple queries in order to guarantee that the image will be registered in the database, and not only in the cloudinary service
        //check if image name is unique
        const find = await db.select().from(accessoriesImagesTable).where(eq(accessoriesImagesTable.name, name));
        if (find.length > 0) {
            return res.status(400).json({ success: false, message: "Image name already exists" });
        }
        //check if accessoryId exists
        const accessory = await db.select().from(accessoriesTable).where(eq(accessoriesTable.id, accessoryId));
        if (accessory.length === 0) {
            return res.status(400).json({ success: false, message: "Accessory not found" });
        }
        //upload image
        const url = await cloudinary.uploader.upload(image);
        const newImage = {
            name: name,
            image: url.secure_url,
            accessoryId: accessoryId,
            index: index,
            is_thumbnail: is_thumbnail
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