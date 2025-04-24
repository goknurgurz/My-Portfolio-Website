// mongoose kütüphanesini projeye dahil ediyoruz
const mongoose = require('mongoose');

// mongoose içerisinden Schema constructor'ını alıyoruz
const Schema = mongoose.Schema;

// Kullanıcılar için yeni bir şema (şablon) tanımlıyoruz
const userSchema = new Schema({
    
    // Kullanıcının kullanıcı adı
    username: {
        type: String,         // Veritipi: String (yani metin)
        required: true,       // Bu alan zorunlu, boş bırakılamaz
    },
    
    // Kullanıcının e-posta adresi
    email: {
        type: String,         // Veritipi: String
        required: true,       // Bu alan da zorunlu
        unique: true,         // Aynı e-posta birden fazla kullanıcıda olamaz
    },
    
    // Kullanıcının şifresi
    password: {
        type: String,         // Veritipi: String
        required: true,       // Şifre alanı da zorunlu
    },
});

// Yukarıda tanımlanan şemaya göre 'User' adında bir model oluşturuyoruz
// Bu model MongoDB'deki "users" koleksiyonu (collection) ile eşleşir
const User = mongoose.model('User', userSchema);

// Bu modeli diğer dosyalarda kullanabilmek için dışa aktarıyoruz (export)
module.exports = User;
