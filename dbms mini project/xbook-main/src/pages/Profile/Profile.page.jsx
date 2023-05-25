import React,{useContext, useState} from 'react'; 
import './Profile.styles.css'; 
import {CurrentUserContext} from '../../context/CurrentUserContext'
import { ToastContainer, toast } from 'react-toastify';

const ProfilePage = () => { 

    const [currentUser,setCurrentUser]=useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [nameIsChanged, setNameIsChanged] = useState(false);
    const updateNameLocally = (e) => {
        setNameIsChanged(true);
        setName(e.target.value)
    }

    const updateNameInDB = async(e) => {
        e.preventDefault();
        fetch("https://xbook-backend.herokuapp.com/profile-update", {
            method: "PUT",
            body: new URLSearchParams({
                name: name,
                userID: currentUser.userid
            }),
        }).then(res => {
            if(res.status === 400){
                toast.error('Update Unsuccessful', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else if(res.status === 200){
                toast.success('Update Successful!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                res.text().then(value => {
                    setCurrentUser(JSON.parse(value))
                })
            }else{
                toast.error(res.status, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }
    return(
        <section className='auth-page'>
             
            <div className='auth-form-section'>
                <form className='auth-form-container' onSubmit={updateNameInDB}>
                    <h2>Profile</h2>
                    <input type="text" placeholder='Name' value={nameIsChanged ? name : currentUser.name} onChange={updateNameLocally} ></input>
                    <input type="email" placeholder='Email' value={currentUser.email} disabled />
                    <button type='submit' disabled = {name === currentUser.name ? true : false}>Update</button>
                    <button onClick={()=>{setCurrentUser(null)}} >Sign Out</button>
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
        </section>
    )
 } 
export default ProfilePage;