import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart} = props;
    let total = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        // 1st time when we adding a new product to the cart quantity will be 0 so for the first product we will set the quantity to 1
        // product.quantity = product.quantity || 1;
        
        total = total + product.price * product.quantity;

        totalShipping += product.shipping;
        quantity += product.quantity;
    }
    const tax = total * 0.7;
    

    const grandTotal = total + totalShipping + tax;

    return (
        <div className='cart'>
            <h2>Order summary</h2>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;