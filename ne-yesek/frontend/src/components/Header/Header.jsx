import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Bugün Ne Yemek İstersiniz ?</h2>
        <p>Dilediğiniz ürünler şimdi çok daha uygun fiyatlı olarak adresinize kısa sürede teslim edilir.</p>
        <button>Menüye Bak</button>
      </div>
    </div>
  )
}

export default Header
