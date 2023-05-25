import React, { useRef, useState, useContext } from 'react';
import './Sell.styles.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { ToastContainer, toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner'
const SellPage = () => {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [fetchInProcess, setFetchInProcess] = useState(false);
    const inputFile = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [bookPrice, setBookPrice] = useState("");


    const openFileBrowser = () => {
        console.log("Helllo")
        inputFile.current.click();
    }

    const onFileSelected = (e) => {
        if (e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        } else {
            setSelectedImage(null);
        }
    }

    const uploadBook = async (e) => {
        e.preventDefault();
        setFetchInProcess(true);
        var formdata = new FormData();
        formdata.append("image", selectedImage);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.imgbb.com/1/upload?expiration=86400&key=22225a302b6c6d5e6bc0e0f64049c499", requestOptions)
            .then((response) => response.text())
            .then(async (result) => {

                await fetch("https://xbook-backend.herokuapp.com/sell-book", {
                    method: "POST",
                    body: new URLSearchParams({
                        bookName: bookName,
                        authorName: authorName,
                        publisherName: publisherName,
                        bookPrice: parseInt(bookPrice),
                        coverUrl: JSON.parse(result).data.url,
                        ownerId: currentUser.userid
                    }),

                }).then((queryResponse) => {
                    if (queryResponse.status === 400) {
                        toast.error("Something Went Wrong", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setFetchInProcess(false);
                    } else if (queryResponse.status === 200) {
                        toast.success("Book successfully uploaded", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setFetchInProcess(false);
                        setBookName("");
                        setAuthorName("");
                        setBookPrice("");
                        setPublisherName("");
                        setSelectedImage(null);
                    }
                })
            })
            .catch(error => console.log('error', error)
            )

    }

    return (
        <div className='sell-page-container'>
            <div className='book-cover-side'>
                {
                    selectedImage === null ? <div className='book-dummy-container' onClick={openFileBrowser}>
                        <h3>Click here to upload a cover.</h3>
                    </div> : <div className='book-cover-image-container' onClick={openFileBrowser}>
                        <img src={URL.createObjectURL(selectedImage)} alt='book cover' className='uploaded-book-cover'></img>
                    </div>
                }
                
            </div>
            <div className='book-details-side'>
                <form className='book-details-form' onSubmit={uploadBook}>
                    <h1>Details</h1>
                    <input type="file" ref={inputFile} style={{ display: "none" }} accept="image/png" onChange={onFileSelected} required/>
                    <input type="text" placeholder='Book Title' value={bookName} onChange={(e) => { setBookName(e.target.value) }} required/>
                    <input type="text" placeholder='Book Author' value={authorName} onChange={(e) => { setAuthorName(e.target.value) }} required/>
                    <input type="text" placeholder='Book Publisher' value={publisherName} onChange={(e) => { setPublisherName(e.target.value) }} required/>
                    <input type="number" placeholder='Book Price' value={bookPrice} onChange={(e) => { setBookPrice(e.target.value) }} required/>
                    <button type='submit' disabled={fetchInProcess ? true : false}>{fetchInProcess ? <Rings height="35" width="35" color='white' /> : "Sell"}</button>
                </form>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    )
}
export default SellPage;