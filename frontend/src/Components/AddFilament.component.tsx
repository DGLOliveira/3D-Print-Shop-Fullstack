import { useState, Fragment } from "react"
import { AddMaterialButton, AddMaterialModal } from "./modals/AddMaterialModal.component.tsx"
import { AddColorButton, AddColorModal } from "./modals/AddColorModal.component.tsx"
import { AddMaterialPropertyButton, AddMaterialPropertyModal } from "./modals/AddMaterialPropertyModal.component.tsx"



export const AddFilamentForm = ({ }) => {

    const [material, setMaterial] = useState("")
    const [color, setColor] = useState("")
    const [materialProperty, setMaterialProperty] = useState("")
    const [variants, setVariants] = useState([])


    return (
        <>

            <label htmlFor="add-material">Material</label>
            <select id="add-material" name="material" className="select select-bordered w-full max-w-xs text-center" value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option disabled selected>Material</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <>
                <AddMaterialButton />
            </>

            <label htmlFor="add-color">Color</label>
            <select id="add-color" name="clor" className="select select-bordered w-full max-w-xs text-center" value={color} onChange={(e) => setColor(e.target.value)}>
                <option disabled selected>Color</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <>
                <AddColorButton />
            </>

            <label htmlFor="add-material-property">Material Property</label>
            <select id="add-material-property" name="material-property" className="select select-bordered w-full max-w-xs text-center" value={materialProperty} onChange={(e) => setMaterialProperty(e.target.value)}>
                <option disabled selected>Material Property</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <>
                <AddMaterialPropertyButton />
            </>
        </>
    )
}

interface FilamentVariantProps {
    weight: number
    diameter: number
    pricePerKg: number
    stock: number
    discount: number
}

export const AddFilamentVariant = () => {

    const [filamentVariantArray, setFilamentVariantArray]: [FilamentVariantProps[] | never[], React.Dispatch<React.SetStateAction<FilamentVariantProps[] | never[]>>] = useState([])


    const addNewVariantRow = () => {
        setFilamentVariantArray([...filamentVariantArray, { weight: 0, diameter: 0, pricePerKg: 0, stock: 0, discount: 0 }])
    }

    const removeVariantRow = (index: number) => {
        const newVariantArray = [...filamentVariantArray];
        newVariantArray.splice(index, 1);
        setFilamentVariantArray(newVariantArray);
    }

    const changeVariantValue = (index: number, key: string, value: number) => {
        let newVariantArray = [...filamentVariantArray];
        newVariantArray[index][key] = value;
        setFilamentVariantArray(newVariantArray);
    }

    return (
        <>
            <div className="flex justify-center text-lg"><b>Filament Variants</b></div>
            <table className="table w-200 self-center">
                <thead>
                    <tr>
                        <th>Diameter (mm)</th>
                        <th>Liquid Weight (grams)</th>
                        <th>Price per Weight (€/Kg)</th>
                        <th>Stock</th>
                        <th>Discount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filamentVariantArray.map((variant, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <input value={variant.diameter} step="0.01" min="0" onChange={(e) => changeVariantValue(index, "diameter", parseFloat(e.target.value))} type="number" placeholder="Diameter" className="input input-bordered w-30 max-w-xs text-center" />
                                </td>
                                <td>
                                    <input value={variant.weight} step="1" min="0" onChange={(e) => changeVariantValue(index, "weight", parseFloat(e.target.value))} type="number" placeholder="Weight" className="input input-bordered w-30 max-w-xs text-center" />
                                </td>
                                <td>
                                    <input value={variant.pricePerKg} step="0.01" min="0" onChange={(e) => changeVariantValue(index, "pricePerKg", parseFloat(e.target.value))} type="number" placeholder="Price per Kg" className="input input-bordered w-30 max-w-xs text-center" />
                                </td>
                                <td>
                                    <input value={variant.stock} step="1" min="0" onChange={(e) => changeVariantValue(index, "stock", parseFloat(e.target.value))} type="number" placeholder="Stock" className="input input-bordered w-30 max-w-xs text-center" />
                                </td>
                                <td>
                                    <input value={variant.discount} step="1" min="0" max="90" onChange={(e) => changeVariantValue(index, "discount", parseFloat(e.target.value))} type="number" placeholder="Discount" className="input input-bordered w-30 max-w-xs text-center" />
                                </td>
                                <td>
                                    <button className="btn btn-error" onClick={() => removeVariantRow(index)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6}>
                            <button className="btn btn-secondary w-full" onClick={addNewVariantRow}>Add Variant</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}