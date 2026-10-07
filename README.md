# Ahmed Abdelbaset Hamza - Portfolio & GitHub Pages Package

> **بورتفوليو مهندس البنية التحتية والشبكات والأنظمة (أحمد عبد الباسط)**  
> حزمة متكاملة تتضمن موقع بورتفوليو تفاعلي عالي الأداء جاهز للنشر على **GitHub Pages**، بالإضافة إلى ملف **GitHub Profile README** احترافي.

---

## 📁 محتويات المشروع (Project Structure)

```text
ahmed-portfolio/
│
├── index.html                  # الصفحة الرئيسية للبورتفوليو (Hero, About, Skills, Projects, Terminal, Contact)
├── style.css                   # التنسيقات العصرية، الوضع الليلي والنهاري (Dark/Light)، والتصميم المتجاوب بالكامل
├── script.js                   # محرك التفاعل (الوضع الليلي، محاكي التيرمينال، فلترة المهارات، الكتابة التلقائية)
├── Ahmed_Abdelbaset_CV.html    # نسخة السيرة الذاتية التفاعلية المدمجة للتحميل والمعاينة المباشرة
├── GITHUB_PROFILE_README.md    # ملف README مخصص لبروفايل جيت هب الرئيسي (username/username)
└── README.md                   # دليل التشغيل والنشر السريع (هذا الملف)
```

---

## 🚀 طريقة نشر البورتفوليو ليصبح متاحاً أونلاين (Live on GitHub Pages)

يمكنك جعل موقعك حياً ومتاحاً للجميع برابط مجاني مثل `https://<YOUR_USERNAME>.github.io/portfolio/` في أقل من دقيقتين عبر الخطوات التالية:

### الخطوة 1: إنشاء مستودع جديد على جيت هب (New Repository)
1. افتح حسابك على [GitHub.com](https://github.com).
2. اضغط على علامة **`+`** بالأعلى واختر **New repository**.
3. قم بتسمية المستودع مثلاً: `portfolio` (أو سمّه `<username>.github.io` إذا أردته أن يكون موقعك الرئيسي مباشرة).
4. تأكد من أن يكون المستودع **Public**.
5. اضغط **Create repository**.

### الخطوة 2: رفع الملفات عبر التيرمينال (Git Push)
افتح الـ Terminal (أو PowerShell) داخل مجلد المشروع `scratch/ahmed-portfolio`:

```bash
git init
git add .
git commit -m "feat: initial release of Ahmed Abdelbaset portfolio"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/portfolio.git
git push -u origin main
```

*(أو يمكنك بدلاً من ذلك فتح صفحة المستودع على جيت هب والضغط على **Upload files** وسحب جميع ملفات هذا المجلد وإفلاتها مباشرة).*

### الخطوة 3: تفعيل GitHub Pages (تفعيل الرابط المباشر بضغطة زر)
1. داخل صفحة المستودع على GitHub، اضغط على تبويب **Settings**.
2. من القائمة الجانبية اليسرى، اضغط على **Pages**.
3. تحت قسم **Build and deployment**:
   - تأكد من اختيار **Source: Deploy from a branch**.
   - اختر Branch: **`main`** ثم اختر المجلد **`/(root)`**.
   - اضغط **Save**.
4. خلال دقيقة واحدة، ستجد جيت هب يعطيك الرابط المباشر لموقعك:  
   👉 `https://<YOUR_USERNAME>.github.io/portfolio/`

---

## 🌟 كيفية استخدام بروفايل GitHub README الاحترافي

لجعل صفحة حسابك على GitHub تبدو خارقة واستثنائية:
1. أنشئ مستودعاً جديداً على GitHub يحمل **نفس اسم المستخدم الخاص بك بالضبط** (مثال: إذا كان يوزرك `ahmedabdelbast`، اجعل اسم المستودع `ahmedabdelbast`).
2. اختر أن يكون المستودع **Public** ومفعلاً به خيار `Add a README file`.
3. انسخ محتويات الملف المرفق [GITHUB_PROFILE_README.md](file:///C:/Users/Ahmed/.gemini/antigravity/scratch/ahmed-portfolio/GITHUB_PROFILE_README.md) وضعها داخل الـ `README.md` الخاص بهذا المستودع ثم احفظ التغييرات.
4. ستظهر كل الإحصائيات والشعارات وروابط البورتفوليو فوراً في الصفحة الرئيسية لحسابك على جيت هب!

---

## ✨ المميزات الفنية في البورتفوليو
- **تصميم فائق السرعة والخفة:** بدون أي إطارات عمل ثقيلة، يفتح في أجزاء من الثانية.
- **تجاوب 100%:** مظهر ممتاز على الهواتف الذكية، الأجهزة اللوحية، والشاشات الكبيرة.
- **دعم الوضعين الليلي والنهاري (Dark / Light Theme):** مع حفظ اختيار الزائر تلقائياً.
- **محاكي Terminal تفاعلي حقيقي:** يدعم أوامر مثل `help`, `skills`, `uptime`, `ping`, `download-cv`, `contact`.
- **فلترة تفاعلية للمهارات:** مقسمة حسب التخصص (Virtualization, Firewalls, Networking, Systems, ITSM).
- **أزرار سريعة للتحميل والتواصل:** روابط مباشرة للواتساب، الهاتف، الإيميل، ولينكد إن، وتنزيل السيرة الذاتية بضغطة واحدة.
