import React from 'react';
import './Home.styles.css';
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import Cover from '../../assets/images/book-covers.png'
const HomePage = () => {
    return (
        <section className="landing">
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
            <div className="home-section">

                <div className='home-content-container'>
                    <h1 className='home-text-heading'>
                        Buy and Sell your book for the best price
                    </h1>

                    <Link to="/shop"><button className='explore-button'>Explore</button></Link>
                </div>
                <div className='home-img-container'>
                    <img className='cover-image' src={Cover} alt='cover' />
                </div>
            </div>
        </section>
    )
}
export default HomePage;