import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ADS, CATEGORIES, DEALS, SITE, type Advertisement, type Category, type Deal } from "./data";

type LocalUser = { id: number; fullName: string; email: string; password: string };

type IconName = "search" | "heart" | "user" | "arrow" | "spark" | "close" | "menu" | "external" | "check" | "globe" | "lock" | "mail";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
    heart: <path d="M20.8 8.8c0 5.1-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.8a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />,
    user: <><circle cx="12" cy="8" r="3.4" /><path d="M5 20c.5-3.5 3.2-5.6 7-5.6s6.5 2.1 7 5.6" /></>,
    arrow: <><path d="M19 12H5" /><path d="m12 5-7 7 7 7" /></>,
    spark: <><path d="m12 2 1.6 7.1L21 12l-7.4 2.9L12 22l-1.6-7.1L3 12l7.4-2.9L12 2Z" /><path d="m19 2 .7 2.3L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7L19 2Z" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const copy = {
  ar: {
    line: "مساحتكِ الصغيرة التي تجمع لكِ أجمل الاختيارات",
    search: "ابحثي عن مكياج، عناية، أزياء...",
    login: "دخول / عضوية",
    deals: "اكتشفي العروض",
    heroTag: "كل ما تحبينه، بسعر ألطف",
    heroTitle: <>جمالكِ يبدأ<br />بـ <em>صفقة أجمل.</em></>,
    heroText: "جمعنا لكِ اختيارات نحبّها من المكياج والعناية والأزياء — عروض موثوقة، تفاصيل واضحة، ورابط مباشر للمتجر.",
    browse: "تصفّحي العروض",
    categories: "تسوّقي حسب اهتمامكِ",
    categoriesNote: "اختيارات صغيرة، فرحة كبيرة",
    picks: "اختيارات وردة لهذا الأسبوع",
    picksNote: "عروض جميلة اكتشفناها لكِ، قبل ما تفوتكِ.",
    all: "كل العروض",
    favorites: "مفضلاتي",
    sort: "الترتيب:",
    featured: "الأكثر تميزًا",
    discountSort: "أعلى تخفيض",
    priceLow: "السعر: الأقل أولًا",
    savedOnly: "العروض المحفوظة",
    noDeals: "ما لقينا عروض بهذا الاختيار",
    noDealsNote: "جربي قسمًا آخر أو امسحي كلمات البحث.",
    clear: "عرض كل العروض",
    sideTitle: "لحظات صغيرة، جمال أكبر",
    sideText: "نحدّث اختياراتنا باستمرار لتجدي ما يستحق التجربة.",
    sideCta: "أضيفي موقعكِ للإعلانات",
    trusted: "تسوّقي بذكاء",
    trustedText: "نحوّل لكِ كل عرض مباشرة إلى متجره.",
    footerTag: "الجمال أحلى لما يكون اختياركِ.",
    join: "انضمي لمجتمع وردة",
    joinNote: "احفظي عروضكِ المفضلة وعودي إليها في أي وقت.",
    member: "عضوية مجانية",
    searchResults: "نتائج البحث عن",
    product: "مشاهدة العرض",
    saved: "تم حفظ العرض في مفضلاتكِ",
    removed: "تمت إزالة العرض من المفضلة",
    loginFirst: "سجّلي الدخول لحفظ عروضكِ المفضلة",
    authTitleLogin: "أهلًا بعودتكِ",
    authTitleRegister: "مساحة جميلة لكِ",
    authNote: "سجّلي الدخول لمتابعة عروضكِ المفضلة.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submitLogin: "تسجيل الدخول",
    submitRegister: "إنشاء عضوية مجانية",
    switchRegister: "عضوية جديدة؟ أنشئي حسابكِ",
    switchLogin: "لديكِ حساب؟ سجّلي الدخول",
    close: "إغلاق",
    dealsCount: "عرضًا مختارًا",
  },
  en: {
    line: "Your little corner for lovely finds",
    search: "Search makeup, skincare, fashion...",
    login: "Sign in / Join",
    deals: "Explore deals",
    heroTag: "Everything you love, for a little less",
    heroTitle: <>Your glow starts<br />with a <em>lovelier deal.</em></>,
    heroText: "Beauty, skincare and fashion finds we love — thoughtfully picked offers, clear details, and a direct link to each store.",
    browse: "Browse the deals",
    categories: "Shop by your mood",
    categoriesNote: "Little finds, lovely moments",
    picks: "Warda’s picks this week",
    picksNote: "Lovely finds we spotted for you, before they’re gone.",
    all: "All deals",
    favorites: "Saved",
    sort: "Sort by:",
    featured: "Featured",
    discountSort: "Biggest discount",
    priceLow: "Price: low to high",
    savedOnly: "Your saved deals",
    noDeals: "No finds in this collection yet",
    noDealsNote: "Try another category or clear your search.",
    clear: "Show all deals",
    sideTitle: "A little moment, a little glow",
    sideText: "We refresh our finds often so there’s always something lovely to discover.",
    sideCta: "Advertise with us",
    trusted: "Shop thoughtfully",
    trustedText: "Every offer takes you straight to the retailer.",
    footerTag: "Beauty feels better when it’s your choice.",
    join: "Join the Warda circle",
    joinNote: "Save lovely finds and come back to them anytime.",
    member: "Free membership",
    searchResults: "Results for",
    product: "Shop this deal",
    saved: "Saved to your favourites",
    removed: "Removed from favourites",
    loginFirst: "Sign in to save your lovely finds",
    authTitleLogin: "Welcome back",
    authTitleRegister: "A lovely space for you",
    authNote: "Sign in to keep up with your favourite finds.",
    name: "Full name",
    email: "Email address",
    password: "Password",
    submitLogin: "Sign in",
    submitRegister: "Create a free account",
    switchRegister: "New to Warda? Create an account",
    switchLogin: "Already a member? Sign in",
    close: "Close",
    dealsCount: "curated finds",
  },
};

