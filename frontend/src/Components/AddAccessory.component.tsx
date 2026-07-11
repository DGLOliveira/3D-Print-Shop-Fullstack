import { useState, useEffect } from 'react'
import { AccessoryCategoryButtons, AccessoryCategoryModal } from './modals/AccessoryCategoryModal.component'
import { AccessorySubCategoryButtons, AccessorySubCategoryModal } from './modals/AccessorySubCategoryModal.component.tsx'
import { useAccessoriesStore } from '../stores/useAccessories.store.tsx'

export const AddAccessoryModals = ({modalMode} : {modalMode: string}) => {

    return (
        <>
            <AccessoryCategoryModal modalMode={modalMode} />
            <AccessorySubCategoryModal modalMode={modalMode} />
        </>
    )
}

export const AddAccessoryForm = ({setModalMode} : {setModalMode: React.Dispatch<React.SetStateAction<string>>}) => {

    const accessoryStore = useAccessoriesStore();
    const selectedCategoryName = accessoryStore.selectedCategoryName
    const selectedSubCategoryName = accessoryStore.selectedSubCategoryName

    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [stock, setStock] = useState(0)


    useEffect(()=>{
        accessoryStore.fetchAccessories()
        accessoryStore.fetchCategories()
    },[])

    useEffect(()=>{
        accessoryStore.selectSubCategory("")
    },[selectedCategoryName])

    return (
        <>

            <label htmlFor="add-accessory-category">Accessory Category</label>
            <select id="accessory-category" name="accessory-category" className="select select-bordered w-full max-w-xs text-center" value={selectedCategoryName} onChange={(e) => accessoryStore.selectCategory(e.target.value)}>
                <option disabled value="">Category</option>
                {Object.keys(accessoryStore.categories).map((name, index) => 
                <option key={index} value={name}>{name}</option>
                )}
            </select>
            <AccessoryCategoryButtons canAdd={true} canEdit={selectedCategoryName !== ""} setModalMode={setModalMode} />
            
            <label htmlFor="add-accessory-subcategory">Accessory SubCategory</label>
            <select disabled={selectedCategoryName === ""} id="accessory-subcategory" name="accessory-subcategory" className="select select-bordered w-full max-w-xs text-center" value={selectedSubCategoryName} onChange={(e) => accessoryStore.selectSubCategory(e.target.value)}>
                <option disabled value="">SubCategory</option>
                {selectedCategoryName !== "" && Object.keys(accessoryStore.categories[selectedCategoryName].subcategories).map((name, index) => 
                <option key={index} value={name}>{name}</option>
                )}
            </select>
            <>
                <AccessorySubCategoryButtons canAdd={selectedCategoryName !== ""} canEdit={selectedSubCategoryName !== ""} setModalMode={setModalMode} />
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
