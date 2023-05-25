import React, { useState } from 'react';
import './Shop.styles.css';
import BuyPage from '../Buy/Buy.page'
import SellPage from '../Sell/Sell.page'
import ProfilePage from '../Profile/Profile.page'
import Logo from '../../assets/images/logo.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState("Buy");
    const history = useHistory();
    return (
        <section className='shop-page'>
            <div className="nav-bar">
                <div className="logo-container">
                    <img src={Logo} alt='Logo' onClick={() => {history.push("/home")}} />
                </div>
                <div className="nav-link-container">
                    <ul>
                        <li className={currentPage === "Buy" ? "nav-link-active" : "nav-link"} onClick={() => setCurrentPage("Buy")}>Buy</li>
                        <li className={currentPage === "Sell" ? "nav-link-active" : "nav-link"} onClick={() => setCurrentPage("Sell")}>Sell</li>
                        <li className={currentPage === "Profile" ? "nav-link-active" : "nav-link"} onClick={() => setCurrentPage("Profile")}>Profile</li>
                    </ul>
                </div>
            </div>
            <div className='content-section'>
                {
                    currentPage === "Buy" ? <BuyPage /> : currentPage === "Sell" ? <SellPage /> : currentPage === "Profile" ? <ProfilePage /> : null
                }
            </div>
        </section>
    )
}
export default ShopPage;