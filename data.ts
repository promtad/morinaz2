export type Category = {
  id: number;
  nameAr: string;
  nameEn: string;
  slug: string;
  icon: string;
  descriptionAr: string;
  descriptionEn: string;
};

export type Deal = {
  id: number;
  categoryId: number | null;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  productUrl: string;
  merchantName: string;
  isFeatured: boolean;
};

export type Advertisement = {
  id: number;
  titleAr: string;
  titleEn: string;
  placement: "header" | "middle" | "sidebar" | "footer";
  imageUrl: string;
  targetUrl: string;
};

export const SITE = {
  nameAr: "وردة",
  nameEn: "Warda",
  descriptionAr: "عالمكِ الأجمل لعروض الجمال والأزياء",
  descriptionEn: "Your lovely destination for beauty and fashion deals",
};

export const CATEGORIES: Category[] = [
  { id: 1, nameAr: "المكياج", nameEn: "Makeup", slug: "makeup", icon: "✦", descriptionAr: "كل ما يضيء إطلالتك", descriptionEn: "Everything to brighten your look" },
  { id: 2, nameAr: "العناية بالبشرة", nameEn: "Skincare", slug: "skincare", icon: "♡", descriptionAr: "روتين عناية يليق بكِ", descriptionEn: "A skincare routine made for you" },
  { id: 3, nameAr: "الأزياء والملابس", nameEn: "Fashion", slug: "fashion", icon: "◈", descriptionAr: "أناقة لكل يوم ومناسبة", descriptionEn: "Style for every day and occasion" },
  { id: 4, nameAr: "العطور", nameEn: "Fragrance", slug: "fragrance", icon: "✿", descriptionAr: "نفحات تحكي عنكِ", descriptionEn: "Scents that tell your story" },
  { id: 5, nameAr: "الشعر والتصفيف", nameEn: "Hair care", slug: "hair", icon: "❋", descriptionAr: "عناية ولمسة تصفيف", descriptionEn: "Care and styling essentials" },
  { id: 6, nameAr: "الحقائب والإكسسوارات", nameEn: "Bags & accessories", slug: "accessories", icon: "◇", descriptionAr: "تفاصيل تكمل أناقتك", descriptionEn: "The details that complete your style" },
  { id: 7, nameAr: "الأدوات والأجهزة", nameEn: "Beauty tools", slug: "tools", icon: "⌁", descriptionAr: "أدواتك المفضلة في المنزل", descriptionEn: "Your favorite tools at home" },
  { id: 8, nameAr: "الصحة والعافية", nameEn: "Wellness", slug: "wellness", icon: "☼", descriptionAr: "لأن العناية تبدأ من الداخل", descriptionEn: "Feel-good essentials from within" },
];

export const DEALS: Deal[] = [
  {
    id: 1,
    categoryId: 1,
    titleAr: "مجموعة أساسيات المكياج بإطلالة ناعمة",
    titleEn: "Soft-glam makeup essentials set",
    descriptionAr: "اختاري إطلالتك اليومية مع مجموعة مختارة من أساسيات الجمال. عرض مميز لفترة محدودة.",
    descriptionEn: "Create your everyday look with a curated set of beauty essentials. Limited-time offer.",
    price: 129,
    originalPrice: 189,
    merchantName: "بوتيك بلوم",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/beauty/makeup-set",
    isFeatured: true,
  },
  {
    id: 2,
    categoryId: 2,
    titleAr: "سيروم الترطيب اليومي بتركيبة خفيفة",
    titleEn: "Daily hydration serum with a lightweight formula",
    descriptionAr: "تركيبة لطيفة تمنح بشرتكِ الترطيب والانتعاش طوال اليوم.",
    descriptionEn: "A gentle formula that keeps your skin fresh and hydrated all day.",
    price: 89,
    originalPrice: 145,
    merchantName: "ذا بيور سكين",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/skincare/serum",
    isFeatured: true,
  },
  {
    id: 3,
    categoryId: 3,
    titleAr: "حقيبة يومية أنيقة بلون الكراميل",
    titleEn: "Elegant everyday bag in caramel",
    descriptionAr: "تصميم عملي وأنيق يرافقكِ من الصباح إلى المساء.",
    descriptionEn: "A practical yet polished bag for all-day outings.",
    price: 179,
    originalPrice: 259,
    merchantName: "دار لونا",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/accessories/caramel-bag",
    isFeatured: true,
  },
  {
    id: 4,
    categoryId: 4,
    titleAr: "عطر زهري بنفحات دافئة وناعمة",
    titleEn: "Soft floral fragrance with warm notes",
    descriptionAr: "نفحات أنثوية راقية تضيف لمسة مميزة إلى يومكِ.",
    descriptionEn: "An elegant feminine scent to make every day feel special.",
    price: 219,
    originalPrice: 320,
    merchantName: "عطور سُلاف",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/fragrance/floral",
    isFeatured: false,
  },
  {
    id: 5,
    categoryId: 5,
    titleAr: "مجفف ومصفف شعر متعدد الاستخدامات",
    titleEn: "Multi-styling hair dryer and brush",
    descriptionAr: "تصفيف سهل ولمسة لامعة في المنزل، مع إعدادات تناسب مختلف أنواع الشعر.",
    descriptionEn: "Easy at-home styling and a glossy finish with settings for different hair types.",
    price: 249,
    originalPrice: 399,
    merchantName: "جلو بيوتي",
    imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/hair/styler",
    isFeatured: true,
  },
  {
    id: 6,
    categoryId: 7,
    titleAr: "فرش مكياج احترافية مع حقيبة أنيقة",
    titleEn: "Professional makeup brushes with a chic pouch",
    descriptionAr: "مجموعة فرش ناعمة لتطبيق دقيق وسهل لمكياجكِ المفضل.",
    descriptionEn: "A soft-bristle brush set for precise, effortless application.",
    price: 99,
    originalPrice: 159,
    merchantName: "بوتيك بلوم",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/beauty/brush-kit",
    isFeatured: false,
  },
  {
    id: 7,
    categoryId: 3,
    titleAr: "إطلالة صيفية مريحة بقصة انسيابية",
    titleEn: "An easy summer look with a relaxed fit",
    descriptionAr: "قطعة عملية بقماش ناعم وألوان موسمية جميلة.",
    descriptionEn: "An easy-to-wear piece in a soft fabric and lovely seasonal colors.",
    price: 149,
    originalPrice: 229,
    merchantName: "دار لونا",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/fashion/summer-look",
    isFeatured: false,
  },
  {
    id: 8,
    categoryId: 8,
    titleAr: "مجموعة عناية منزلية للاسترخاء والتجدد",
    titleEn: "At-home care set for a little reset",
    descriptionAr: "دلّلي نفسكِ بروتين عناية منزلي يمنحكِ وقتًا من الهدوء.",
    descriptionEn: "Treat yourself to a calming at-home self-care ritual.",
    price: 119,
    originalPrice: 185,
    merchantName: "ذا بيور سكين",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    productUrl: "https://example.com/wellness/self-care",
    isFeatured: false,
  },
];

// أضيفي إعلاناتكِ هنا. مثال:
// { id: 1, titleAr: "تخفيضات الصيف", titleEn: "Summer sale", placement: "header", imageUrl: "https://...", targetUrl: "https://yourstore.com" },
export const ADS: Advertisement[] = [];
