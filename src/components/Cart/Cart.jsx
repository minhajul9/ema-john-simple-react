import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart} = props;
    let total = 0;
    let totalShipping = 0;
    for(const product of cart){
        total = total+ product.price;
        totalShipping += product.shipping;
    }
    const tax = total * 0.7;
    

    const grandTotal = total + totalShipping + tax;

    return (
        <div className='cart'>
            <h2>Order summary</h2>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;