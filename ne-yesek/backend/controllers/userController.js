import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Token oluşturma
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Bilgiler hatalıdır." });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Hata" });
    }
};

// Kullanıcı kayıt
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // E-posta doğrulaması
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Lütfen geçerli bir e-posta adresi giriniz." });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Lütfen güçlü bir şifre giriniz." });
        }

        // Kullanıcı kaydını kontrol et
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Kullanıcı zaten kayıtlıdır." });
        }

        // Şifreyi hashle
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Hata" });
    }
}

export { loginUser, registerUser };