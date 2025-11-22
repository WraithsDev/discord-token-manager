# 🎮 Discord Token Yöneticisi

Discord tokenlerini yönetmenizi sağlayan kullanışlı Chrome eklentisi. Token çekme, saklama ve otomatik giriş özellikleriyle.

## ✨ Özellikler

- 🔐 **Token Kopyalama** - Discord web uygulamasından doğrudan token çek
- 📋 **Hızlı Kopyala** - Tokenleri anında panoya kopyala
- 🚀 **Otomatik Giriş** - Kaydedilmiş tokenlerle Discord'a giriş yap
- 🎨 **Modern Arayüz** - Temiz kullanıcı arayüzü

## 📦 Kurulum

1. Bu depoyu indirin veya klonlayın
2. Chrome'u açın ve `chrome://extensions/` adresine gidin
3. **Geliştirici modunu** etkinleştirin (sağ üst)
4. **Paketlenmemiş öğe yükle** butonuna tıklayın
5. Eklenti klasörünü seçin

## 🚀 Kullanım

### Discord'dan Token Çek
1. Tarayıcınızda Discord'u açın
2. Eklenti simgesine tıklayın
3. **"Grab Token"** butonuna tıklayın
4. Token otomatik olarak panoya kopyalanacak

### Token ile Giriş Yap
1. Tokeninizi giriş alanına yapıştırın
2. **"Login"** butonuna tıklayın
3. Discord yeni sekmede otomatik girişle açılacak

### Kayıtlı Tokeni Kopyala
1. **"Copy Token"** butonuna tıklayın
2. Eklenti tokeni Discord'dan veya depodan alacak
3. Token panoya kopyalanacak

## 📁 Proje Yapısı

```
discord-token/
├── manifest.json       # Eklenti yapılandırması
├── popup.html         # Eklenti popup arayüzü
├── popup.js           # Popup mantığı (obfuscated)
├── background.js      # Arka plan servis worker (obfuscated)
├── inject-token.js    # Token enjeksiyonu için content script
├── style.css          # Arayüz stilleri
└── logo.png          # Eklenti ikonu
```

## ⚠️ Sorumluluk Reddi

Bu eklenti yalnızca eğitim amaçlıdır. Sorumlu bir şekilde ve Discord'un Hizmet Şartlarına uygun olarak kullanın.

## 📝 Lisans

MIT Lisansı - İhtiyaç duyduğunuz şekilde kullanmakta ve değiştirmekte özgürsünüz.

---

Discord kullanıcıları için ❤️ ile yapıldı
