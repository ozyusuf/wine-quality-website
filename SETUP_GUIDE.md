# 🚀 Wine Quality Presentation Website - Kurulum Rehberi

Bu rehber, ML projesinden web sitesi projesine hangi dosyaları kopyalamanız gerektiğini adım adım açıklar.

---

## 📂 Adım 1: Yeni Proje Klasörü Oluştur

Masaüstünde (veya istediğiniz yerde) yeni bir klasör oluşturun:

```
wine-quality-presentation/
```

---

## 📂 Adım 2: Gerekli Dosyaları Kopyala

### 2.1. Prompt ve Bu Rehberi Kopyala

ML projesinden şu dosyaları yeni projenin **root** dizinine kopyalayın:

| Kaynak (ML Projesi) | Hedef (Website Projesi) |
|---------------------|-------------------------|
| `WEBSITE_PROMPT.md` | `wine-quality-presentation/WEBSITE_PROMPT.md` |
| `SETUP_GUIDE.md` | `wine-quality-presentation/SETUP_GUIDE.md` |

---

### 2.2. Assets Klasör Yapısını Oluştur

Yeni projede şu klasör yapısını oluşturun:

```
wine-quality-presentation/
└── assets/
    └── ml-project/
        ├── images/
        │   ├── red-wine/
        │   ├── white-wine/
        │   └── combined/
        ├── models/
        └── docs/
```

---

### 2.3. Görsel Dosyaları Kopyala

#### 🍷 Red Wine Görselleri
**Kaynak:** `ml_final/red_wine/outputs/`  
**Hedef:** `wine-quality-presentation/assets/ml-project/images/red-wine/`

| Dosya Adı | Açıklama |
|-----------|----------|
| `red_shap_summary_dot.png` | SHAP Feature Importance (Ana görsel) |
| `red_shap_summary_bar.png` | SHAP Bar Chart |
| `red_shap_force_plot.png` | Bireysel tahmin açıklaması |
| `red_rf_confusion_matrix_v3.png` | Confusion Matrix |
| `red_rf_roc_curve.png` | ROC Curve |
| `red_rf_calibration_curve.png` | Calibration Curve |
| `red_rf_learning_curve.png` | Learning Curve |
| `red_cv_distribution.png` | Cross-Validation Distribution |
| `red_wine_correlation_v3.png` | Correlation Heatmap |
| `red_wine_distribution_v3.png` | Class Distribution |
| `red_threshold_sensitivity.png` | Threshold Analysis |

#### 🥂 White Wine Görselleri
**Kaynak:** `ml_final/white_wine/outputs/`  
**Hedef:** `wine-quality-presentation/assets/ml-project/images/white-wine/`

| Dosya Adı | Açıklama |
|-----------|----------|
| `white_shap_summary_dot.png` | SHAP Feature Importance |
| `white_shap_summary_bar.png` | SHAP Bar Chart |
| `white_shap_force_plot.png` | Bireysel tahmin açıklaması |
| `white_rf_confusion_matrix_v3.png` | Confusion Matrix |
| `white_rf_roc_curve.png` | ROC Curve |
| `white_rf_calibration_curve.png` | Calibration Curve |
| `white_rf_learning_curve.png` | Learning Curve |
| `white_cv_distribution.png` | Cross-Validation Distribution |
| `03_correlation_heatmap_v3.png` | Correlation Heatmap |
| `07_class_distribution_v3.png` | Class Distribution |
| `white_threshold_sensitivity.png` | Threshold Analysis |

#### ⚗️ Combined Analysis Görselleri
**Kaynak:** `ml_final/combined_outputs/`  
**Hedef:** `wine-quality-presentation/assets/ml-project/images/combined/`

| Dosya Adı | Açıklama |
|-----------|----------|
| `combined_shap_summary_dot.png` | SHAP Feature Importance |
| `combined_shap_summary_bar.png` | SHAP Bar Chart |
| `combined_shap_force_plot.png` | Bireysel tahmin açıklaması |
| `combined_confusion_matrix.png` | Confusion Matrix |
| `combined_xgb_roc_curve.png` | ROC Curve (XGBoost) |
| `combined_rf_roc_curve.png` | ROC Curve (Random Forest) |
| `combined_rf_calibration_curve.png` | Calibration Curve |
| `combined_rf_learning_curve.png` | Learning Curve |
| `combined_cv_distribution.png` | CV Distribution |
| `combined_feature_importance.png` | Feature Importance (Type variable) |
| `combined_correlation_heatmap.png` | Correlation Heatmap |

---

### 2.4. Model Dosyalarını Kopyala (Opsiyonel - Canlı Demo İçin)

Eğer backend API veya ONNX dönüşümü yapacaksanız:

