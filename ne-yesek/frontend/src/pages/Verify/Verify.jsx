import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
                if (response.data.success) {
                    // 3 saniyelik zaman aşımı
                    setTimeout(() => {
                        navigate("/myorders");
                    }, 3000); // 3 s gecikme
                } else {
                    setTimeout(() => {
                        navigate("/");
                    }, 3000); // 3 s gecikme
                }
            } catch (error) {
                console.error("Ödeme Hatası", error);
                setTimeout(() => {
                    navigate("/");
                }, 3000); // 3 s gecikme
            }
        };

        verifyPayment();
    }, [success, orderId, url, navigate]);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;