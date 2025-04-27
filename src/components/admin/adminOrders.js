import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/slices/authSlice'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'
import './adminOrder.css'
const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const auth = useSelector(authSelector)
    const ordersCall = () => {
        fetch(`${process.env.REACT_APP_API}/api/orders/allOrders`, { headers: { "Authorization": auth.token } }).then((res) => res.json()).then(
            (orderList) => {
                setOrders(orderList.orders);

            }
        )
    }
    useEffect(() => {
        ordersCall()
    }, [])
    const handleChange = async (orderId, status) => {
        console.log(status, orderId);
        fetch(`${process.env.REACT_APP_API}/api/orders/changeStatus`,
            {
                method: 'POST',
                headers: {
                    "Authorization": auth.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId,
                    status
                })
            }).then((res) => res.json()).then((e) => {
                console.log(e);
                ordersCall()
            }

            )
    }
    return (
        <>
            <h1 className='heading text-center'>Orders</h1>
            <table className='table'>
                <tr>
                    <th>Sno.</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                </tr>
                {orders.map((order, index) => {
                    return (order==null || order.buyer==null)?<></>:<>
                        <tr className='bg-dark text-light'>
                            <td className='p-4 '>{index + 1}</td>
                            <td><Select value={order.status} onChange={(value) => handleChange(order._id, value)} bordered={false} style={{ color: "white !important" }}>
                                <Option className='bg-dark text-light' value={"Order Placed"}>Order Placed</Option>
                                <Option className='bg-dark text-light' value={"Shipped"}>Shipped</Option>
                                <Option className='bg-dark text-light' value={"Out for delivery"}>Out for delivery</Option>
                                <Option className='bg-dark text-light' value={"Delivered"}>Delivered</Option>
                                <Option className='bg-dark text-light' value={"Cancelled"}>Cancelled</Option>
                            </Select></td>
                            {/* <td>{order.buyer.name}</td> */}
                            <td>{order.buyer.name}</td>
                            <td>{order.date.split('T')[0]}</td>
                            <td>₹ {order.totalPrice}</td>
                        </tr>
                        {/* <tr>
                            <td colSpan={5}>
                                <div>
                                    {order.products.map((prod) => {
                                        return <div className=' card m-3 p-2 d-flex flex-row justify-content-between align-items-center p-2 ' style={{ height: "10vh" }}>
                                            <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${prod.id._id}`} style={{ height: "100%", width: "auto" }}></img>
                                            <h6 className='heading'>{prod.id.name}</h6>
                                            <h5 className='price' style={{ fontWeight: "300", fontSize: "1.1rem" }}>size: {prod.size}</h5>
                                            <h4 className='heading' style={{ fontWeight: "300", fontSize: "1.1rem" }}>Color : {prod.id.color}</h4>
                                            <h4 className='heading' style={{ fontWeight: "300", fontSize: "1.1rem" }}>Quantity : {prod.quantity}</h4>

                                        </div>
                                    })}

                                </div>
                            </td>

                        </tr> */}
                        <tr>
                            <td colSpan={5} className='p-3'>
                                <table style={{ width: "100%" }}>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Size</th>
                                        <th>Color</th>
                                        <th>Quantity</th>
                                    </tr>

                                    {order.products.map((prod) => {
                                        return <tr>
                                            <td className='p-1' style={{ height: "10vh" }}><img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${prod.id._id}`} style={{ height: "100%", width: "auto" }}></img></td>
                                            <td><h6 className='heading'>{prod.id.name}</h6></td>
                                            <td><h5 className='price' style={{ fontWeight: "300", fontSize: "1.1rem" }}>{prod.size}</h5></td>
                                            <td><h4 className='heading' style={{ fontWeight: "300", fontSize: "1.1rem" }}>{prod.id.color}</h4></td>
                                            <td><h4 className='heading' style={{ fontWeight: "300", fontSize: "1.1rem" }}>{prod.quantity}</h4></td>
                                        </tr>
                                    })}
                                </table>
                            </td>

                        </tr>
                    </>

                })}
            </table>
        </>

    )
}

export default AdminOrders