# سند: نسخة ويندوز 10 (exe)

## الأيقونة
ضع صورتك مكان الملفين التاليين (اسمهما icon.png، مربعة، 512×512 أو أكبر):
- `build/icon.png`  (أيقونة ملف الـ exe)
- `www/icon.png`    (أيقونة النافذة وشعار التطبيق)
الملف الحالي صورة مؤقتة، وإن كان اسم صورتك "sand icon.png" فغيّر اسمها إلى icon.png.

## الهيكل
```
sanad-windows/
├── package.json
├── README-AR.md
├── build/icon.png
├── electron/main.js, preload.js
├── scripts/copy-vendor.js
└── www/index.html, icon.png, vendor/ (يُنشأ تلقائيًا)
```

## البناء (Node.js 18+ مطلوب)
```
npm install
npm start            # تجربة
npm run build:win    # البناء
```
الناتج في dist/: ملف تثبيت (Setup) ونسخة Portable.
البيانات تُحفظ في: المستندات\Sanad (sanad.sqlite والملفات والنسخ الاحتياطية)، مستقلة عن المتصفح.