function discountOf(deal: Deal) {
  return Math.max(0, Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100));
}

function AdBlock({ ad, placement, isEn }: { ad?: Advertisement; placement: Advertisement["placement"]; isEn: boolean }) {
  if (ad) {
    return (
      <a className={`ad-banner ad-${placement} has-ad`} href={ad.targetUrl} target="_blank" rel="noreferrer noopener" aria-label={isEn ? ad.titleEn || ad.titleAr : ad.titleAr}>
        {ad.imageUrl ? <img src={ad.imageUrl} alt={isEn ? ad.titleEn || ad.titleAr : ad.titleAr} /> : <span className="ad-banner-copy"><small>{isEn ? "SPONSORED" : "إعلان مدفوع"}</small><strong>{isEn ? ad.titleEn || ad.titleAr : ad.titleAr}</strong></span>}
        <span className="ad-label">{isEn ? "AD" : "إعلان"}</span>
      </a>
    );
  }

  return (
    <a className={`ad-banner ad-${placement} ad-placeholder`} href="mailto:ads@warda.example?subject=Warda%20advertising">
      {placement === "sidebar" ? <span className="ad-placeholder-flower">✿</span> : <span className="ad-placeholder-flower">✧</span>}
      <span className="ad-banner-copy">
        <small>{isEn ? "A NOTE FOR YOUR BRAND" : "مساحة مخصصة لعلامتكِ"}</small>
        <strong>{isEn ? "A lovely space for your brand" : "مساحة إعلانية مميزة"}</strong>
        <span>{isEn ? "Meet a community that cares about beauty and style." : "وصّلي علامتكِ التجارية إلى مجتمع يهتم بالجمال والأناقة."}</span>
      </span>
      <span className="ad-label">{isEn ? "AD" : "إعلان"}</span>
    </a>
  );
}

