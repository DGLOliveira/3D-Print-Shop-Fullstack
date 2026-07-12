import { useState, useEffect } from 'react'
import { Euro, Percent, Boxes } from 'lucide-react'

import { AccessoryCategoryButtons, AccessoryCategoryModal } from './modals/AccessoryCategoryModal.component'
import { AccessorySubCategoryButtons, AccessorySubCategoryModal } from './modals/AccessorySubCategoryModal.component.tsx'
import { useAccessoriesStore, type AccessoryForm } from '../stores/useAccessories.store.tsx'
import { useBrandsStore } from '../stores/useBrands.store.tsx'
import StatusModalFactory from './factories/addProductStatusModalFactory.component.tsx'


export const AddAccessoryModals = ({ modalMode, submit }: { modalMode: string, submit: boolean }) => {

    const { isUpdatingCat, updatingAccMsg } = useAccessoriesStore();
    return (
        <>
            <StatusModalFactory message={updatingAccMsg} isBusy={isUpdatingCat} isActive={submit} />
            <AccessoryCategoryModal modalMode={modalMode} />
            <AccessorySubCategoryModal modalMode={modalMode} />
        </>
    )
}

export const AddAccessoryForm = ({ setModalMode, name, subname, grouping, images, setImagesState, description, publish, submit }: { setModalMode: React.Dispatch<React.SetStateAction<string>>, name: string, subname: string, grouping: string, images: File[] | [], setImagesState: React.Dispatch<React.SetStateAction<string[]>>, description: string, publish: boolean, submit: boolean }) => {

    const { selectCategory, selectSubCategory, categories, isUpdatingCat, selectedCategoryName, selectedSubCategoryName, createAccessory } = useAccessoriesStore();

    const { selectedBrand, brands } = useBrandsStore();

    const [accessoryForm, setAccessoryForm]: [AccessoryForm, React.Dispatch<React.SetStateAction<AccessoryForm>>] = useState({
        name,
        subname,
        grouping,
        brandId: selectedBrand === null ? -1 : selectedBrand,
        categoryId: selectedCategoryName === "" ? -1 : categories[selectedCategoryName].id,
        subcategoryId: selectedSubCategoryName === "" ? -1 : categories[selectedCategoryName].subcategories[selectedSubCategoryName].id,
        price: 0,
        discount: 0,
        stock: 0,
        description,
        publish
    });


    useEffect(() => {
        if (submit) {
            const finalAccessoryForm : AccessoryForm = {
                ...accessoryForm,
                name,
                subname,
                grouping,
                brandId: selectedBrand === null ? -1 : brands[selectedBrand].id ,
                categoryId: selectedCategoryName === "" ? -1 : categories[selectedCategoryName].id,
                subcategoryId: selectedSubCategoryName === "" ? -1 : categories[selectedCategoryName].subcategories[selectedSubCategoryName].id,
                description,
                publish
            }
            setAccessoryForm(finalAccessoryForm)
            createAccessory(finalAccessoryForm, images, setImagesState)
        }
    }, [submit])

    return (
        <>
            <label htmlFor="add-accessory-category">Accessory Category</label>
            {isUpdatingCat ? <div>Loading...</div> :
                <select required id="accessory-category" name="accessory-category" className="select select-bordered w-full max-w-xs text-center" value={selectedCategoryName} onChange={(e) => selectCategory(e.target.value)}>
                    <option disabled value="">Category</option>
                    {Object.keys(categories).map((name, index) =>
                        <option key={index} value={name}>{name}</option>
                    )}
                </select>}
            <AccessoryCategoryButtons canAdd={true} canEdit={selectedCategoryName !== ""} setModalMode={setModalMode} />

            <label htmlFor="add-accessory-subcategory">Accessory SubCategory</label>
            {isUpdatingCat ? <div>Loading...</div> : <select disabled={selectedCategoryName === ""} id="accessory-subcategory" name="accessory-subcategory" className="select select-bordered w-full max-w-xs text-center" value={selectedSubCategoryName} onChange={(e) => selectSubCategory(e.target.value)}>
                <option disabled value="">SubCategory</option>
                {selectedCategoryName !== "" && Object.keys(categories[selectedCategoryName].subcategories).map((name, index) =>
                    <option key={index} value={name}>{name}</option>
                )}
            </select>}
            <>
                <AccessorySubCategoryButtons canAdd={selectedCategoryName !== ""} canEdit={selectedSubCategoryName !== ""} setModalMode={setModalMode} />
            </>

            <label htmlFor="add-price"> Price</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                    <Euro className="size-5 text-base-content/40" />
                </div>
                <input required id="add-price" type="number" step="0.01" placeholder="Price" min="1" className="input input-bordered w-40 max-w-xs text-center" value={accessoryForm.price} onChange={(e) => setAccessoryForm({ ...accessoryForm, price: parseFloat(e.target.value) })} />
            </div>
            <span />

            <label htmlFor="add-discount"> Discount</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                    <Percent className="size-5 text-base-content/40" />
                </div>
                <input id="add-discount" type="number" min="0" max="90" step="1" placeholder="Discount%" className="input input-bordered w-40 max-w-xs text-center" value={accessoryForm.discount} onChange={(e) => setAccessoryForm({ ...accessoryForm, discount: parseInt(e.target.value) })} onWheel={(e) => e.currentTarget.blur()} />
            </div>
            <span />

            <label htmlFor="add-stock"> Stock</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                    <Boxes className="size-5 text-base-content/40" />
                </div>
                <input id="add-stock" type="number" min="0" step="1" placeholder="Stock" className="input input-bordered w-40 max-w-xs text-center" value={accessoryForm.stock} onChange={(e) => setAccessoryForm({ ...accessoryForm, stock: parseInt(e.target.value) })} />
            </div>
            <span />
        </>
    )
}
