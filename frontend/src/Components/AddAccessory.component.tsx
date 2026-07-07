import { useState } from 'react'
import { AddAccessoryCategoryButton } from './modals/AddAccessoryCategoryModal.component'

export const AddAccessoryForm = () => {

    const [accessoryCategory, setAccessoryCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [stock, setStock] = useState(0)
    return (
    <>
        
                    <label htmlFor="add-material">Accessory Category</label>
                    <select id="add-material" name="material" className="select select-bordered w-full max-w-xs text-center" value={accessoryCategory} onChange={(e) => setAccessoryCategory(e.target.value)}>
                        <option disabled selected>Category</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <>
                        <AddAccessoryCategoryButton />
                    </>

        <label htmlFor="add-price"> Price</label>
        <input id="add-price" type="number" step="0.01" placeholder="Price" min="1" className="input input-bordered w-40 max-w-xs text-center" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        <span />

        <label htmlFor="add-discount"> Discount</label>
        <input id="add-discount" type="number" min="0" max="90" step="1" placeholder="Discount%" className="input input-bordered w-40 max-w-xs text-center" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} />
        <span />

        <label htmlFor="add-stock"> Stock</label>
        <input id="add-stock" type="number" min="0" step="1" placeholder="Stock" className="input input-bordered w-40 max-w-xs text-center" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} />
        <span />
    </>
    )
}
