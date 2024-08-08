import userModel from "../models/userModel.js"

//Kullanıcının sepetine ürünleri ekleme
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) 
        {
            cartData[req.body.itemId] = 1;   
        } 
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Sepete Eklendi"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata"})
    }
}


//Kullanıcının sepetinden ürün silme
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Ürün Sepetten Kaldırıldı"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata"})
    }
}


//Kullanıcının sepet verilerini getir (fetch)
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata"})
    }
}

export {addToCart,removeFromCart,getCart}
