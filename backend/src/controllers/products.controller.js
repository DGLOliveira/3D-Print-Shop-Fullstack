
//--------------------------------Products----------------------------------//

export const getAllProducts = async (req, res) => {
    res.send("Get all products");
}

export const getSingleProduct = async (req, res) => {
    res.send("Get single product");
}

export const createProduct = async (req, res) => {
    res.send("Create product");
}

export const updateProduct = async (req, res) => {
    res.send("Update product");
}

export const deleteProduct = async (req, res) => {
    res.send("Delete product");
}

//--------------------------------Product Variants----------------------------------//

export const createVariantOfProduct = async (req, res) => {
    res.send("Create product variant");
}

export const updateVariantOfProduct = async (req, res) => {
    res.send("Update product variant");
}

export const deleteVariantOfProduct = async (req, res) => {
    res.send("Delete product variant");
}

export const getAllVariantsOfProduct = async (req, res) => {
    res.send("Get all product variants");
}

//------------------------------Product Inventory--------------------------------//

export const createProductInventory = async (req, res) => {
    res.send("Create product inventory");
}

export const updateProductInventory = async (req, res) => {
    res.send("Update product inventory");
}
export const deleteProductInventory = async (req, res) => {
    res.send("Delete product inventory");
}

//---------------------------------Product Tags----------------------------------//

export const createProductTag = async (req, res) => {
    res.send("Create product tag");
}

export const updateProductTag = async (req, res) => {
    res.send("Update product tag");
}

export const deleteProductTag = async (req, res) => {
    res.send("Delete product tag");
}