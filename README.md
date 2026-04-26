# Tic Tac Toe

Tic Tac Toe oyunu - Terminal ve Web versiyonu

## Terminal Versiyonu

```bash
python3 main.py
```

Oyuncular sırayla 1-9 arasında bir numara girerek hamle yapar.

## Web Versiyonu

### Kurulum

```bash
pip install -r requirements.txt
```

### Başlatma

```bash
cd web
python3 app.py
```

Tarayıcıda açın: `http://localhost:5000`

## Proje Yapısı

### Terminal
- `main.py` - Ana giriş noktası
- `game.py` - Oyun mantığı
- `board.py` - Tahta gösterimi
- `player.py` - Oyuncu sınıfı

### Web
- `web/app.py` - Flask sunucusu
- `web/templates/index.html` - HTML sayfası
- `web/static/css/style.css` - Stil dosyası
- `web/static/js/game.js` - JavaScript oyun mantığı