function ProductCard({
  deal,
  category,
  isEn,
  isSaved,
  onFavorite,
  labels,
}: {
  deal: Deal;
  category?: Category;
  isEn: boolean;
  isSaved: boolean;
  onFavorite: () => void;
  labels: typeof copy.ar;
}) {
  const title = isEn ? deal.titleEn || deal.titleAr : deal.titleAr;
  const description = isEn ? deal.descriptionEn || deal.descriptionAr : deal.descriptionAr;
  const discount = discountOf(deal);
  return (
    <article className="product-card" id={`deal-${deal.id}`}>
      <div className="product-image-wrap">
        <a href={deal.productUrl} target="_blank" rel="noreferrer noopener" aria-label={title} className="product-image-link">
          <img className="product-image" src={deal.imageUrl || "/images/warda-editorial.png"} alt={title} loading="lazy" />
        </a>
        <span className="discount-badge">-{discount}%</span>
        {deal.isFeatured && <span className="featured-pill"><Icon name="spark" size={12} /> {isEn ? "Warda pick" : "اختيار وردة"}</span>}
        <button type="button" className={`favorite-toggle ${isSaved ? "is-saved" : ""}`} onClick={onFavorite} aria-label={isSaved ? (isEn ? "Remove from saved" : "إزالة من المفضلة") : (isEn ? "Save deal" : "حفظ العرض")}>
          <Icon name="heart" size={17} />
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-meta">
          <span className="product-category">{category ? (isEn ? category.nameEn : category.nameAr) : (isEn ? "Beauty find" : "اكتشاف وردة")}</span>
          <span className="merchant-name">{deal.merchantName}</span>
        </div>
        <h3 className="product-title"><a href={deal.productUrl} target="_blank" rel="noreferrer noopener">{title}</a></h3>
        <p className="product-description">{description}</p>
        <div className="product-price-row">
          <div className="price-stack">
            <span className="current-price">{deal.price.toLocaleString(isEn ? "en" : "ar-SA")} <small>{isEn ? "SAR" : "ر.س"}</small></span>
            <span className="original-price">{deal.originalPrice.toLocaleString(isEn ? "en" : "ar-SA")} {isEn ? "SAR" : "ر.س"}</span>
          </div>
          <a className="shop-deal-btn" href={deal.productUrl} target="_blank" rel="noreferrer noopener" aria-label={labels.product}>
            <Icon name="arrow" size={17} />
          </a>
        </div>
        <a className="product-cta" href={deal.productUrl} target="_blank" rel="noreferrer noopener">
          {labels.product}<Icon name="external" size={14} />
        </a>
      </div>
    </article>
  );
}

const USERS_KEY = "warda-vite-users";
const SESSION_KEY = "warda-vite-session";
const favsKey = (email: string) => `warda-vite-favs:${email}`;

