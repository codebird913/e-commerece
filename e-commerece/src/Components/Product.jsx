import React, { useState, useEffect } from 'react'
import Card from '../ReusableComponents/Card';
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';
function Product() {

    const [productList, setProductList] = useState()
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get("/product/list")

            setProductList(data.productList)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        //Runs only on the first render
        fetchProduct()
    }, []);

    const handleAddToCart = async (item) => {

        try {

            const { data } = await axios.post('/cart/add', {
                productId: item._id,
                userId
            })

            alert(data.message)

        }
        catch (err) {
            alert(err.response.data.message)
        }
        console.log(item.productName)
    }

    const handleProductDetails = (id) => {  
        navigate(`/product-detail/${id}`)
        console.log(id, "id")
    }

    return (
        <>
            <div className="container">
                <div className="row">


                    {
                        productList?.map((item) => (
                            <div className="col-3" key={item._id}>
                                <Card 
                                  id={item._id}
                                    handleProductDetails={() => handleProductDetails(item._id)}
                                    handleAddToCart={() => handleAddToCart(item)}
                                    name={item.productName}
                                    img={`/upload/${item.productImage}`}
                                    description={item.productDescription}
                                    price={item.productPrice} />
                            </div>
                        ))
                    }

                </div>
            </div>
        </>

    );
}

export default Product;
