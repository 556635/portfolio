# Git Flow Workflow — Ahmed Abdelbaset Portfolio

هذا المشروع يتبع نموذج **Git Flow** الكلاسيكي بدون أي ملحقات (extensions) — فقط أوامر Git قياسية.

## الفروع (Branching Model)

| Branch | الغرض |
| :--- | :--- |
| `main` | كود الإنتاج المستقر. كل commit هنا = إصدار جديد على GitHub Pages. |
| `develop` | تكامل تطويري يومي. كل الـ features بتندمج هنا. |
| `feature/*` | ميزات جديدة. تُعمل من `develop` وتندمج عليها. |
| `release/*` | تجهيز إصدار وجاهزية النشر. تُعمل من `develop` وتندمج على `main` و `develop`. |
| `hotfix/*` | إصلاحات طارئة في الإنتاج. تُعمل من `main` وتندمج على `main` و `develop`. |

## سير العمل اليومي

### 1. بدء ميزة جديدة
```bash
git checkout develop
git checkout -b feature/my-feature-name
# ... تعمل التعديلات ...
git add .
git commit -m "feat: describe feature"
```

### 2. إنهاء الميزة (دمجها في develop)
```bash
git checkout develop
git merge --no-ff feature/my-feature-name
git branch -d feature/my-feature-name
```

### 3. بدء إصدار (Release)
```bash
git checkout develop
git checkout -b release/v1.0.0
# تثبيت الإصلاحات الأخيرة ورقم الإصدار هنا
git checkout main
git merge --no-ff release/v1.0.0
git tag v1.0.0
git checkout develop
git merge --no-ff release/v1.0.0
git branch -d release/v1.0.0
```

### 4. إصلاح طارئ (Hotfix)
```bash
git checkout main
git checkout -b hotfix/bug-description
# تعمل الإصلاح
git commit -m "fix: describe bug"
git checkout main
git merge --no-ff hotfix/bug-description
git checkout develop
git merge --no-ff hotfix/bug-description
git branch -d hotfix/bug-description
```

## Git Flow Extension (اختياري)

الـ extension يضيف أوامر مختصرة (مثل `git flow feature start x`). تثبيته بسيط:

```bash
# عبر Scoop (أنصح به على Windows)
scoop install git-flow

# أو عبر Chocolatey
choco install gitflow.aviva

# أو الـ Avian build (موصى به):
#   https://github.com/avianca/git-flow
```

> ملاحظة: المشروع لا *يحتاج* الـ extension — كل الأوامر فوق قياسية. الـ extension مجرد اختصار ترفيهي.

## روتين Types of Commits

| Prefix | الاستخدام |
| :--- | :--- |
| `feat:` | ميزة جديدة |
| `fix:` | إصلاح خطأ |
| `refactor:` | إعادة هيكلة بدون تغيير سلوك |
| `style:` | تنسيق/ستايل |
| `docs:` | توثيق |
| `perf:` | تحسين أداء |
| `deploy:` | تغيير خاص بالنشر |

سيتم النشر على GitHub Pages مباشرة من فرع `main`.