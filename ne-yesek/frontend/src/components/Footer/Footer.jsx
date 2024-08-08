import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'> 
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lezzetli ürünler, uygun fiyatlar hepsi bir arada sadece tek tıkla burada...</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>ŞİRKETLER</h2>
            <ul>
                <li>Ana Sayfa</li>
                <li>Hakkında</li>
                <li>Teslimat</li>
                <li>Gizlilik Politikası</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>İLETİŞİM</h2>
            <ul>
                <li>0500 000 00 00</li>
                <li>nordo@nordo.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Mehmet Ali Yayla tarafından tasarlandı - Tüm hakları saklıdır.</p>
    </div>
  )
}

export default Footer
