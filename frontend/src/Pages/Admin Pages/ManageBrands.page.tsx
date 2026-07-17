import { useState, useEffect, type JSX } from "react"
import { SquarePlus } from 'lucide-react'
import { useSearchParams, useOutletContext, Link } from "react-router"
import { toast } from "react-hot-toast"
import { useBrandsStore, type Brand, type BrandForm } from "../../stores/useBrands.store.tsx"

export const ManageBrands = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useOutletContext<[title: JSX.Element, setTitle: React.Dispatch<React.SetStateAction<JSX.Element>>]>();
    const { brands, selectedBrand, selectBrand, createBrand } = useBrandsStore()
    console.log(searchParams)
    console.log(title)


    const ListBrands = () => {

        const handleNew = () => {
            selectBrand(null)
            setSearchParams({ state: "add" })
            setTitle(
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/admin/manage-brands" className="btn btn-ghost">Manage Brands</Link></li>
                        <li><Link to="/admin/manage-brands?state=add" className="btn btn-ghost">Add Brand</Link></li>
                    </ul>
                </div>
            )
        }

        const handleEdit = (brand: Brand, index: number) => {
            selectBrand(index)
            setSearchParams({ state: "edit", id: String(brand.id) })
            setTitle(
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/admin/manage-brands" className="btn btn-ghost">Manage Brands</Link></li>
                        <li><Link to={`/admin/manage-brands?state=edit&id=${brand.id}`} className="btn btn-ghost">{brand.name}</Link></li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Brands</h1>
                <div className="flex flex-col gap-2">
                    <div className="card bg-base-200 h-96 shadow-sm flex flex-col justify-center items-center border-4 border-dashed hover:cursor-pointer hover:*:text-info">
                        <SquarePlus className="size-32 mb-4" onClick={handleNew} />
                        <span className="text-2xl">Add Brand</span>
                    </div>
                    {brands.map((brand, index) => (
                        <div className="card bg-base-100 shadow-sm border border-neutral">
                            <figure className="w-full h-50">
                                <img
                                    className="w-full h-50 object-contain"
                                    src={brand.image_url ? brand.image_url : "https://stackoverflow.com/does-not-exist.png"}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{brand.name}</h2>
                                <a href={brand.website} target="_blank">{brand.website}</a>
                                <p>{brand.summary}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary" onClick={() => handleEdit(brand, index)}>Edit Brand</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const AddBrand = () => {
        const [brandForm, setBrandForm] = useState<BrandForm>({
            name: "",
            summary: "",
            website: "",
            logo: null
        });

        const imageUpload = () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (event) => {
                const target = event.target as HTMLInputElement | null;
                if (target?.files?.[0]) {
                    const reader = new FileReader();
                    reader.readAsDataURL(target.files[0]);
                    reader.onload = async () => {
                        const base64Image = reader.result;
                        setBrandForm({ ...brandForm, logo: base64Image })
                    };

                }
            }
            input.click();
        }

        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (brandForm.logo === null) {
                toast.error("Please upload an image");
            } else if (brandForm.name === "" || brandForm.summary === "" || brandForm.website === "") {
                toast.error("Please fill out all fields");
            } else {
                createBrand(brandForm);
            }
        }
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">Add Brand</h1>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-center w-full m-1">
                        <figure className="w-40 h-40 border" onClick={() => imageUpload()}>
                            {brandForm.logo !== null ?
                                <img className="w-full h-full object-contain cursor-pointer" src={String(brandForm.logo)} /> :
                                <div className="skeleton w-full h-full flex flex-col justify-center items-center cursor-pointer">
                                    <span>Load</span>
                                    <span>New</span>
                                    <span>Image</span>
                                </div>
                            }
                        </figure>
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Name:</span>
                        </label>
                        <input type="text" className="input input-bordered" value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Website:</span>
                        </label>
                        <input type="text" className="input input-bordered" value={brandForm.website} onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Summary:</span>
                        </label>
                        <textarea className="input input-bordered" value={brandForm.summary} onChange={(e) => setBrandForm({ ...brandForm, summary: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        )
    }

    /*
    const EditBrand = () => {
        const [brandForm, setBrandForm] = useState<BrandForm>({
            name: "",
            summary: "",
            website: "",
            logo: null
        });

        const imageUpload = () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (event) => {
                const target = event.target as HTMLInputElement | null;
                if (target?.files?.[0]) {
                    const reader = new FileReader();
                    reader.readAsDataURL(target.files[0]);
                    reader.onload = async () => {
                        const base64Image = reader.result;
                        setBrandForm({ ...brandForm, logo: base64Image })
                    };

                }
            }
            input.click();
        }

        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (brandForm.logo === null) {
                toast.error("Please upload an image");
            } else if (brandForm.name === "" || brandForm.summary === "" || brandForm.website === "") {
                toast.error("Please fill out all fields");
            } else {
                createBrand(brandForm);
            }
        }
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">Add Brand</h1>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-center w-full m-1">
                        <figure className="w-40 h-40 border" onClick={() => imageUpload()}>
                            {brandForm.logo !== null ?
                                <img className="w-full h-full object-contain cursor-pointer" src={String(brandForm.logo)} /> :
                                <div className="skeleton w-full h-full flex flex-col justify-center items-center cursor-pointer">
                                    <span>Load</span>
                                    <span>New</span>
                                    <span>Image</span>
                                </div>
                            }
                        </figure>
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Name:</span>
                        </label>
                        <input type="text" className="input input-bordered" value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Website:</span>
                        </label>
                        <input type="text" className="input input-bordered" value={brandForm.website} onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Summary:</span>
                        </label>
                        <textarea className="input input-bordered" value={brandForm.summary} onChange={(e) => setBrandForm({ ...brandForm, summary: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-error">Delete</button>
                    </div>
                </div>
            </form>
        )
    }*/


    if (searchParams.size === 0) return <ListBrands />
    if (searchParams.get("state") === "add") return <AddBrand />
    /*if (searchParams.get("state") === "edit") return <EditBrand />*/

}

export default ManageBrands