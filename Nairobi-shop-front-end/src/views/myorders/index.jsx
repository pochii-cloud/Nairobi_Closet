import React, { useState, useEffect } from 'react';
import http from "../../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the orders of the logged-in user from the backend
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if(!token){
          console.log('token is missing')
          return;
        }

        const response = await http.get('api/v1/user/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
<>
  <div className='myorders' style={{marginTop:'100px'}}>
    <h1>My Orders here</h1>
    {orders.map((order) => (
      <div key={order.orderID}>
        <p>Order ID: {order.orderID}</p>
        <p>
          {order.orderItems &&
            order.orderItems.map(item => <p>product is:{item.name} quantity is:{item.quantity}</p>)
          }
        </p>
        <p>order status:{order.orderStatus}</p>
        {/* Display other order details */}
      </div>
    ))}
  </div>
</>

  );
}

export default MyOrders;
