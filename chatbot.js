chatbot.js
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إبداع سوفت للأنظمة الخاصة - فرع الحديدة</title>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #121824;
      --card-bg: #1e2638;
      --card-border: #2e3a52;
      --primary: #00b887;
      --primary-hover: #00966d;
      --text-main: #f0f4f8;
      --text-muted: #a0aec0;
      --accent-yellow: #ffb703;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Tajawal', sans-serif; background-color: var(--bg-dark); color: var(--text-main); line-height: 1.6; }

    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 40px;
      background-color: rgba(30, 38, 56, 0.95);
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 1000;
      flex-wrap: wrap;
      gap: 15px;
    }

    .brand-container { display: flex; align-items: center; gap: 15px; text-decoration: none; }
    .brand-logo { width: 50px; height: 50px; object-fit: contain; border-radius: 8px; background: #fff; padding: 2px; }
    .brand-title { font-size: 19px; font-weight: 800; color: var(--primary); text-decoration: none; display: block; }
    .brand-subtitle { font-size: 12px; color: var(--text-muted); display: block; font-weight: 600; }

    .nav-links { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
    .nav-links a { text-decoration: none; color: var(--text-main); font-weight: 500; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: var(--primary); }

    /* زر المساعد الذكي في الهيدر */
    .btn-assistant {
      background: linear-gradient(135deg, #00b887, #00b2e3);
      color: #fff;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      transition: 0.3s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-assistant:hover { opacity: 0.9; transform: translateY(-2px); }

    .hero-section {
      padding: 70px 20px;
      background: radial-gradient(circle at center, #1e2d42 0%, var(--bg-dark) 70%);
      text-align: center;
      border-bottom: 1px solid var(--card-border);
    }
    .hero-section h1 { font-size: 38px; font-weight: 800; color: #fff; margin-bottom: 15px; }
    .hero-section p { font-size: 17px; color: var(--text-muted); max-width: 800px; margin: 0 auto 30px; line-height: 1.8; }

    .systems-section { max-width: 1200px; margin: 50px auto; padding: 0 20px; }
    .section-title { font-size: 26px; color: #fff; margin-bottom: 30px; border-bottom: 2px solid var(--primary); display: inline-block; padding-bottom: 8px; }
    
    .systems-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }
    .system-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 20px;
      text-align: right;
      transition: 0.3s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .system-card:hover { border-color: var(--primary); transform: translateY(-3px); }
    .system-card h3 { color: #fff; font-size: 18px; margin-bottom: 8px; }
    .system-card p { color: var(--text-muted); font-size: 13px; margin-bottom: 15px; }
    .card-link { color: var(--primary); text-decoration: none; font-weight: 700; font-size: 13px; }

    .whatsapp-float {
      position: fixed; bottom: 25px; left: 25px;
      background-color: #25d366; color: white;
      width: 55px; height: 55px; border-radius: 50%;
      display: flex; justify-content: center; align-items: center;
      font-size: 28px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); z-index: 1000; text-decoration: none;
    }

    footer { background-color: #0b0f17; padding: 30px; text-align: center; border-top: 1px solid var(--card-border); color: var(--text-muted); font-size: 13px; }
  </style>
</head>
<body>

  <header class="header-nav">
    <a href="index.html" class="brand-container">
      <img src="images/الشعار.jpg" alt="الشعار" class="brand-logo">
      <div>
        <span class="brand-title">إبداع سوفت للأنظمة الخاصة</span>
        <span class="brand-subtitle">فرع الحديدة - اليمن</span>
      </div>
    </a>
    <nav class="nav-links">
      <a href="index.html">الرئيسية</a>
      <a href="#systems">الأنظمة</a>
      <a href="assistant.html" class="btn-assistant">🤖 المساعد الذكي</a>
      <a href="https://wa.me/967776724021" target="_blank" style="color: #25d366; font-weight: 700;">💬 واتساب 776724021</a>
    </nav>
  </header>

  <section class="hero-section">
    <h1>أنظمة إبداع سوفت المحاسبية والإدارية<br><span style="color: var(--primary); font-size: 26px;">فرع الحديدة - اليمن</span></h1>
    <p>حلول برمجية متكاملة تدار باحترافية لتنظيم الحسابات، المخازن، والمبيعات لمختلف الأنشطة التجارية والصناعية.</p>
    <a href="assistant.html" class="btn-assistant" style="padding: 12px 25px; font-size: 16px;">ابدأ مع المساعد الذكي للتهيئة والشرح</a>
  </section>

  <section class="systems-section" id="systems">
    <h2 class="section-title">بعض الأنظمة المتاحة</h2>
    <div class="systems-grid">
      <div class="system-card">
        <div><h3>دوت اكس برو</h3><p>نظام محاسبي وإداري شامل متعدد الفروع.</p></div>
        <a href="dotxpro.html" class="card-link">عرض التفاصيل &larr;</a>
      </div>
      <div class="system-card">
        <div><h3>مال المحاسبي</h3><p>نظام محاسبي مبسط للأنشطة التجارية المتوسطة والصغيرة.</p></div>
        <a href="maal.html" class="card-link">عرض التفاصيل &larr;</a>
      </div>
      <div class="system-card">
        <div><h3>التاجر المطور</h3><p>نقاط بيع ومخازن متكاملة لإدارة المحلات التجارية.</p></div>
        <a href="tajer.html" class="card-link">عرض التفاصيل &larr;</a>
      </div>
      <div class="system-card">
        <div><h3>شركات الصرافة</h3><p>إدارة شاملة للحوالات وشبكات الصرافة والعملات.</p></div>
        <a href="exchange.html" class="card-link">عرض التفاصيل &larr;</a>
      </div>
    </div>
  </section>

  <a href="https://wa.me/967776724021" class="whatsapp-float" target="_blank" title="تواصل عبر واتساب">💬</a>

  <footer>
    &copy; 2026 إبداع سوفت للأنظمة الخاصة - فرع الحديدة. جميع الحقوق محفوظة.
  </footer>

</body>
</html>