function readUsers(): LocalUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as LocalUser[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readFavs(email: string): number[] {
  try {
    const raw = localStorage.getItem(favsKey(email));
    const parsed = raw ? (JSON.parse(raw) as number[]) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => Number.isInteger(id)) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [query, setQuery] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [user, setUser] = useState<LocalUser | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState("");

  const categories = CATEGORIES;
  const deals = DEALS;
  const isEn = language === "en";
  const labels = isEn ? copy.en : copy.ar;
  const activeHeaderAd = ADS.find((ad) => ad.placement === "header");
  const activeMiddleAd = ADS.find((ad) => ad.placement === "middle");
  const activeSideAd = ADS.find((ad) => ad.placement === "sidebar");
  const activeFooterAd = ADS.find((ad) => ad.placement === "footer");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isEn ? "ltr" : "rtl";
  }, [language, isEn]);

  useEffect(() => {
    const sessionEmail = localStorage.getItem(SESSION_KEY);
    if (!sessionEmail) return;
    const found = readUsers().find((item) => item.email === sessionEmail);
    if (found) {
      setUser(found);
      setSavedIds(readFavs(found.email));
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredDeals = useMemo(() => {
    const normalized = query.toLocaleLowerCase();
    const filtered = deals.filter((deal) => {
      const category = categories.find((item) => item.id === deal.categoryId);
      const categoryMatch = activeCategory === null || deal.categoryId === activeCategory;
      const savedMatch = !savedOnly || savedIds.includes(deal.id);
      const searchable = [deal.titleAr, deal.titleEn, deal.descriptionAr, deal.descriptionEn, deal.merchantName, category?.nameAr, category?.nameEn]
        .filter(Boolean).join(" ").toLocaleLowerCase();
      return categoryMatch && savedMatch && (!normalized || searchable.includes(normalized));
    });
    return filtered.sort((first, second) => {
      if (sortBy === "discount") return discountOf(second) - discountOf(first);
      if (sortBy === "price") return first.price - second.price;
      return Number(second.isFeatured) - Number(first.isFeatured) || discountOf(second) - discountOf(first);
    });
  }, [activeCategory, categories, deals, query, savedIds, savedOnly, sortBy]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(inputQuery.trim());
    document.getElementById("deals")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFavorite = (dealId: number) => {
    if (!user) {
      setAuthMode("login");
      setAuthOpen(true);
      setToast(labels.loginFirst);
      return;
    }
    const wasSaved = savedIds.includes(dealId);
    const next = wasSaved ? savedIds.filter((id) => id !== dealId) : [...savedIds, dealId];
    setSavedIds(next);
    localStorage.setItem(favsKey(user.email), JSON.stringify(next));
    setToast(wasSaved ? labels.removed : labels.saved);
  };

  const handleAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setAuthError(isEn ? "Please enter a valid email address." : "يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }
    const users = readUsers();
    if (authMode === "register") {
      const cleanName = fullName.trim();
      if (cleanName.length < 2) {
        setAuthError(isEn ? "Please enter your name." : "يرجى إدخال الاسم.");
        return;
      }
      if (password.length < 8) {
        setAuthError(isEn ? "Password must be at least 8 characters." : "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.");
        return;
      }
      if (users.some((item) => item.email === cleanEmail)) {
        setAuthError(isEn ? "This email is already registered. Please sign in." : "هذا البريد مسجل بالفعل. سجّلي الدخول بدلًا من ذلك.");
        return;
      }
      const created: LocalUser = { id: Date.now(), fullName: cleanName, email: cleanEmail, password };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, created]));
      localStorage.setItem(SESSION_KEY, created.email);
      setUser(created);
      setSavedIds([]);
      setAuthOpen(false);
      setPassword("");
      setToast(isEn ? `Welcome, ${created.fullName.split(" ")[0]}!` : `يا هلا ${created.fullName.split(" ")[0]}، نورتِ وردة!`);
      return;
    }
    const found = users.find((item) => item.email === cleanEmail && item.password === password);
    if (!found) {
      setAuthError(isEn ? "Incorrect email or password." : "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      return;
    }
    localStorage.setItem(SESSION_KEY, found.email);
    setUser(found);
    setSavedIds(readFavs(found.email));
    setAuthOpen(false);
    setPassword("");
    setToast(isEn ? `Welcome back, ${found.fullName.split(" ")[0]}!` : `يا هلا ${found.fullName.split(" ")[0]}، نورتِ وردة!`);
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setSavedIds([]);
    setSavedOnly(false);
    setToast(isEn ? "You have signed out." : "تم تسجيل الخروج.");
  };

  const resetFilters = () => {
    setQuery("");
    setInputQuery("");
    setActiveCategory(null);
    setSavedOnly(false);
  };

  return (
    <div className={`storefront ${isEn ? "is-english" : ""}`}>
      <div className="announcement-bar">
        <span className="announcement-flower">✿</span>
        <span>{isEn ? copy.en.line : copy.ar.line}</span>
        <span className="announcement-dot">·</span>
        <span>{isEn ? "Fresh finds, lovely prices" : "اختيارات جديدة، وأسعار ألطف"}</span>
      </div>

      <header className="site-header">
        <div className="header-main wrap">
          <a className="brand" href="/" aria-label={isEn ? SITE.nameEn : SITE.nameAr}>
            <span className="brand-mark"><span>✿</span></span>
            <span className="brand-copy"><strong>{isEn ? SITE.nameEn : SITE.nameAr}</strong><small>{isEn ? "BEAUTY · STYLE · FINDS" : "جمال · أناقة · اختيارات"}</small></span>
          </a>

          <form className="header-search" onSubmit={handleSearch} role="search">
            <Icon name="search" size={18} />
            <input value={inputQuery} onChange={(event) => setInputQuery(event.target.value)} placeholder={labels.search} aria-label={labels.search} />
            {inputQuery && <button type="button" className="search-clear" onClick={() => { setInputQuery(""); setQuery(""); }} aria-label={labels.close}><Icon name="close" size={15} /></button>}
            <button className="search-submit" type="submit">{isEn ? "Search" : "بحث"}</button>
          </form>

          <div className="header-actions">
            <button type="button" className="language-button" onClick={() => setLanguage(isEn ? "ar" : "en")} aria-label={isEn ? "Change language to Arabic" : "Change language to English"}>
              <Icon name="globe" size={17} /><span>{isEn ? "عربي" : "EN"}</span>
            </button>
            {user ? (
              <div className="signed-in-actions">
                <button className="account-button signed-in" type="button" onClick={signOut}>
                  <span className="user-avatar">{user.fullName.slice(0, 1)}</span><span className="account-name">{user.fullName.split(" ")[0]}</span>
                </button>
              </div>
            ) : (
              <button className="account-button" type="button" onClick={() => { setAuthMode("login"); setAuthOpen(true); }}><Icon name="user" size={18} /><span>{labels.login}</span></button>
            )}
            <button className="mobile-menu-button" type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={isEn ? "Toggle menu" : "فتح القائمة"}><Icon name="menu" size={20} /></button>
          </div>
        </div>

        <nav className={`category-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label={isEn ? "Main categories" : "الأقسام الرئيسية"}>
          <div className="wrap category-nav-inner">
            <button className={!activeCategory ? "nav-category active" : "nav-category"} type="button" onClick={() => { setActiveCategory(null); setSavedOnly(false); setMobileMenuOpen(false); }}>{isEn ? "All finds" : "كل الاختيارات"}</button>
            {categories.map((category) => (
              <button key={category.id} className={activeCategory === category.id ? "nav-category active" : "nav-category"} type="button" onClick={() => { setActiveCategory(category.id); setSavedOnly(false); setMobileMenuOpen(false); }}>
                <span>{category.icon}</span>{isEn ? category.nameEn : category.nameAr}
              </button>
            ))}
            <a href="mailto:ads@warda.example?subject=Warda%20advertising" className="nav-admin-link">{isEn ? "Partner with us" : "للمتاجر والإعلانات"}<Icon name="arrow" size={15} /></a>
          </div>
        </nav>
      </header>

      <main>
        <div className="header-ad-wrap wrap"><AdBlock ad={activeHeaderAd} placement="header" isEn={isEn} /></div>

        <section className="hero-section wrap">
          <div className="hero-copy">
            <span className="eyebrow"><Icon name="spark" size={15} />{labels.heroTag}</span>
            <h1>{labels.heroTitle}</h1>
            <p className="hero-description">{isEn ? SITE.descriptionEn : SITE.descriptionAr}. {labels.heroText}</p>
            <div className="hero-cta-row">
              <a className="primary-button" href="#deals">{labels.browse}<Icon name="arrow" size={17} /></a>
              <span className="hero-note"><span className="hero-note-stars">★★★★★</span><span>{isEn ? "Hand-picked with love" : "اختيرت لكِ بكل حب"}</span></span>
            </div>
            <div className="hero-mini-stats">
              <div><strong>+{deals.length}</strong><span>{isEn ? "lovely finds" : "عرض مختار"}</span></div>
              <span className="mini-stat-separator" />
              <div><strong>{categories.length}</strong><span>{isEn ? "collections" : "قسمًا متنوعًا"}</span></div>
              <span className="mini-stat-separator" />
              <div><strong><Icon name="check" size={15} /></strong><span>{isEn ? "Direct store links" : "روابط مباشرة للمتاجر"}</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-backdrop" />
            <img className="hero-image" src="/images/warda-editorial.png" alt={isEn ? "Thoughtfully selected beauty and skincare products" : "منتجات تجميل وعناية مختارة بعناية"} />
            <div className="hero-photo-note"><span className="hero-photo-icon">✿</span><div><strong>{isEn ? "A softer kind of glow" : "وهجكِ بطريقتكِ"}<small>{isEn ? "Your edit, your way" : "اختيارات تشبهكِ"}</small></strong></div></div>
            <span className="hero-orbit orbit-one">✧</span><span className="hero-orbit orbit-two">✿</span>
          </div>
          <div className="hero-edition"><span>NO. 01</span><span>{isEn ? "THE BEAUTY EDIT" : "اختيارات الجمال"}</span></div>
        </section>

        <section className="category-section wrap" id="collections">
          <div className="section-heading compact-heading">
            <div><span className="section-overline">{isEn ? "A LITTLE SOMETHING FOR EVERY YOU" : "لكل جانب جميل فيكِ"}</span><h2>{labels.categories}</h2></div>
            <span className="heading-side-note">{labels.categoriesNote}<span>✧</span></span>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <button key={category.id} className={`category-tile category-tile-${index % 6} ${activeCategory === category.id ? "selected" : ""}`} type="button" onClick={() => { setActiveCategory(activeCategory === category.id ? null : category.id); setSavedOnly(false); document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" }); }}>
                <span className="category-icon">{category.icon}</span><strong>{isEn ? category.nameEn : category.nameAr}</strong><small>{isEn ? category.descriptionEn : category.descriptionAr}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="wrap mid-ad-section" aria-label={isEn ? "Advertisement" : "إعلان"}><AdBlock ad={activeMiddleAd} placement="middle" isEn={isEn} /></section>

        <section className="deals-section wrap" id="deals">
          <div className="section-heading deals-heading">
            <div><span className="section-overline">{isEn ? "CURATED WITH A LITTLE LOVE" : "اختيرت لكِ بكل حب"}</span><h2>{savedOnly ? labels.savedOnly : query ? `${labels.searchResults} “${query}”` : (isEn ? copy.en.picks : copy.ar.picks)}</h2><p>{isEn ? copy.en.picksNote : copy.ar.picksNote}</p></div>
            <div className="deals-toolbar">
              <button type="button" className={`saved-filter ${savedOnly ? "active" : ""}`} onClick={() => { if (!user) { setAuthOpen(true); return; } setSavedOnly((saved) => !saved); setActiveCategory(null); }}><Icon name="heart" size={16} /><span>{labels.favorites}</span><b>{savedIds.length}</b></button>
              <label className="sort-control"><span>{labels.sort}</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="featured">{labels.featured}</option><option value="discount">{labels.discountSort}</option><option value="price">{labels.priceLow}</option></select></label>
            </div>
          </div>
          <div className="deals-layout">
            <div className="deals-main">
              <div className="deal-filter-strip">
                <button type="button" className={`filter-chip ${activeCategory === null && !savedOnly ? "active" : ""}`} onClick={() => { setActiveCategory(null); setSavedOnly(false); }}>{labels.all}<span>{deals.length}</span></button>
                {categories.map((category) => <button key={category.id} type="button" className={`filter-chip ${activeCategory === category.id ? "active" : ""}`} onClick={() => { setActiveCategory(activeCategory === category.id ? null : category.id); setSavedOnly(false); }}>{isEn ? category.nameEn : category.nameAr}</button>)}
              </div>
              {filteredDeals.length ? (
                <div className="product-grid">
                  {filteredDeals.map((deal) => (
                    <ProductCard key={deal.id} deal={deal} category={categories.find((category) => category.id === deal.categoryId)} isEn={isEn} isSaved={savedIds.includes(deal.id)} onFavorite={() => toggleFavorite(deal.id)} labels={labels} />
                  ))}
                </div>
              ) : (
                <div className="empty-state"><span className="empty-flower">✿</span><h3>{labels.noDeals}</h3><p>{labels.noDealsNote}</p><button type="button" className="text-button" onClick={resetFilters}>{labels.clear}<Icon name="arrow" size={15} /></button></div>
              )}
            </div>
            <aside className="deals-sidebar">
              <div className="sidebar-story-card"><span className="sidebar-flower">✿</span><span className="sidebar-overline">{isEn ? "A NOTE FROM WARDA" : "من وردة إليكِ"}</span><h3>{labels.sideTitle}</h3><p>{labels.sideText}</p><span className="story-signature">{isEn ? "with love, Warda" : "بكل حب، وردة"}</span></div>
              <AdBlock ad={activeSideAd} placement="sidebar" isEn={isEn} />
              <div className="sidebar-trust"><span className="trust-icon"><Icon name="check" size={15} /></span><div><strong>{labels.trusted}</strong><p>{labels.trustedText}</p></div></div>
              <div className="sidebar-join"><span className="join-flower">✿</span><h4>{labels.join}</h4><p>{labels.joinNote}</p><button type="button" onClick={() => { setAuthMode("register"); setAuthOpen(true); }}>{labels.member}<Icon name="arrow" size={14} /></button></div>
            </aside>
          </div>
          <div className="deal-count-note">✧ &nbsp;{filteredDeals.length} {labels.dealsCount}&nbsp; ✧</div>
        </section>

        <section className="brand-note-band"><div className="wrap brand-note-inner"><span className="brand-note-spark">✿</span><div><span className="section-overline">{isEn ? "THE WARDA PROMISE" : "وعد وردة لكِ"}</span><h2>{labels.footerTag}</h2></div><a href="mailto:hello@warda.example">{isEn ? "Say hello" : "تواصلي معنا"}<Icon name="arrow" size={16} /></a></div></section>
        <section className="wrap footer-ad-wrap"><AdBlock ad={activeFooterAd} placement="footer" isEn={isEn} /></section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-main">
          <div className="footer-brand-col"><a className="brand footer-brand" href="/"><span className="brand-mark"><span>✿</span></span><span className="brand-copy"><strong>{isEn ? SITE.nameEn : SITE.nameAr}</strong><small>{isEn ? "BEAUTY · STYLE · FINDS" : "جمال · أناقة · اختيارات"}</small></span></a><p>{isEn ? SITE.descriptionEn : SITE.descriptionAr}</p></div>
          <div className="footer-links"><strong>{isEn ? "Explore" : "اكتشفي وردة"}</strong><a href="#collections">{labels.categories}</a><a href="#deals">{labels.deals}</a><a href="mailto:ads@warda.example?subject=Warda%20advertising">{labels.sideCta}</a></div>
          <div className="footer-links"><strong>{isEn ? "A little more" : "روابط تهمكِ"}</strong><a href="/ads.txt">ads.txt</a><a href="/warda-marketplace.zip" download>{isEn ? "Download WordPress plugin" : "تحميل إضافة ووردبريس"}</a><a href="mailto:hello@warda.example">{isEn ? "Get in touch" : "تواصلي معنا"}</a></div>
          <div className="footer-note"><span>✧</span><p>{isEn ? "Beautiful things, thoughtfully found." : "أشياء جميلة، اختيرت بعناية."}</p><span className="footer-small-note">{isEn ? "For your lovely everyday." : "لأيامكِ الجميلة."}</span></div>
        </div>
        <div className="footer-bottom"><div className="wrap footer-bottom-inner"><span>© {new Date().getFullYear()} {isEn ? SITE.nameEn : SITE.nameAr}. {isEn ? "All rights reserved." : "جميع الحقوق محفوظة."}</span><span>{isEn ? "Made for the little things you love" : "صُنعت بحب للتفاصيل التي تحبينها"} <span className="footer-heart">♥</span></span><a href="/ads.txt">ads.txt</a></div></div>
      </footer>

      {toast && <div className="toast-message" role="status"><span>✿</span>{toast}</div>}

      {authOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false); }}>
          <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <button className="modal-close" onClick={() => setAuthOpen(false)} aria-label={labels.close}><Icon name="close" size={20} /></button>
            <span className="auth-flower">✿</span>
            <span className="section-overline">{isEn ? "A LITTLE SPACE FOR YOU" : "مساحة صغيرة تخصّكِ"}</span>
            <h2 id="auth-title">{authMode === "login" ? labels.authTitleLogin : labels.authTitleRegister}</h2>
            <p className="auth-modal-note">{labels.authNote}</p>
            <form className="auth-form" onSubmit={handleAuth}>
              {authMode === "register" && <label>{labels.name}<input required autoComplete="name" minLength={2} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder={isEn ? "Your lovely name" : "اسمكِ الجميل"} /></label>}
              <label>{labels.email}<span className="input-with-icon"><Icon name="mail" size={16} /><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></span></label>
              <label>{labels.password}<span className="input-with-icon"><Icon name="lock" size={16} /><input required type="password" minLength={authMode === "register" ? 8 : 1} autoComplete={authMode === "register" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isEn ? "At least 8 characters" : "٨ أحرف على الأقل"} /></span></label>
              {authError && <p className="form-error" role="alert">{authError}</p>}
              <button className="primary-button auth-submit">{authMode === "login" ? labels.submitLogin : labels.submitRegister}<Icon name="arrow" size={16} /></button>
            </form>
            <button className="auth-switch" type="button" onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }}>{authMode === "login" ? labels.switchRegister : labels.switchLogin}</button>
          </section>
        </div>
      )}
    </div>
  );
}
