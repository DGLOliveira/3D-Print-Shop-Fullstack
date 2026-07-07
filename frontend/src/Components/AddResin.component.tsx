import { useState, Fragment } from "react"
import { AddResinCategoryButton, AddResinCategoryModal } from "./modals/AddResinCategoryModal.component.tsx"
import { AddColorButton, AddColorModal } from "./modals/AddColorModal.component.tsx"
import { AddResinLightSourceButton, AddResinLightSourceModal } from "./modals/AddResinLightSourceModal.component.tsx"

const LIGHT_SOURCES = ["LCD", "DLP", "SLA - Laser"] // Remove after integration into DB

export const AddResinForm = ({ }) => {

    const [resinCategory, setResinCategory] = useState("")
    const [color, setColor] = useState("")
    const [lightSources, setLightSources] = useState([""])

    return (
        <>

            <label htmlFor="add-resin-category">Resin Category</label>
            <select id="add-resin-category" name="resin" className="select select-bordered w-full max-w-xs text-center" value={resinCategory} onChange={(e) => setResinCategory(e.target.value)}>
                <option disabled selected>Category</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <>
                <AddResinCategoryButton />
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

            <label htmlFor="add-light-source">Light Source</label>
            <div className="flex flex-col gap-2">
                {LIGHT_SOURCES.map((lightSource, index) => (
                    <div key={index} className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{lightSource}</span>
                            <input type="checkbox" className="checkbox checkbox-primary" checked={lightSources.includes(lightSource)} onChange={(e) => {
                                if (e.target.checked) {
                                    setLightSources([...lightSources, lightSource])
                                } else {
                                    setLightSources(lightSources.filter((source) => source !== lightSource))
                                }
                            }} />
                        </label>
                    </div>
                ))}
            </div>
            <>
                <AddResinLightSourceButton />
            </>
        </>
    )
}

interface ResinVariantProps {
    weight: number
    pricePerKg: number
    stock: number
    discount: number
}

export const AddResinVariant = () => {

    const [resinVariantArray, setResinVariantArray]: [ResinVariantProps[] | never[], React.Dispatch<React.SetStateAction<ResinVariantProps[] | never[]>>] = useState([])


    const addNewVariantRow = () => {
        setResinVariantArray([...resinVariantArray, { weight: 0, pricePerKg: 0, stock: 0, discount: 0 }])
    }

    const removeVariantRow = (index: number) => {
        const newVariantArray = [...resinVariantArray];
        newVariantArray.splice(index, 1);
        setResinVariantArray(newVariantArray);
    }

    const changeVariantValue = (index: number, key: string, value: number) => {
        let newVariantArray = [...resinVariantArray];
        newVariantArray[index][key] = value;
        setResinVariantArray(newVariantArray);
    }

    return (
        <>
            <div className="flex justify-center text-lg"><b>Resin Variants</b></div>
            <table className="table w-200 self-center">
                <thead>
                    <tr>
                        <th>Liquid Weight (grams)</th>
                        <th>Price per Weight (€/Kg)</th>
                        <th>Stock</th>
                        <th>Discount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {resinVariantArray.map((variant, index) => {
                        return (
                            <tr key={index}>
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
                        <td colSpan={5}>
                            <button className="btn btn-secondary w-full" onClick={addNewVariantRow}>Add Variant</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}