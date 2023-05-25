import React, { useContext, useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard.component';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { TailSpin } from 'react-loader-spinner'
import './Buy.styles.css';
import { BooksContext } from '../../context/BooksContext';
const BuyPage = () => {

    const [books, setBooks] = useContext(BooksContext);
    const [bookIsFetching, setBookIsFetching] = useState(true);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [errorText, setErrorText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        var isMounted = true;
        fetchBooks(isMounted)
        return () => {
            isMounted = false;
        }
    }, [])

    const fetchBooks = async (isMounted) => {
        await fetch("https://xbook-backend.herokuapp.com/get-books", {
            method: "POST",
            body: new URLSearchParams({
                ownerId: currentUser.userid
            }),

        }).then((response) => {
            if (response.status === 400) {
                if (isMounted) {
                    setErrorText("Oops, Something went wrong");
                    setBookIsFetching(false);
                }
            } else if (response.status === 404) {
                if (isMounted) {
                    setErrorText("Couldn't find any books.");
                    setBookIsFetching(false);
                }
            } else if (response.status === 200) {
                if (isMounted) {
                    setErrorText("Success");
                    response.text().then(textValue => {
                        setBooks(JSON.parse(textValue))
                    })
                    setBookIsFetching(false);
                }
            }
        })
    }

    const searchBooks = async () => {
        setBookIsFetching(true);
        await fetch("https://xbook-backend.herokuapp.com/search-books", {
            method: "POST",
            body: new URLSearchParams({
                ownerId: currentUser.userid,
                searchTerm: searchTerm
            }),

        }).then((response) => {
            if (response.status === 400) {

                setErrorText("Oops, Something went wrong");
                setBookIsFetching(false);

            } else if (response.status === 404) {

                setErrorText("Couldn't find any books.");
                setBookIsFetching(false);

            } else if (response.status === 200) {

                setErrorText("Success");
                response.text().then(textValue => {
                    setBooks(JSON.parse(textValue))
                })
                setBookIsFetching(false);

            }
        })
    }

    if (bookIsFetching) {
        return (
            <div className='book-not-found-container'>
                <div className='search-container'>
                    <input type="search" placeholder='Search for Books, Author and Publisher' value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}}></input>
                    <button onClick = {searchBooks}>Search</button>
                </div>
                <div className='error-and-loading-container'>
                    <TailSpin color="#00A96C" height={80} width={80} />
                </div>
            </div>
        )
    } else {
        if (errorText === "Oops, Something went wrong") {
            return (
                <div className='book-not-found-container'>
                    <div className='search-container'>
                        <input type="search" placeholder='Search for Books, Author and Publisher' value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}}></input>
                        <button onClick = {searchBooks}>Search</button>
                    </div>
                    <div className='error-and-loading-container'>Oops, Something went wrong</div>
                </div>
            )
        } else if (errorText === "Couldn't find any books.") {
            return (
                <div className='book-not-found-container'>
                    <div className='search-container'>
                        <input type="search" placeholder='Search for Books, Author and Publisher' value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}}></input>
                        <button onClick = {searchBooks}>Search</button>
                    </div>
                    <div className='error-and-loading-container'>Couldn't find any books.</div>
                </div>

            )
        } else if (errorText === "Success") {
            return (
                <section className='buy-section-container'>
                    <div className='search-container'>
                        <input type="search" placeholder='Search for Books, Author and Publisher' value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}}></input>
                        <button onClick = {searchBooks}>Search</button>
                    </div>
                    <h1>Books you are looking for :</h1>
                    <div className='books-result-container'>
                        {
                            books.map(book => {
                                return (
                                    <BookCard key={book.bookname + book.coverimageurl} title={book.bookname} author={book.authorname} price={book.price} coverURL={book.coverimageurl} bookID={book.bookid} />
                                )
                            })
                        }
                    </div>
                </section>
            )
        }
    }
}
export default BuyPage;