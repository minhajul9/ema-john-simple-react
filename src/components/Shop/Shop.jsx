import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const {totalProducts} = useLoaderData();
    const [itemsPerPage, setItemsPerPage] = useState(9); //TODO: make it dynamic
    const [currentPage, setCurrentPage] = useState(0)

    //items per page options
    const options = [9, 15, 20];

    // steps for Pagination
    /**
     * Done 1: determine the total number of items
     * TODO 2: Decide the number of items per page
     * 
    */

    // useEffect(() => {
    //     fetch(`http://localhost:5000/products`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts(data);
    //             setTotalProducts(data.length);
    //         })
    // }, [])



    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                
            })
    }, [itemsPerPage, currentPage])

    // console.log(totalProducts);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    // console.log(totalPages);

    // const pageNumbers = []
    // for(let i=0; i<10; i++){
    //     pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()];

    // console.log(pageNumbers);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];

        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);

            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart)
    }, [products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        // first check if the product exist in cart or not 
        const exist = cart.find(pd => pd._id === product._id)
        let newCart = [];
        // if the item not exist in the cart we will add it to the cart with quantity updated to 1
        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            // if the item exist is the cart 
            // step 1- increase the quantity
            exist.quantity += 1;

            // step-2 take all the items from the cart except the current 1
            const remaining = cart.filter(pd => pd._id !== exist._id);

            // make a new cart with updated current and remaining items
            newCart = [...remaining, exist]
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart();
    }

    const handleSelectChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setItemsPerPage(selectedValue);
        // onChange(selectedValue);
        setCurrentPage(0)
      };


    return (
        <>
            {/* shop products */}
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to='/orders'>
                            <button className='btn-proceed'>
                                <span>Review Order</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>

                        </Link>
                    </Cart>
                </div>

            </div>

            {/* pagination */}
            <div className="pagination">
                <p>Current Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number && 'selected'}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;