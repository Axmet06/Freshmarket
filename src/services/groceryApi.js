// src/services/groceryApi.js
// API functions for fetching grocery products from DummyJSON

// Translation dictionary for common terms
const translations = {
  // Categories
  'beauty': 'Красота',
  'fragrances': 'Ароматы',
  'furniture': 'Мебель',
  'groceries': 'Бакалея',
  'home-decoration': 'Декор',
  'kitchen-accessories': 'Кухонные принадлежности',
  'laptops': 'Ноутбуки',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mobile-accessories': 'Аксессуары для мобильных',
  'motorcycle': 'Мотоциклы',
  'skin-care': 'Уход за кожей',
  'smartphones': 'Смартфоны',
  'sports-accessories': 'Спортивные аксессуары',
  'sunglasses': 'Солнцезащитные очки',
  'tablets': 'Планшеты',
  'tops': 'Топы',
  'vehicle': 'Транспорт',
  'womens-bags': 'Женские сумки',
  'womens-dresses': 'Женские платья',
  'womens-jewellery': 'Женские украшения',
  'womens-shoes': 'Женская обувь',
  'womens-watches': 'Женские часы',
  
  // Common product titles
  'iPhone 9': 'Айфон 9',
  'iPhone X': 'Айфон X',
  'Samsung Universe 9': 'Самсунг Universe 9',
  'OPPOF19': 'ОППО F19',
  'Huawei P30': 'Хуавей P30',
  'MacBook Pro': 'МакБук Про',
  'Samsung Galaxy Book': 'Самсунг Галакси Бук',
  'Microsoft Surface Laptop 4': 'Майкрософт Поверхность Ноутбук 4',
  'Infinix INBOOK': 'Инфиникс ИНБУК',
  'HP Pavilion 15-DK1056WM': 'ЭйчПи Павильон 15-DK1056WM',
  'perfume Oil': 'Масло для парфюма',
  'Brown Perfume': 'Коричневый парфюм',
  'Fog Scent Xpressio Perfume': 'Парфюм Fog Scent Xpressio',
  'Non-Alcoholic Concentrated Perfume Oil': 'Безалкогольное концентрированное масло для парфюма',
  'Eau De Perfume Spray': 'Спрей Eau De Perfume',
  'Tree Oil 30ml': 'Древесное масло 30 мл',
  'Oil Free Moisturizer 100ml': 'Увлажняющий крем без масел 100 мл',
  'Skin Beauty Serum.': 'Сыворотка для красоты кожи',
  'Freckle Treatment Cream- 15gm': 'Крем для лечения веснушек - 15 г',
  'Dermive Oil Free Moisturizer with SPF 20': 'Увлажняющий крем Dermive без масел с SPF 20',
  '- Daal Masoor 500 grams': '- Даал Масур 500 грамм',
  'Elbow Macaroni - 400 gm': 'Локшинные ракушки - 400 г',
  'Orange Essence Food Flavou': 'Ароматизатор пищи Апельсиновая эссенция',
  'cereals muesli fruit nuts': 'Хлопья мюсли фрукты орехи',
  'Gulab Powder 50 Gram': 'Порошок Гулав 50 грамм',
  'Plant Hanger For Home': 'Подвеска для растений для дома',
  'Flying Wooden Bird': 'Летающая деревянная птица',
  '3D Embellishment Art Lamp': '3D декоративная лампа',
  'Handcraft Chinese style': 'Ручная работа в китайском стиле',
  'Key Holder': 'Держатель для ключей',
  'Apple': 'Яблоко',
  'Beef Steak': 'Говядина стейк',
  'Cat Food': 'Корм для кошек',
  'Chicken Meat': 'Куриное мясо',
  'Cooking Oil': 'Растительное масло',
  'Cucumber': 'Огурец',
  'Dog Food': 'Корм для собак',
  'Eggs': 'Яйца',
  'Fish Steak': 'Рыбный стейк',
  'Green Bell Pepper': 'Зеленый болгарский перец',
  'Green Chili Pepper': 'Зеленый острый перец',
  'Honey Jar': 'Банка меда',
  'Ice Cream': 'Мороженое',
  'Juice': 'Сок',
  'Kiwi': 'Киви',
  'Lemon': 'Лимон',
  'Milk': 'Молоко',
  'Mulberry': 'Тутовое дерево',
  'Nescafe Coffee': 'Кофе Nescafe',
  'Potatoes': 'Картофель',
  'Essence Mascara Lash Princess': 'Тушь Essence Lash Princess',
  'Eyeshadow Palette with Mirror': 'Палетка теней с зеркалом',
  'Powder Canister': 'Баночка с пудрой',
  'Red Lipstick': 'Красная помада',
  'Red Nail Polish': 'Красный лак для ногтей',
  'Calvin Klein CK One': 'Calvin Klein CK One',
  'Chanel Coco Noir Eau De': 'Chanel Coco Noir Парфюм',
  'Dior J\'adore Eau De': 'Dior J\'adore Парфюм',
  'Dolce Shine Eau de': 'Dolce Shine Парфюм',
  'Gucci Bloom Eau de': 'Gucci Bloom Парфюм',
  'Annibale Colombo Bed': 'Кровать Annibale Colombo',
  'Annibale Colombo Sofa': 'Диван Annibale Colombo',
  'Bedside Table African Cherry': 'Тумбочка из африканской вишни',
  'Knoll Saarinen Executive Conference Chair': 'Кресло Knoll Saarinen для конференций',
  'Wooden Bathroom Sink With Mirror': 'Деревянная ванная раковина с зеркалом',
  
  // Common descriptions
  'An apple mobile which is nothing like apple': 'Мобильный телефон Apple, который не похож на другие Apple устройства',
  'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...': 'Модель A19211 без SIM-карты, 6.5-дюймовый дисплей Super Retina HD с технологией OLED, чип A12 Bionic с ...',
  'Samsung\'s new variant which goes beyond Galaxy to the Universe': 'Новый вариант Samsung, который выходит за рамки Galaxy во Вселенную',
  'OPPO F19 is officially announced on April 2021.': 'OPPO F19 официально анонсирован в апреле 2021 года.',
  'Huawei\'s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.': 'Новое издание Huawei P30 Pro с измененным дизайном было официально представлено вчера в Германии, и теперь устройство попало в Великобританию.',
  'MacBook Pro 2021 with mini-LED display may launch between September, November': 'MacBook Pro 2021 с мини-светодиодным дисплеем может быть запущен между сентябрем и ноябрем',
  'Samsung Galaxy Book S (2020) Knight Silver, 13.3 inch, 256GB.': 'Samsung Galaxy Book S (2020) Серебристо-серый, 13.3 дюйма, 256 ГБ.',
  'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.': 'Стиль и скорость. Выделяйтесь на видеозвонках HD благодаря студийным микрофонам. Запечатлевайте идеи на ярком сенсорном экране.',
  'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty': 'Infinix Inbook X1 Ci3 10-го поколения 8 ГБ 256 ГБ 14 дюймов Win10 Серый – 1 год гарантии',
  'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10': 'Игровой ноутбук HP Pavilion 15-DK1056WM 10-го поколения Core i5, 8 ГБ, 256 ГБ SSD, GTX 1650 4 ГБ, Windows 10',
  'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil': 'Огромная скидка, импрессия Acqua Di Gio от Giorgio Armani, концентрированное масло для парфюма',
  'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml': 'Коричневый спортивный парфюм Royal_Mirage для мужчин и женщин - 120 мл',
  'Fog Scent Xpressio Perfume (Blue) 100ml': 'Парфюм Fog Scent Xpressio (синий) 100 мл',
  'Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil': 'Оригинал Al Munakh® от Mahal Al Musk | Наша импрессия Climate | 6 мл безалкогольное концентрированное масло для парфюма',
  'Eau De Perfume Spray': 'Спрей Eau De Perfume',
  'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,': 'Масло чайного дерева содержит ряд соединений, включая терпинен-4-ол, которые показали способность убивать определенные бактерии,',
  'Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.': 'Увлажняющий крем Dermive без масел с SPF 20 специально разработан с керамидами, гиалуроновой кислотой и солнцезащитным фильтром.',
  'Fresh and crisp apples, perfect for snacking or incorporating into various recipes.': 'Свежие и хрустящие яблоки, идеально подходят для перекуса или использования в различных рецептах.',
  'High-quality beef steak, great for grilling or cooking to your preferred level of doneness.': 'Высококачественный говяжий стейк, отлично подходит для гриля или приготовления по вашему вкусу.',
  'Nutritious cat food formulated to meet the dietary needs of your feline friend.': 'Питательный корм для кошек, созданный для удовлетворения диетических потребностей вашего пушистого друга.',
  'Fresh and tender chicken meat, suitable for various culinary preparations.': 'Свежее и нежное куриное мясо, подходит для различных кулинарных приготовлений.',
  'Versatile cooking oil suitable for frying, sautéing, and various culinary applications.': 'Универсальное растительное масло, подходящее для жарки, тушения и различных кулинарных применений.',
  'Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.': 'Хрустящие и освежающие огурцы, идеально подходят для салатов, закусок или как освежающее дополнение.',
  'Specially formulated dog food designed to provide essential nutrients for your canine companion.': 'Специально сформулированный корм для собак, предназначенный для обеспечения необходимых питательных веществ для вашего четвероногого друга.',
  'Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.': 'Свежие яйца, универсальный ингредиент для выпечки, приготовления пищи или завтрака.',
  'Quality fish steak, suitable for grilling, baking, or pan-searing.': 'Качественный рыбный стейк, подходящий для гриля, запекания или жарки на сковороде.',
  'Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.': 'Свежий и яркий зеленый болгарский перец, идеально подходит для добавления цвета и вкуса в ваши блюда.',
  'Spicy green chili pepper, ideal for adding heat to your favorite recipes.': 'Острый зеленый чили перец, идеально подходит для добавления остроты в ваши любимые рецепты.',
  'Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.': 'Чистый и натуральный мед в удобной банке, идеально подходит для подслащения напитков или поливки поверх еды.',
  'Creamy and delicious ice cream, available in various flavors for a delightful treat.': 'Кремовое и восхитительное мороженое, доступное в различных вкусах для приятного удовольствия.',
  'Refreshing fruit juice, packed with vitamins and great for staying hydrated.': 'Освежающий фруктовый сок, богатый витаминами и отлично подходит для поддержания гидратации.',
  'Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.': 'Богатый питательными веществами киви, идеально подходит для перекуса или добавления тропического акцента в ваши блюда.',
  'Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.': 'Пикантные и кислые лимоны, универсальны для приготовления пищи, выпечки или приготовления освежающих напитков.',
  'Fresh and nutritious milk, a staple for various recipes and daily consumption.': 'Свежее и питательное молоко, основа для различных рецептов и ежедневного потребления.',
  'Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.': 'Сладкие и сочные плоды шелковицы, идеально подходят для перекуса или добавления в десерты и хлопья.',
  'Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.': 'Качественный кофе от Nescafe, доступный в различных смесях для насыщенного и приятного вкуса.',
  'Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.': 'Универсальный и крахмалистый картофель, отлично подходит для запекания, пюре или как гарнир.',
  'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.': 'Тушь Essence Lash Princess популярна благодаря эффекту увеличения объема и удлинения ресниц. Создайте драматический образ с этой стойкой формулой, не тестируемой на животных.',
  'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it\'s convenient for on-the-go makeup application.': 'Палетка теней с зеркалом предлагает разнообразную палитру оттенков для создания потрясающего макияжа глаз. Встроенное зеркало делает ее удобной для нанесения макияжа на ходу.',
  'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.': 'Баночка с пудрой - это тонко измельченная пудра для фиксации макияжа и контроля блеска. Благодаря легкой и прозрачной формуле она обеспечивает гладкое матовое покрытие.',
  'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.': 'Красная помада - это классический и смелый выбор для добавления яркости вашим губам. С кремовой и пигментированной формулой она обеспечивает насыщенный и стойкий результат.',
  'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.': 'Красный лак для ногтей предлагает насыщенный и глянцевый красный оттенок для ярких и ухоженных ногтей. Быстросохнущая формула обеспечивает профессиональный результат дома.',
  'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It\'s a versatile fragrance suitable for everyday wear.': 'CK One от Calvin Klein - это классический унисекс парфюм, известный своим свежим и чистым ароматом. Это универсальный парфюм, подходящий для повседневного использования.',
  'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.': 'Coco Noir от Chanel - это элегантный и загадочный парфюм с нотами грейпфрута, розы и сандалового дерева. Идеально подходит для вечерних случаев.',
  'J\'adore by Dior is a luxurious and feminine fragrance, featuring notes of rose, jasmine, and ylang-ylang. It embodies the essence of femininity and sophistication.': 'J\'adore от Dior - это роскошный и женственный парфюм с нотами розы, жасмина и иланг-иланга. Он воплощает суть женственности и изысканности.',
  'Dolce Shine by Dolce & Gabbana is a vibrant and sparkling fragrance, featuring notes of mango, jasmine, and blonde woods. It\'s a modern and radiant scent.': 'Dolce Shine от Dolce & Gabbana - это яркий и искрящийся парфюм с нотами манго, жасмина и светлого дерева. Это современный и сияющий аромат.',
  'Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It\'s a modern and romantic scent.': 'Gucci Bloom от Gucci - это цветочный и завораживающий парфюм с нотами труберозы, жасмина и рангунской лианы. Это современный и романтичный аромат.',
  'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.': 'Кровать Annibale Colombo - это роскошная и элегантная кровать, изготовленная из высококачественных материалов для комфортной и стильной спальни.',
  'The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.': 'Диван Annibale Colombo - это изысканный и удобный вариант сиденья с великолепным дизайном и премиальной обивкой для вашей гостиной.',
  'The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.': 'Тумбочка из африканской вишни - это стильное и функциональное дополнение к вашей спальне, обеспечивающее удобное место для хранения и нотку элегантности.',
  'The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.': 'Кресло Knoll Saarinen Executive Conference - это современное и эргономичное кресло, идеально подходящее для вашего офиса или конференц-зала благодаря своему вневременному дизайну.',
  'The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.': 'Деревянная ванная раковина с зеркалом - это уникальное и стильное дополнение к вашей ванной комнате с деревянной столешницей и подходящим зеркалом.',
  
  // Common words
  'iPhone': 'Айфон',
  'Samsung': 'Самсунг',
  'Huawei': 'Хуавей',
  'Lenovo': 'Леново',
  'Dell': 'Делл',
  'HP': 'ЭйчПи',
  'Asus': 'Асус',
  'Acer': 'Эйсер',
  'MSI': 'ЭмЭсАй',
  'Google': 'Гугл',
  'Microsoft': 'Майкрософт',
  'Amazon': 'Амазон',
  'Nike': 'Найк',
  'Adidas': 'Адидас',
  'Puma': 'Пума',
  'Reebok': 'Рибок',
  'Zara': 'Зара',
  'H&M': 'Эйч энд Эм',
  'Gucci': 'Гуччи',
  'Louis Vuitton': 'Луи Виттон',
  'Chanel': 'Шанель',
  'Hermes': 'Эрмес',
  'Prada': 'Прада',
  'Dior': 'Диор',
  'Versace': 'Версаче',
  'Balenciaga': 'Баленсиага',
  'Off-White': 'Офф-Уайт',
  'Supreme': 'Суприм',
  'Bape': 'Бэйп',
  'Palace': 'Пэлас',
  'Comme des Garcons': 'Комм де Гаркон',
  'Yohji Yamamoto': 'Ёдзи Ямамото',
  'Issey Miyake': 'Исси Мияке',
  'Kenzo': 'Кензо',
  'Uniqlo': 'Юникло',
  'Muji': 'Муджи',
  'COS': 'Кос',
  'Massimo Dutti': 'Массимо Дутти',
  'Bershka': 'Бершка',
  'Stradivarius': 'Страдивариус',
  'Pull&Bear': 'Пул энд Бэр',
  'Oysho': 'Ойшо',
  'Lefties': 'Левтайс'
};

