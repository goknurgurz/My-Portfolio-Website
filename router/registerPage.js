// express modülünü projeye dahil ediyoruz
const express = require("express");
const router = express.Router();

// Kullanıcı modelini projeye dahil ediyoruz
const { join } = require("path");
const User = require(join(__dirname, "../model/userModel"));

// GET: register sayfasını getir
router.get("/", (req, res) => {
  res.render("site/register");
});

// POST: register formu gönderildiğinde çalışacak
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Boş alan kontrolü
    if (!username || !email || !password) {
      return res.json({
        case: false,
        message: "Please fill all fields",
      });
    }

    // Şifre uzunluk kontrolü (örneğin 6-20 karakter arası)
    if (password.length < 6 || password.length > 20) {
      return res.json({
        case: false,
        message: "Password must be between 6 and 20 characters",
      });
    }

    // E-posta gmail mi?
    const gmailRGX = /@gmail\.com$/i;
    if (!gmailRGX.test(email)) {
      return res.json({
        case: false,
        message: "Please use a valid Gmail address",
      });
    }

    // Aynı email kayıtlı mı?
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.json({
        case: false,
        message: "This email is already registered",
      });
    }

    // Kullanıcıyı kaydet (şifre düz yazı olarak kaydediliyor — güvenlik riski!)
    const newUser = new User({
      username,
      email,
      password, // burada hashleme yapılmıyor
    });

    await newUser.save(); //veri tabanina veri cekme komutu

    return res.json({
      case: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: "Something went wrong",
    });
  }
});

// router'ı dışa aktarıyoruz
module.exports = router;
