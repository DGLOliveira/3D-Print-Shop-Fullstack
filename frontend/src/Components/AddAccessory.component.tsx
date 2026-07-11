import { useState, useEffect } from 'react'
import { AccessoryCategoryButtons, AccessoryCategoryModal } from './modals/AccessoryCategoryModal.component'
import { AddAccessorySubCategoryButton, AddAccessorySubCategoryModal } from './modals/AddAccessorySubCategoryModal.component'
import { useAccessoriesStore } from '../stores/useAccessories.store.tsx'

export const AddAccessoryModals = ({modalMode} : {modalMode: string}) => {

    return (
        <>
            <AccessoryCategoryModal modalMode={modalMode} />
            <AddAccessorySubCategoryModal modalMode={modalMode} />
        </>
    )
}

export const AddAccessoryForm = ({modalMode} : {modalMode: string}) => {

    const accessoryStore = useAccessoriesStore();
    const selectedCategoryName = accessoryStore.selectedCategoryName
    const selectedSubcategoryName = accessoryStore.selectedSubcategoryName

    const [accessoryCategory, setAccessoryCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [stock, setStock] = useState(0)


    useEffect(()=>{
        accessoryStore.fetchAccessories()
        accessoryStore.fetchCategories()
    },[])

    useEffect(()=>{
        accessoryStore.selectSubcategory("")
    },[selectedCategoryName])

    return (
        <>

            <label htmlFor="add-accessory-category">Accessory Category</label>
            <select id="accessory-category" name="accessory-category" className="select select-bordered w-full max-w-xs text-center" value={selectedCategoryName} onChange={(e) => accessoryStore.selectCategory(e.target.value)}>
                <option disabled selected value="">Category</option>
                {Object.keys(accessoryStore.categories).map((name, index) => 
                <option key={index} value={name}>{name}</option>
                )}
            </select>
            <AccessoryCategoryButtons canEdit={selectedCategoryName !== ""} setModalMode={setAccessoryCategory} />
            
            <label htmlFor="add-accessory-subcategory">Accessory SubCategory</label>
            <select id="accessory-subcategory" name="accessory-subcategory" className="select select-bordered w-full max-w-xs text-center" value={selectedSubcategoryName} onChange={(e) => accessoryStore.selectSubcategory(e.target.value)}>
                <option disabled selected value="">SubCategory</option>
                {Object.keys(accessoryStore.categories[selectedCategoryName].subcategories).map((name, index) => 
                <option key={index} value={name}>{name}</option>
                )}
            </select>
            <>
                <AddAccessorySubCategoryButton />
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