export const fetchGroceries = async (params = {}) => {
  try {
    const { limit = 20, skip = 0, category = '', search = '' } = params;
    
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }
    
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our expected structure and translate
    // Convert USD prices to KGS (Kyrgyz Som) using exchange rate 1 USD = 87.41 KGS
    // Round to nearest 10 for realistic pricing
    const transformedProducts = data.products.map(product => ({
      id: product.id,
      name: translations[product.title] || product.title,
      brand: translations[product.brand] || product.brand || 'Общий',
      category: translations[product.category] || product.category,
      image: product.thumbnail,
      description: translations[product.description] || product.description,
      price: Math.round(product.price * 87.41 / 10) * 10, // Convert to KGS and round to nearest 10
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock
    }));
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching groceries:', error);
    throw error;
  }
};

export const fetchGroceryCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const categories = await response.json();
    
    // Translate category names
    const translatedCategories = categories.map(category => ({
      ...category,
      name: translations[category.name] || category.name
    }));
    
    return translatedCategories;
  } catch (error) {
    console.error('Error fetching grocery categories:', error);
    throw error;
  }
};

export const searchGroceries = async (searchTerm) => {
  return fetchGroceries({ search: searchTerm });
};

export const fetchGroceriesByCategory = async (category) => {
  return fetchGroceries({ category });
};