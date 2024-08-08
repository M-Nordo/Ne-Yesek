import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems,food_list,removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Ürünler</p>
          <p>Başlık</p>
          <p>Fiyat</p>
          <p>Miktar</p>
          <p>Toplam</p>
          <p>Sil</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₺{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₺{item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Toplam Fiyat</h2>
          <div>
            <div className="cart-total-details">
              <p>Toplam</p>
              <p>₺{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Teslimat Ücreti</p>
              <p>₺{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Toplam</p>
              <p>₺{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div> 
          </div>
          <button onClick={()=>navigate('/order')}>ÖDEMEYİ GERÇEKLEŞTİR</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>İndirim kodunuz varsa buraya girebilirsiniz.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promosyon kodu'/>
              <button>Gönder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
