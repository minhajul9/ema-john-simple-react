import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => { 
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect( () => {
        const storedCart = getShoppingCart();
        const savedCart =[];

        for( const id in storedCart){
            const addedProduct = products.find( product => product.id === id);

            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart)
    }, [products])

    const handleAddToCart = (product) =>{
        // const newCart = [...cart, product];

        // first check if the product exist in cart or not 
        const exist = cart.find( pd => pd.id === product.id)
        let newCart = [];
        // if the item not exist in the cart we will add it to the cart with quantity updated to 1
        if(!exist){
            product.quantity = 1;
            newCart =[...cart, product];
        }
        else{
            // if the item exist is the cart 
            // step 1- increase the quantity
            exist.quantity += 1;

            // step-2 take all the items from the cart except the current 1
            const remaining = cart.filter(pd => pd.id !== exist.id);

            // make a new cart with updated current and remaining items
            newCart = [...remaining, exist]
        }

        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;