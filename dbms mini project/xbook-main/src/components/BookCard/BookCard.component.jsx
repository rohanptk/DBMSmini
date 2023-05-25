import React from 'react';
import { useHistory } from 'react-router-dom';
import './BookCard.styles.css';
const BookCard = ({ title, author, coverURL, price, bookID }) => {

    const history = useHistory();

    const checkOut = () => {
        history.push(`/checkout/${bookID}`)
    }

    return (
        <div className='book-container'>
            <button className='buy-button' onClick={checkOut}>Buy</button>
            <img src={coverURL} alt='book cover' className='book-cover-image'></img>
            <div className='book-info-container'>
                <h2>{title}</h2>
                <h3>{author}</h3>
                <h4>₹{price}</h4>
            </div>
        </div>
    )
}
export default BookCard;