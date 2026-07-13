import { useState } from 'react'
import { type ProductImage } from '../stores/useAccessories.store.tsx'

const ShowImages = ({ images }: { images: ProductImage[] }) => {
    const [index, setIndex] = useState<number>(0);

    return (
        <div className="container flex flex-col flex-2">
            <div className="flex gap-2 w-full h-[80%] items-center justify-center">
                <img className="w-80 h-80 object-contain" src={images[index] ? images[index].image_url : ""} alt="" />
            </div>
            <div className="flex gap-2 w-full mt-2 p-1 border">
                {images.length > 0 && images.map((image, i) => (
                    <img className="w-20 h-20 cursor-pointer" src={image.image_url} key={i} onClick={() => setIndex(i)} />
                ))}
            </div>
        </div>
    )
}

export default ShowImages