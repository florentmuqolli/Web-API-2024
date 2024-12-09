import React, { useEffect, useState } from 'react';
import { getOrders } from '../../api/api';  // Import the API function

const OrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };

        fetchOrders();
    }, []); // Empty dependency array to fetch orders only once when the component mounts

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order ID: {order.id}, User ID: {order.user_id}, Total Price: {order.total_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersList;
