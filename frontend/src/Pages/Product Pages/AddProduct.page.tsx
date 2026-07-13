import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor';
import AddImages from '../../Components/AddImages.component.tsx'
import { useBrandsStore } from '../../stores/useBrands.store.tsx'
import { useAccessoriesStore } from '../../stores/useAccessories.store.tsx'
import { BrandModal, BrandModalButtons } from '../../Components/modals/BrandModal.component.tsx'
import { AddFilamentForm, AddFilamentVariant } from '../../Components/AddFilament.component.tsx'
import { AddMaterialModal } from '../../Components/modals/AddMaterialModal.component.tsx'
import { AddColorModal } from '../../Components/modals/AddColorModal.component.tsx'
import { AddMaterialPropertyModal } from '../../Components/modals/AddMaterialPropertyModal.component.tsx'
import { AddAccessoryForm, AddAccessoryModals } from '../../Components/AddAccessory.component.tsx'
import { AddResinForm, AddResinVariant } from '../../Components/AddResin.component.tsx'
import { AddResinCategoryModal } from '../../Components/modals/AddResinCategoryModal.component.tsx'
import { AddResinLightSourceModal } from '../../Components/modals/AddResinLightSourceModal.component.tsx'

const MATERIAL_CATEGORY = ["Filament", "Resin"]

const GROUPINGS = ["Standalone", "Pieces", "Color", "Weight", "Qualitative"]

const AddProduct = () => {

    const {selectedBrand, selectBrand, brands} = useBrandsStore()
    const accessoryStore = useAccessoriesStore()

    const [name, setName] = useState("");
    const [subname, setSubname] = useState("");
    const [grouping, setGrouping] = useState(GROUPINGS[0]);
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagesState, setImagesState] = useState<string[]>([]);
    const [publish, setPublish] = useState(false);
    const [description, setDescription] = useState("");
    const [materialCategory, setMaterialCategory] = useState("")

    const [submit, setSubmit] = useState(false);
    const [modalMode, setModalMode] = useState("add");

    useEffect(()=>{
        if(submit) setSubmit(false)
    },[submit])

    const submitProduct = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmit(true)
    }

    return (
        <>
            <BrandModal modalMode={modalMode} />
            <AddMaterialModal />
            <AddColorModal />
            <AddMaterialPropertyModal />
            <AddAccessoryModals modalMode={modalMode} submit={submit} />
            <AddResinCategoryModal />
            <AddResinLightSourceModal />
            <form onSubmit={submitProduct} className="flex flex-col gap-8">
                <div className="flex justify-center text-4xl">Add Product</div>
                <div className="flex w-full justify-center align-middle mt-2">
                    <input required type="text" placeholder="Name" className="input input-bordered w-[80%] text-center text-2xl" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex w-full justify-center align-middle">
                    <label html-for="change-grouping" className="label mr-2">Grouping</label>
                    <select id="change-grouping" name="grouping" className="select select-bordered w-40 text-center" value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                        {GROUPINGS.map((grouping, index) =>
                            <option key={index} value={grouping}>{grouping}</option>
                        )}
                    </select>
                    <input disabled={grouping === GROUPINGS[0]} type="text" placeholder="SubName" className="input input-bordered w-[40%] text-center text-2xl" value={subname} onChange={(e) => setSubname(e.target.value)} />
                    
                </div>
                <div className="flex w-full items-start">

                    {/* Images Upload and Preview */}
                    <AddImages images={images} setImages={setImages} imageState={imagesState} setImageState={setImagesState} />
                    {/* Product Details */}

                    <div className="grid grid-cols-3 gap-4 w-160 min-h-0 ">
                        {/* Category */}
                        <label htmlFor="add-brand">Brand</label>
                        <select required id="add-brand" name="brand" className="select select-bordered w-full max-w-xs text-center" value={selectedBrand !== null ? selectedBrand : -1} onChange={(e) => selectBrand(Number(e.target.value))}>
                            <option disabled value={-1}>Brand</option>
                            {brands.map((brand, index) =>
                                <option key={index} value={index}>{brand.name}</option>
                            )}
                        </select>
                        <BrandModalButtons canAdd={true} canEdit={selectedBrand !== null} setModalMode={setModalMode} />


                        <label htmlFor="add-category">Category</label>
                        <select required id="add-category" name="category" className="select select-bordered w-full max-w-xs text-center" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled>Category</option>
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
                                <select required id="add-material-category" name="material" className="select select-bordered w-full max-w-xs text-center" value={materialCategory} onChange={(e) => setMaterialCategory(e.target.value)}>
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
                                <AddAccessoryForm setModalMode={setModalMode} name={name} subname={subname} grouping={grouping} images={images} setImagesState={setImagesState} description={description} publish={publish} submit={submit}  />
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

                {/* Publish */}
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