import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'

const Order = () => {

    const [orderList, setOrderList] = useState([])

    const role = localStorage.getItem('role')

    const fetchOrders = async () => {
        try {
            if (role === 'admin') {
                const { data } = await axios.get('/order/admin/order-list')
                console.log(data)
                setOrderList(data.orderList)

            } else {
                const { data } = await axios.get('/order/order-list')
                console.log(data)
                setOrderList(data.orderList)
            }

        }
        catch (err) {
            console.log(err)
        }


    }
    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <>


            <table style={{ width: "100%" }}>
                <tr>
                    <th>Id</th>
                    <th>order status</th>
                    <th>payment status</th>
                    <th>total Amount</th>
                </tr>

                {
                    orderList?.map((item) => (
                        <>
                            <tr>
                                <td> {item?.orderId} </td>
                                <td> {item?.orderStatus} </td>
                                <td> {item?.paymentStatus} </td>
                                <td> {item?.totalAmount} </td>


                            </tr>
                        </>
                    ))}
            </table>



        </>
    )
}

export default Order