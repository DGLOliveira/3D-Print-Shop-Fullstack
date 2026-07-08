import { db } from "../db/index.ts";
import { brandsTable } from "../db/schema/brands.schema.ts";

export const getAllBrands = async (req, res) => {
    try {
        const result = await db.select().from(brandsTable);
    console.log(result);
    }catch (error) {
        console.log(error);
    };
    res.send("Get all brands");
}

export const getSingleBrand = async (req, res) => {
    res.send("Get single brand");
}

export const createBrand = async (req, res) => {
    res.send("Create brand");
}

export const updateBrand = async (req, res) => {
    res.send("Update brand");
}

export const deleteBrand = async (req, res) => {
    res.send("Delete brand");
}
