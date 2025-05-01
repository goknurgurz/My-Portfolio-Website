// mongoose kütüphanesini projeye dahil ediyoruz
const mongoose = require('mongoose');

// mongoose içerisinden Schema constructor'ını alıyoruz
const Schema = mongoose.Schema;

// Kullanıcılar için yeni bir şema (şablon) tanımlıyoruz
const contentSchema = new Schema({
    
    // Kullanıcının kullanıcı adı
    title: {
        type: String,         // Veritipi: String (yani metin)
        required: true,       // Bu alan zorunlu, boş bırakılamaz
    },
    
    // Kullanıcının e-posta adresi
    content: {
        type: String,         // Veritipi: String
        required: true,       // Bu alan da zorunlu
        unique: true,         // Aynı e-posta birden fazla kullanıcıda olamaz
    },
    path: {
        type: String,         // Veritipi: String
        required: true,       // Bu alan da zorunlu
        unique: true,         // Aynı e-posta birden fazla kullanıcıda olamaz
    },
    
    // Kullanıcının şifresi
    name: {
        type: String,         // Veritipi: String
        required: true,       // Şifre alanı da zorunlu
    },
});

// Yukarıda tanımlanan şemaya göre 'User' adında bir model oluşturuyoruz
// Bu model MongoDB'deki "users" koleksiyonu (collection) ile eşleşir
const Content = mongoose.model('Content', contentSchema);

// Bu modeli diğer dosyalarda kullanabilmek için dışa aktarıyoruz (export)
module.exports = Content;
