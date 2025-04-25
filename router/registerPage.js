// Gerekli modülleri ve dosyaları projeye dahil ediyoruz
const express = require("express");
const router = express.Router();
const { join } = require("path");

// Kullanıcı modelimizi içeri aktarıyoruz
const User = require(join(__dirname, "../model/userModel"));

// ROUTE: GET /register
// Kayıt sayfasını kullanıcıya gösteriyoruz
router.get("/", (req, res) => {
  // Eğer kullanıcı zaten giriş yaptıysa, kayıt sayfasına erişmemeli
  if (res.locals.user) {
    return res.redirect("/error"); // Hatalı erişim yönlendirmesi
  }

  // Kullanıcı giriş yapmadıysa, kayıt sayfasını render et
  res.render("site/register");
});

// ROUTE: POST /register
// Kayıt formu gönderildiğinde bu kısım çalışacak
router.post("/", (req, res) => {
  const { username, email, password } = req.body; // Formdan gelen veriler

  // 1. Boş alan kontrolü
  if (!username || !email || !password) {
    return res.json({
      case: false,
      message: "Please fill all fields", // Alanlar eksikse uyarı
    });
  }

  // 2. Şifre uzunluğu kontrolü
  if (password.length < 6 || password.length > 20) {
    return res.json({
      case: false,
      message: "Password must be between 6 and 20 characters", // Şifre çok kısa/uzun
    });
  }

  // 3. E-posta Gmail mi? (Sadece @gmail.com kabul ediliyor)
  const gmailRGX = /@gmail\.com$/i;
  if (!gmailRGX.test(email)) {
    return res.json({
      case: false,
      message: "Please use a valid Gmail address", // Diğer mail adresleri reddedilir
    });
  }

  // 4. Aynı email daha önce kayıt edilmiş mi kontrolü
  User.findOne({ email })
    .then((isExist) => {
      if (isExist) {
        return res.json({
          case: false,
          message: "This email is already registered", // Daha önce kayıt yapılmışsa uyarı
        });
      }

      // 5. Yeni kullanıcı nesnesi oluşturuluyor
      const user = new User({
        username: username,
        email: email,
        password: password, // (Not: Gerçek uygulamalarda şifre hashlenmelidir)
      });

      // 6. Yeni kullanıcı veritabanına kaydediliyor
      user.save()
        .then((data) => {
          // 7. Kayıt başarılıysa kullanıcının ID'si alınıyor
          let ID = data._id;
          ID = String(ID); // ID'yi string'e çeviriyoruz

          // 8. Oturum başlat: kullanıcıyı session'a ekliyoruz
          req.session.userID = ID;

          // 9. JSON olarak başarı mesajı gönderiyoruz
          return res.json({
            case: true,
            message: "User registered successfully and logged in",
          });
        })
        .catch((err) => {
          // 10. Kullanıcı kaydedilirken hata oluşursa
          console.error("User Save Error:", err);
          return res.json({
            case: false,
            message: "Failed to save user",
          });
        });
    })
    .catch((err) => {
      // 11. Veritabanı sorgusunda genel bir hata oluşursa
      console.error("FindOne Error:", err);
      return res.json({
        case: false,
        message: "Something went wrong",
      });
    });
});

// Router'ı dışa aktarıyoruz ki başka yerlerde kullanılabilsin
module.exports = router;
