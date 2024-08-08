import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Giriş Yap");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Giriş Yap") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("API error:", error);
            alert("Bir hata oluştu.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Üye Ol" && <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Adınız' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='e-postanız' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='şifreniz' required />
                </div>
                <button type='submit'>{currState === "Üye Ol" ? "Hesap Oluştur" : "Giriş Yap"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Devam ederek Gizlilik Politikasını ve Kullanıcı Sözleşmesini kabul etmiş olursunuz.</p>
                </div>
                {currState === "Giriş Yap"
                    ? <p>Yeni bir hesap oluştur. <span onClick={() => setCurrState("Üye Ol")}>Buraya Tıklayın</span></p>
                    : <p>Zaten bir hesaba sahip misiniz ? <span onClick={() => setCurrState("Giriş Yap")}>Giriş Yapınız</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;