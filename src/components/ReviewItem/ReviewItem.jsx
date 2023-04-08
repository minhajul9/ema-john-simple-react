import React from 'react';
import './reviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {id, name, img, price, quantity} = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className="review-details">
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Quantity: <span className='orange-text'>{quantity}</span></p>
            </div>
            <button className='btn-delete' onClick={() => handleRemoveFromCart(id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;