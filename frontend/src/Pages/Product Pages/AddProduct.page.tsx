import { useState, Fragment } from 'react'
import MDEditor from '@uiw/react-md-editor';

const AddProduct = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages]: [File[], React.Dispatch<React.SetStateAction<File[]>>] = useState([]);
    const [publish, setPublish] = useState(false);
    const [description, setDescription] = useState("");

    const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages([...images, ...event.target.files])
        }
        console.log(images)
    }

    const imageDelete = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const submitProduct = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <form onSubmit={submitProduct} className="flex flex-col gap-8">
            <div className="flex justify-center text-4xl">Add Product</div>
            <div className="flex w-full justify-center align-middle mt-2">
                <input type="text" placeholder="Title" className="input input-bordered w-[80%] text-center text-2xl" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex w-full">

                {/* Images Upload and Preview */}
                <div className="flex flex-col w-full justify-center align-middle mt-2">

                    <div className="relative w-full flex flex-col justify-center p-10 overflow-hidden bg-base-100">
                        <div className="carousel w-full">
                            {images.length > 0 ? images.map((image, index) =>
                                <div className="carousel-item w-full h-[50vh] align-center justify-around border-2 border-neutral box-border" key={index}>
                                    <img id={"slide" + index} src={URL.createObjectURL(image)} className="" />
                                    <button className="btn btn-ghost btn-circle absolute right-12 top-12" onClick={() => imageDelete(index)}>X</button>
                                </div>)
                                :
                                <div className="w-full h-[50vh] flex justify-around items-center">
                                    <div className="skeleton w-full h-full mb-2" />
                                    <span className="text-2xl absolute top-[50%] left[50%] translate-y-[-50%]">No images</span>
                                </div>

                            }
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            {images.length > 0 && images.map((_image, index) =>
                                <a href={"#slide" + index} key={index} className="btn btn-circle">{index + 1}</a>)
                            }
                        </div>
                    </div>

                    <fieldset className="fieldset align-middle">
                        <legend className="fieldset-legend justify-center w-full">Upload an Image</legend>
                        <input type="file" multiple accept="image/*" className="file-input justify-self-center" onChange={imageUpload} />
                        <label className="label justify-center">Max size 2MB</label>
                    </fieldset>
                </div>

                {/* Product Details */}

                {/* Category */}
                <div className="flex flex-col gap-2 w-full justify-center items-center">
                    <label htmlFor="add-category">Category</label>
                    <select id="add-category" name="category" className="select select-bordered w-full max-w-xs text-center" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option disabled selected>Category</option>
                        <option>Print</option>
                        <option>Material</option>
                        <option>Hardware</option>
                        <option>Accessories</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-center text-lg">Description (Markdown Editor)</div>
                <div className="px-16">
                    <MDEditor
                        value={description}
                        onChange={setDescription}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="btn btn-primary m-2 w-fit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AddProduct