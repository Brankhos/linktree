localStorage.setItem("langs", JSON.stringify({
    "en": {
        "navbar": {
            "home": "Home",
            "about": "About",
            "resume": "Resume",
            "portfolio": "Portfolio",
            "services": "Services",
            "contact": "Contact"
        },
        "home": {
            1: "I'm",
            2: "Programmer",
            3: "Photographer",
            4: "Developer",
            5: "FullStack",
        }

    },
    "tr": {
        "navbar": {
            "home": "Anasayfa",
            "about": "Hakkında",
            "resume": "Özgeçmiş",
            "portfolio": "Portföy",
            "services": "Hizmetler",
            "contact": "İletişim"
        },
        "home": {
            1: "Ben",
            2: "Programcıyım",
            3: "Fotoğrafçıyım",
            4: "Geliştiriciyim",
            5: "FullStack'im",
        }

    }
}));

localStorage.setItem("portfoys", JSON.stringify({
    "en": {
        "akilli_durak": {
            "name": "Akıllı Durak",
            "detail": "Ankarada kullanılan EGO uygulamasının daha basit versiyonudur.<br>GPS üzerinden otobüsün konumu güncellenir ve kullanıcıya iletilir.<br>Kalan süreyi gösterirken kullanılan mesafe ölçümü kuş bakışı olarak değil, otobüsün gideceği mesafeye göre hesaplanır.<br><br>Web: Python-Flask",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Bırakıldı/Optimize gerekli",
        },
        "single_reader": {
            "name": "Single Reader",
            "detail": "Herhangi bir EPUB dosyası içeri aktarılarak kullanılabilir bir okuma uygulamasıdır.<br>Kelimeleri istenilen hıza göre ekrana sırayla yazdırılır.<br><br>Android: Python-Kivy",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Yeniden Yazılacak",
        },
        "coin_mate": {
            "name": "Coin Mate",
            "detail": "Verileri Binance Futuresten çeken ve otomatik işlem yapmaya olanak sağlayan bir sistem.<br>Kullanıcı tarafından belirlenen indikatör koşullarına göre işlemi açar veya kapatır.<br><br>Web: Python-Flask",
            "contin": "Devam: Evet",
            "lastStatus": "Durum: Yeniden Yazılacak",
        },
        "drop_shipping": {
            "name": "Drop-Shipping",
            "detail": "DropShipping'te kendi mağazana eklediğin ürünün, eklediğin yerdeki fiyatını karşılaştırır ve eğer ki değişiklik varsa bunu kendi mağazana yansıtır.<br>Satın alarak gönderdiğin ürüne zam gelirse zarar girmemiş olursun.<br><br>Windows: C#",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Bırakıldı/Ölü",
        },
        "ue": {
            "name": "UE Booster",
            "detail": "Unreal Engine motorunun hem Lighting hem de Shader Complierlerini otomatik olarak istenilen önceliğe getirir ve işlemleri hızlandırır.<br><br>Windows: Python-Kivy",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Bırakıldı",
        },
        "eski": {
            "name": "Sosyal Medya",
            "detail": "1-2 sene önce başlayıp yarım kalan bir sosyal meyda projem.<br>Sadece ilk zamanlarında almış olduğum görüntüleri bulabildim.<br><br>Web: PHP-WordPress",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Kayıp",
        }

    },
    "tr": {
        "akilli_durak": {
            "name": "Akıllı Durak",
            "detail": "Ankarada kullanılan EGO uygulamasının daha basit versiyonudur.<br>GPS üzerinden otobüsün konumu güncellenir ve kullanıcıya iletilir.<br>Kalan süreyi gösterirken kullanılan mesafe ölçümü kuş bakışı olarak değil, otobüsün gideceği mesafeye göre hesaplanır.<br><br>Web: Python-Flask",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Bırakıldı/Optimize gerekli",
        },
        "single_reader": {
            "name": "Single Reader",
            "detail": "Herhangi bir EPUB dosyası içeri aktarılarak kullanılabilir bir okuma uygulamasıdır.<br>Kelimeleri istenilen hıza göre ekrana sırayla yazdırılır.<br><br>Android: Python-Kivy",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Yeniden Yazılacak",
        },
        "coin_mate": {
            "name": "Coin Mate",
            "detail": "Verileri Binance Futuresten çeken ve otomatik işlem yapmaya olanak sağlayan bir sistem.<br>Kullanıcı tarafından belirlenen indikatör koşullarına göre işlemi açar veya kapatır.<br><br>Web: Python-Flask",
            "contin": "Devam: Evet",
            "lastStatus": "Durum: Yeniden Yazılacak",
        },
        "drop_shipping": {
            "name": "Drop-Shipping",
            "detail": "DropShipping'te kendi mağazana eklediğin ürünün, eklediğin yerdeki fiyatını karşılaştırır ve eğer ki değişiklik varsa bunu kendi mağazana yansıtır.<br>Satın alarak gönderdiğin ürüne zam gelirse zarar girmemiş olursun.<br><br>Windows: C#",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Bırakıldı/Ölü",
        },
        "ue": {
            "name": "UE Booster",
            "detail": "Unreal Engine motorunun hem Lighting hem de Shader Complierlerini otomatik olarak istenilen önceliğe getirir ve işlemleri hızlandırır.<br><br>Windows: Python-Kivy",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Bırakıldı",
        },
        "eski": {
            "name": "Sosyal Medya",
            "detail": "1-2 sene önce başlayıp yarım kalan bir sosyal meyda projem.<br>Sadece ilk zamanlarında almış olduğum görüntüleri mevcut.<br><br>Web: PHP-WordPress",
            "contin": "Devam: Hayır",
            "lastStatus": "Durum: Kayıp",
        }
    }
}));