**Hedef:** `wine-quality-presentation/assets/ml-project/models/`

| Kaynak | Dosya Adı |
|--------|-----------|
| `ml_final/red_wine/outputs/` | `red_production_pipeline.pkl` |
| `ml_final/white_wine/outputs/` | `white_production_pipeline.pkl` |
| `ml_final/combined_outputs/` | `combined_production_pipeline.pkl` |

---

### 2.5. Dokümantasyonu Kopyala

**Hedef:** `wine-quality-presentation/assets/ml-project/docs/`

| Kaynak | Dosya Adı |
|--------|-----------|
| `ml_final/` | `FINAL_PROJECT_REPORT.md` |
| `ml_final/` | `FINAL_PROJECT_REPORT.html` (opsiyonel) |

---

## ✅ Adım 3: Doğrulama Checklist

Kopyalama işlemi sonrası klasör yapınız şöyle olmalı:

```
wine-quality-presentation/
├── WEBSITE_PROMPT.md          ✓
├── SETUP_GUIDE.md             ✓
└── assets/
    └── ml-project/
        ├── images/
        │   ├── red-wine/
        │   │   ├── red_shap_summary_dot.png    ✓
        │   │   ├── red_rf_confusion_matrix_v3.png    ✓
        │   │   ├── red_rf_roc_curve.png    ✓
        │   │   └── ... (11 dosya)
        │   ├── white-wine/
        │   │   ├── white_shap_summary_dot.png    ✓
        │   │   └── ... (11 dosya)
        │   └── combined/
        │       ├── combined_shap_summary_dot.png    ✓
        │       └── ... (11 dosya)
        ├── models/
        │   ├── red_production_pipeline.pkl    ✓
        │   ├── white_production_pipeline.pkl    ✓
        │   └── combined_production_pipeline.pkl    ✓
        └── docs/
            └── FINAL_PROJECT_REPORT.md    ✓
```

**Toplam:** ~33 görsel dosya + 3 model dosyası + 1 dokümantasyon

---

## 🎯 Adım 4: AI Ajanını Başlat

1. Yeni projeyi tercih ettiğiniz AI destekli IDE'de açın (Cursor, VS Code + Copilot, vb.)
2. `WEBSITE_PROMPT.md` dosyasının içeriğini AI ajanına verin
3. AI ajanın talimatları takip etmesini izleyin

---

## 💡 İpuçları

### Hızlı Kopyalama (Windows PowerShell)

ML projesi dizinindeyken şu komutları çalıştırabilirsiniz:

```powershell
# Hedef klasörleri oluştur
$dest = "C:\Users\Yusuf\Desktop\wine-quality-presentation"
New-Item -ItemType Directory -Force -Path "$dest\assets\ml-project\images\red-wine"
New-Item -ItemType Directory -Force -Path "$dest\assets\ml-project\images\white-wine"
New-Item -ItemType Directory -Force -Path "$dest\assets\ml-project\images\combined"
New-Item -ItemType Directory -Force -Path "$dest\assets\ml-project\models"
New-Item -ItemType Directory -Force -Path "$dest\assets\ml-project\docs"

# Prompt ve rehberi kopyala
Copy-Item "WEBSITE_PROMPT.md" "$dest\"
Copy-Item "SETUP_GUIDE.md" "$dest\"

# Görselleri kopyala
Copy-Item "red_wine\outputs\*.png" "$dest\assets\ml-project\images\red-wine\"
Copy-Item "white_wine\outputs\*.png" "$dest\assets\ml-project\images\white-wine\"
Copy-Item "combined_outputs\*.png" "$dest\assets\ml-project\images\combined\"

# Modelleri kopyala
Copy-Item "red_wine\outputs\*_pipeline.pkl" "$dest\assets\ml-project\models\"
Copy-Item "white_wine\outputs\*_pipeline.pkl" "$dest\assets\ml-project\models\"
Copy-Item "combined_outputs\*_pipeline.pkl" "$dest\assets\ml-project\models\"

# Dokümantasyonu kopyala
Copy-Item "FINAL_PROJECT_REPORT.md" "$dest\assets\ml-project\docs\"
```

---

## 🆘 Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| Görsel dosyalar bulunamıyor | ML projesinde analiz scriptlerini tekrar çalıştırın |
| .pkl dosyaları çok büyük | Sadece Option B (JavaScript prediction) kullanın |
| AI ajan assets yolunu bulamıyor | Dosya yollarını göreceli olarak güncelleyin |

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. `FINAL_PROJECT_REPORT.md` dosyasını kontrol edin
2. Görsel dosyalarının doğru konumda olduğunu doğrulayın
3. AI ajanına spesifik hata mesajını gösterin

---

**İyi sunumlar! 🍷🚀**
