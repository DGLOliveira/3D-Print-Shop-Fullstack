import React from 'react'

const AddImages = ({images, setImages} : {images: File[] | never[], setImages: React.Dispatch<React.SetStateAction<File[] | never[]>>})  => {

    
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

  return (
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
                        <label className="label justify-center">Images will be converted to .webp on submission</label>
                        <label className="label justify-center">Max size 2MB</label>
                    </fieldset>
                </div>
  )
}

export default AddImages