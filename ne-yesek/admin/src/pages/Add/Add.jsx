import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salatalar"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value})) 
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/food/add`,formData);
        if (response.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salatalar"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    /*useEffect(()=>{
        console.log(data);
    },[data]) 'bu kısım projenin testi için kullanılabilir,kullanmak için useEffecti import ediniz.'*/ 

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Görsel Yükle</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
            <p>Ürün Adı</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Ürün adı' />
        </div>
        <div className="add-product-description flex-col">
            <p>Ürün Açıklaması</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Açıklamayı girin' required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Ürün Kategorisi</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Salatalar">Salatalar</option>
                    <option value="Dönerler">Dönerler</option>
                    <option value="Çiğ Köfte">Çiğ Köfte</option>
                    <option value="Ev Yemekleri">Ev Yemekleri</option>
                    <option value="Kebaplar">Kebaplar</option>
                    <option value="Pastane">Pastane</option>
                    <option value="Pilav">Pilav</option>
                    <option value="Pide">Pide</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Ürün Fiyatı</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₺20'/>
            </div>
        </div>
        <button type='submit' className='add-btn'>EKLE</button>
      </form>
    </div>
  )
}

export default Add
