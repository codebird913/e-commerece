import axios from '../utils/axiosInstance'
import React from 'react'
import { useState, useEffect } from 'react'

const Cart = () => {
    const [cart, setCart] = useState(null)  // Initialize as null
    const [loading, setLoading] = useState(true)  // Add loading state

    const fetchAddToCart = async () => {
        try {
            const { data } = await axios.get('/cart/list')
            setCart(data.cart)
        } catch (err) {
            alert(err.response.data.message)
        } finally {
            setLoading(false)  // Set loading to false after fetch
        }
    }

    useEffect(() => {
        fetchAddToCart()
    }, [])

    console.log(cart, "cart")

    const updateQuantity = async (productId, quantity) => {
        try {
            const { data } = await axios.put(`/cart/update/${productId}`, { quantity })
            console.log(data)
            // Optionally refetch cart after update
            fetchAddToCart()
        } catch (err) {
            console.log(err)
        }
    }

    const removeItem = async (productId) => {
        try {
            const { data } = await axios.delete(`/cart/remove/${productId}`)
            console.log(data)
            // Optionally refetch cart after update
            fetchAddToCart()
        } catch (err) {
            console.log(err)
        }
    }


    if (loading) {
        return <div>Loading...</div>  // Show loading message
    }

    if (!cart) {
        return <div>No cart items found.</div>  // Handle case where cart is null
    }

    const handlePayment = async (amounts) => {
        try {
            // Create order via backend
            const response = await axios.post('/order/create-order', {
                amount: amounts, // Amount in rupees
                currency: 'INR',
            });

            const { id: order_id, amount, currency } = response.data;

            // Set up RazorPay options
            const options = {
                key: "rzp_test_S1FpOyJoDVpLF1", // Replace with your RazorPay Key ID
                amount: amount,
                currency: currency,
                name: "e-commerece",
                description: "Test Transaction",
                order_id: order_id,
                handler: async (response) => {

                    const { data } = await axios.post('/order/verify-payment', response);

                    alert(data.message);
                    fetchAddToCart()
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
             
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <>
            <div className="container">
                {cart && cart.items && cart.items.length > 0 ? (
                    <div className="row">
                        <div className="col-6 flex-wrap d-flex">
                            {cart.items.map((item) => (
                                <div key={item._id} className="w-100">
                                    <img
                                        height={200}
                                        width={200}
                                        src={`http://localhost:3000/upload/${item.productImage}`}
                                        alt={item.productName}
                                    />
                                    <div>
                                        <div>Name: {item.productName}</div>
                                        <div>Description: {item.productDescription}</div>
                                        <div>Price: {item.productPrice}</div>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.productId, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.productId, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-6">
                            <h1>Summary</h1>
                            <div>Total Amount: {cart.totalAmount}</div>
                            <button
                                className="btn btn-success"
                                onClick={() => handlePayment(cart.totalAmount)}
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <h1>No items in cart</h1>
                )}
            </div>
        </>
    )
}

export default Cart