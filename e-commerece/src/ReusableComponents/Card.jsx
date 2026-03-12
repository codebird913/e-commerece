import React from 'react'

const Card = ({ id, name, img, description, price, handleAddToCart, handleProductDetails }) => {
    return (
        <div className="card" onClick={handleProductDetails} >
            <img src={img} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p>{price}</p>
                <button className='btn btn-primary' onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    )
}

export default Card
