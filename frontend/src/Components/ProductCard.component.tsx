import React from 'react'

const ProductCard = (props : {title : string, price : number, discount : number, image : string}) => {
    const {title, price, discount, image} = props
    return (
    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
                src={image ? image : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                alt="Product Image" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <div className="card-actions justify-between">
                {discount > 0 ? 
                <p><span className="line-through text-gray-400">{price} €</span> {price - (price * discount / 100)}€</p> 
                : <p>{price}€</p>}
                <button className="btn btn-primary">Add to cart</button>
            </div>
        </div>
    </div>
    )
}

export default ProductCard