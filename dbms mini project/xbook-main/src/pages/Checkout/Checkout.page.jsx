import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Checkout.styles.css';
import Logo from '../../assets/images/logo.svg'
import { BooksContext } from '../../context/BooksContext';
const CheckoutPage = () => {
    const { bookID } = useParams();
    const [currentBook, setCurrentBook] = useState(null);
    const [books, setBooks] = useContext(BooksContext);
    useEffect(() => {
        var isMounted = true;
        var foundBook = books.find((book) => {
            // eslint-disable-next-line eqeqeq
            return book.bookid == bookID;

        })

        if (isMounted) {
            setCurrentBook(foundBook);
        }

        console.log(foundBook);

        return () => {
            isMounted = false;
        }
    })

    return (
        currentBook === null ? <div></div> : <section className='checkout-page'>
            <div className="nav-bar">
                <div className="logo-container">
                    <img src={Logo} alt='Logo' />
                </div>
                <div className="nav-link-container">
                    <ul>
                        <li><Link className='nav-link' to="/shop">Shop</Link></li>
                    </ul>
                </div>
            </div>
            <div className='checkout-content-section'>
                <div className='cover-image-section'>
                    <img src={currentBook.coverimageurl} alt='Book Cover' />
                </div>
                <div className='book-detail-section'>
                    <div className='book-details-container-checkout'>
                        <h2>{currentBook.bookname}</h2>
                        <h2>By: {currentBook.authorname}</h2>
                        <h2>Publisher: {currentBook.publishername}</h2>
                        <h2>Price: ₹ {currentBook.price}</h2>
                        <button>Buy</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CheckoutPage;