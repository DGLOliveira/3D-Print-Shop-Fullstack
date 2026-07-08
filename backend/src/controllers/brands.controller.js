import { eq, lt, gte, ne } from 'drizzle-orm';
import { db } from "../db/index.ts";
import { brandsTable } from "../db/schema/brands.schema.ts";

const isValidURL = (urlString)=> {
      try { 
          return Boolean(new URL(urlString)); 
      }
      catch(e){ 
          return false; 
      }
  }

export const getAllBrands = async (req, res) => {
    try {
        const result = await db.select().from(brandsTable);
        return res.status(200).json({success: true, data: result});
    }catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    };
}

export const getSingleBrandById = async (req, res) => {
    try {
        const result = await db.select().from(brandsTable).where(eq(brandsTable.id, req.params.id));
        if(result.length === 0) {
            return res.status(404).json({success: false, message: "Brand not found"});
        }
        return res.status(200).json({success: true, data: result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const createBrand = async (req, res) => {
    const { name, logo, summary, website } = req.body;
    const newBrand = { };
    if(!name || !website) {
        return res.status(400).json({success: false, message: "Missing required fields"});
    }else{
        newBrand.name = name;
        newBrand.website = website;
    }

        console.log(website)
    //Validate website
    if(isValidURL(website)) {
        return res.status(400).json({success: false, message: "Invalid website url"});
    }
    //Validate logo
    if(logo !== undefined) {
        if(isValidURL(logo)) {
            return res.status(400).json({success: false, message: "Invalid logo url"});
        }else{
            newBrand.logo = logo;
        }
    }
    //Validate summary
    if(summary !== undefined) {
        newBrand.summary = summary;
    }
    try{
        const result = await db.insert(brandsTable).values(newBrand).returning();
        console.log(result);
        return res.status(201).json({success: true, message: "Brand created successfully", data: result});
    }catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const updateBrand = async (req, res) => {
    const { name, logo, summary, website } = req.body;
    const updatedBrand = { };
    if(name) {
        updatedBrand.name = name;
    }
    if(website) {
        if(isValidURL(website)) {
            return res.status(400).json({success: false, message: "Invalid website url"});
        }else{
            updatedBrand.website = website;
        }
    }
    if(logo) {
        if(isValidURL(logo)) {
            return res.status(400).json({success: false, message: "Invalid logo url"});
        }else{
            updatedBrand.logo = logo;
        }
    }
    if(summary) {
        updatedBrand.summary = summary;
    }
    try{
        await db.update(brandsTable).set(updatedBrand).where(eq(brandsTable.id, req.params.id));
        return res.status(200).json({success: true, message: "Brand updated successfully"});
    }catch(error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const deleteBrand = async (req, res) => {
    try{
        const result = await db.delete(brandsTable).where(eq(brandsTable.id, req.params.id));
        return res.status(200).json({success: true, message: "Brand deleted successfully"});
    }catch(error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}
