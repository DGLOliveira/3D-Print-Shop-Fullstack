import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor';
import AddImages from '../../Components/AddImages.component.tsx'
import { useBrandsStore } from '../../stores/useBrands.store.tsx'
import { AddBrandModal, AddBrandButton, EditBrandButton, EditBrandModal } from '../../Components/modals/BrandModal.component.tsx'
import { AddFilamentForm, AddFilamentVariant } from '../../Components/AddFilament.component.tsx'
import { AddMaterialModal } from '../../Components/modals/AddMaterialModal.component.tsx'
import { AddColorModal } from '../../Components/modals/AddColorModal.component.tsx'
import { AddMaterialPropertyModal } from '../../Components/modals/AddMaterialPropertyModal.component.tsx'
import { AddAccessoryForm } from '../../Components/AddAccessory.component.tsx'
import { AddAccessoryCategoryModal } from '../../Components/modals/AddAccessoryCategoryModal.component.tsx'
import { AddResinForm, AddResinVariant } from '../../Components/AddResin.component.tsx'
import { AddResinCategoryModal } from '../../Components/modals/AddResinCategoryModal.component.tsx'
import { AddResinLightSourceModal } from '../../Components/modals/AddResinLightSourceModal.component.tsx'
import { AddAccessorySubCategoryModal } from '../../Components/modals/AddAccessorySubCategoryModal.component.tsx'

const MATERIAL_CATEGORY = ["Filament", "Resin"]

const AddProduct = () => {

    const brandStore = useBrandsStore()

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages]: [File[] | never[], React.Dispatch<React.SetStateAction<File[] | never[]>>] = useState([]);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState(0);
    const [publish, setPublish] = useState(false);
    const [description, setDescription] = useState("");
    const [materialCategory, setMaterialCategory] = useState("")
    const [brandId, setBrandId]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(-1)

    useEffect(() => {
        brandStore.fetchBrands()
    }, [])

    function forgeFormData() {
        let formData = {};
        switch (category) {
            case "Prints":

                break
            case "Materials":

                break
            case "Hardware":
            case "Accessories":
                formData = {
                    title: title,
                    category: category,
                    images: images,
                    price: price,
                    discount: discount,
                    stock: stock,
                    publish: publish,
                    description: description
                }
                break
            default:
                return false
        }
        return formData
    }

    const submitProduct = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

    }

    return (
        <>
            <AddBrandModal />
            <EditBrandModal brandId={brandId} />
            <AddMaterialModal />
            <AddColorModal />
            <AddMaterialPropertyModal />
            <AddAccessoryCategoryModal />
            <AddAccessorySubCategoryModal />
            <AddResinCategoryModal />
            <AddResinLightSourceModal />
            <form onSubmit={submitProduct} className="flex flex-col gap-8">
                <div className="flex justify-center text-4xl">Add Product</div>
                <div className="flex w-full justify-center align-middle mt-2">
                    <input type="text" placeholder="Title" className="input input-bordered w-[80%] text-center text-2xl" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex w-full items-start">

                    {/* Images Upload and Preview */}
                    <AddImages images={images} setImages={setImages} />
                    {/* Product Details */}

                    <div className="grid grid-cols-3 gap-4 w-160 min-h-0 ">
                        {/* Category */}
                        <label htmlFor="add-brand">Brand</label>
                        <select id="add-brand" name="brand" className="select select-bordered w-full max-w-xs text-center" value={brandId} onChange={(e) => setBrandId(Number(e.target.value))}>
                            <option disabled selected value={-1}>Brand</option>
                            {brandStore.brands.map((brand, index) =>
                                <option key={index} value={brand.id}>{brand.name}</option>
                            )}
                        </select>
                        <span>
                            <AddBrandButton />
                            {brandId > 0 && <EditBrandButton />}
                        </span>

                        <label htmlFor="add-category">Category</label>
                        <select id="add-category" name="category" className="select select-bordered w-full max-w-xs text-center" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled selected>Category</option>
                            <option value="Print">Print</option>
                            <option value="Material">Material</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <span />


                        {/* For Material only*/}

                        {category === "Material" &&
                            <>
                                <label htmlFor="add-material-category">Material Category</label>
                                <select id="add-material-category" name="material" className="select select-bordered w-full max-w-xs text-center" value={materialCategory} onChange={(e) => setMaterialCategory(e.target.value)}>
                                    <option disabled selected>Material</option>
                                    {MATERIAL_CATEGORY.map((category, index) => <option key={index}>{category}</option>)}
                                </select>
                                <span />

                                {materialCategory === "Filament" && <AddFilamentForm />}
                                {materialCategory === "Resin" && <AddResinForm />}
                            </>
                        }

                        {/* For Accessories */}

                        {category === "Accessories" &&
                            <>
                                <AddAccessoryForm />
                            </>
                        }
                        {/* For Hardware, Accessories & Material */}
                        {/*category === "Hardware" || category === "Accessories" &&
                            <>
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
                        */}
                        {/* Publish */}
                    </div>
                </div>

                {/* Variants */}{
                    category === "Material" && <>
                        {materialCategory === "Filament" && <AddFilamentVariant />}
                        {materialCategory === "Resin" && <AddResinVariant />}
                    </>
                }
                {/* Description */}
                <div className="flex flex-col">
                    <div className="flex justify-center text-lg"><b>Description (Markdown Editor)</b></div>
                    <div className="px-16">
                        <MDEditor
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 justify-center items-center w-full">
                    <div className="flex justify-center text-lg">Publish</div>
                    <label className=" toggle border-red-500 text-red-500 has-checked:border-green-500 has-checked:text-green-500" >
                        <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
                        <svg
                            aria-label="disabled"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                        <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="4"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M20 6 9 17l-5-5"></path>
                            </g>
                        </svg>
                    </label>
                    <span className="text-xs text-center">Note: If unchecked, product will only be visible to logged employees</span>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="btn btn-primary m-2 w-fit">
                        Submit
                    </button>
                </div>

            </form>
        </>
    )
}

export default AddProduct