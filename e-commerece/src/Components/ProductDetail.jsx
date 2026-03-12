


import React from 'react'
import axios from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ProductDetail = () => {
    const [productDetails, setproductDetails] = useState(null)  // Initialize as null for clarity
    const [loading, setLoading] = useState(true)  // Add loading state
    const { id } = useParams()
    const userId = localStorage.getItem('userId')
    console.log(id)

    const fetchProductDetails = async () => {
        try {
            const { data } = await axios.get(`/product/product-detail/${id}`)
            console.log(data)
            setproductDetails(data.product)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)  // Set loading to false after fetch
        }
    }

    useEffect(() => {
        fetchProductDetails()
    }, [id])  // Add 'id' as dependency to refetch if id changes

    if (loading) {
        return <div>Loading...</div>  // Show loading message
    }

    if (!productDetails) {
        return <div>No product found.</div>  // Handle case where data is null
    }

     const handleAddToCart = async (id) => {

        try {

            const { data } = await axios.post('/cart/add', {
                productId: id,
                userId
            })

            alert(data.message)

        }
        catch (err) {
            alert(err.response.data.message)
        }
        console.log(item.productName)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img height={500} width={500} src={`/upload/${productDetails?.productImage}`} alt={productDetails?.productName} />
                    </div>
                    <div className="col-6">
                        <div>Name: {productDetails?.productName} </div>
                        <div>Description: {productDetails?.productDescription} </div>
                        <div>Price: {productDetails?.productPrice} </div>
                        <button onClick={() => handleAddToCart(productDetails._id)} className='btn btn-success'>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail