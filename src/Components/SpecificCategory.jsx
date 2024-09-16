import React, { useState, useEffect } from "react";
import { getArticlesByCategory } from "../api";

function SpecificCategory({ activeCategory }) {
  // const mockNewsData = [
  //   {
  //     id: 1,
  //     title: "اعلان هام من وزير الاشغال",
  //     image: "/src/assets/IMG_0154.jpeg",
  //     date: "2024-09-13",
  //     time: "19:27",
  //     category: "اقتصاد",
  //   },
  //   {
  //     id: 2,
  //     title: "مشروع موازنة 2025 بأرقامه الضريبية",
  //     image: "/src/assets/3278b0a6afd84bc3fee3d3d60775e241-745x470.png",
  //     date: "2024-09-12",
  //     time: "03:00",
  //     category: "اقتصاد",
  //   },
  //   {
  //     id: 3,
  //     title: "أسباب تعليق التداول بمنتجات من اللبنة والجبنة",
  //     image: "/src/assets/IMG_3361.jpeg",
  //     date: "2024-09-12",
  //     time: "15:14",
  //     category: "اقتصاد",
  //   },

  //   {
  //     id: 4,
  //     title: "ارتفاع كبير في سعر لحوم الأبقار الأوروبية",
  //     image: "/src/assets/meatttt.webp",
  //     date: "2024-09-12",
  //     time: "12:00",
  //     category: "اقتصاد",
  //   },
  //   {
  //     id: 5,
  //     title: "مليون دولار لدعم طلاب جامعة سيدة اللويزة",
  //     image: "/src/assets/ndu-1536x1023.jpeg",
  //     date: "2024-09-12",
  //     time: "03:09",
  //     category: "اقتصاد",
  //   },
  //   {
  //     id: 6,
  //     title: "أسعار الذهب تتراجع",
  //     image: "/src/assets/gold1.jpg",
  //     date: "2024-09-13",
  //     time: "10:10",
  //     category: "اقتصاد",
  //   },
  //   {
  //     id: 7,
  //     title: "تقرير بنك عوده عن القطاع العقاري في لبنان",
  //     image: "/src/assets/IMG_0120.jpeg",
  //     date: "2024-09-13",
  //     time: "04:07",
  //     category: "اقتصاد",
  //   },
  //   {
  //     id: 8,
  //     title: "الروبوتات الصغيرة علاج للنزيف في المخ",
  //     image:
  //       "/src/assets/دراسة-حقن-أسراب-من-الروبوتات-الصغيرة-لعلاج-النزيف-في-المخ.jpg",
  //     date: "2024-09-12",
  //     time: "03:00",
  //     category: "صحة",
  //   },
  //   {
  //     id: 9,
  //     title: "عواقب خطيرة لطقطقة الرقبة",
  //     image: "/src/assets/طفطفة-الرررقبة.jpeg",
  //     date: "2024-09-12",
  //     time: "13:13",
  //     category: "صحة",
  //   },
  //   {
  //     id: 10,
  //     title: "ما هو مرض كرون وما خطورته؟",
  //     image: "/src/assets/3202499376909366894.webp",
  //     date: "2024-09-13",
  //     time: "09:47",
  //     category: "صحة",
  //   },
  //   {
  //     id: 11,
  //     title: "لودريان إلى بيروت؟",
  //     image: "/src/assets/d4c2d05_1652948435972-267581.jpg",
  //     date: "2024-09-13",
  //     time: "13:28",
  //     category: "تحليل سياسي",
  //   },
  //   {
  //     id: 12,
  //     title: "هل الضغوطات الاميركية جدية؟",
  //     image: "/src/assets/333.jpg",
  //     date: "2024-09-13",
  //     time: "07:08",
  //     category: "تحليل سياسي",
  //   },
  //   {
  //     id: 13,
  //     title: "الصحافة الورقية بخطر!",
  //     image: "/src/assets/Newspaper-Secret.jpg",
  //     date: "2024-09-13",
  //     time: "03:49",
  //     category: "متفرقات",
  //   },
  //   {
  //     id: 14,
  //     title: "إنجاز تكنولوجي: شحن الهاتف بـ5 دقائق",
  //     image: "/src/assets/IMG_0432.png",
  //     date: "2024-09-13",
  //     time: "03:00",
  //     category: "متفرقات",
  //   },
  //   {
  //     id: 15,
  //     title: "وفاة مصمم الأزياء العالمي باكو رابان",
  //     image: "/src/assets/Paco-Rabanne.jpg",
  //     date: "2024-09-13",
  //     time: "08:01",
  //     category: "متفرقات",
  //   },
  //   {
  //     id: 16,
  //     title: "تدابير سير لمناسبة استقبال جثمان البطريرك أغاجانيان",
  //     image: "/src/assets/ExtImage-317162-300712928.webp",
  //     date: "2024-09-13",
  //     time: "01:01",
  //     category: "عدل وأمن",
  //   },
  //   {
  //     id: 17,
  //     title: "جديد الامير وليام والاميرة كيت",
  //     image: "/src/assets/5e9c3052-d63a-4c5b-bb88-5761b10d1e4f.jpeg",
  //     date: "2024-09-13",
  //     time: "11:11",
  //     category: "دوليات",
  //   },
  //   {
  //     id: 18,
  //     title: "إعصار فرنسين يصل إلى اليابسة… وتحذير",
  //     image: "/src/assets/إعصار-1725705178-0.webp",
  //     date: "2024-09-13",
  //     time: "01:23",
  //     category: "دوليات",
  //   },
  //   {
  //     id: 19,
  //     title: "روسيا تعلن استعادة 10 قرى من القوات الأوكرانية في كورسك",
  //     image: "/src/assets/Doc-P-795511-638617403676896481.jpg",
  //     date: "2024-09-13",
  //     time: "03:00",
  //     category: "دوليات",
  //   },
  //   {
  //     id: 20,
  //     title: "من هو أغنى لاعب كرة قدم؟",
  //     image: "/src/assets/8.png",
  //     date: "2024-09-13",
  //     time: "10:59",
  //     category: "متفرقات",
  //   },
  // ];
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticlesByCategory(activeCategory);
        console.log(response.data);
        setArticles(response.data.data); // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  console.log("Articles Data:", articles);
  console.log("Image URL:", articles.image);

  // Filter out articles if the API returns categories in the response
  const filteredArticles = articles.filter(
    (article) => article.category.title === activeCategory
  );

  return (
    <div className="specific-category-page">
      <h1>{activeCategory}</h1>
      {filteredArticles.length > 0 ? (
        <>
          <div className="main-news">
            <div className="main-news-info">
              <p className="snews-date">
                🕘 {new Date(filteredArticles[0].date).toLocaleTimeString()}
              </p>
              <p className="snews-category">
                {filteredArticles[0].category.title}
              </p>
            </div>
            <img
              src={filteredArticles[0].image || "/src/assets/images.png"}
              alt={filteredArticles[0].title}
              className="main-news-image"
              onError={(e) => (e.target.src = "/src/assets/images.png")}
            />
            <h2 className="main-news-title">{filteredArticles[0].title}</h2>
          </div>
          <div className="other-news">
            {filteredArticles.slice(1).map((article) => (
              <div key={article.id} className="news-item">
                <img
                  src={article.image || "/src/assets/images.png"}
                  alt={article.title}
                  className="news-item-image"
                  onError={(e) => (e.target.src = "/src/assets/images.png")}
                />
                <div className="news-item-info">
                  <p className="news-item-date">
                    🕘 {new Date(article.date).toLocaleDateString()}
                  </p>
                  <p className="news-item-category">{article.category.title}</p>
                </div>
                <h3 className="news-item-title">{article.title}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-news">
          No news available for the category: <br /> "{activeCategory}"
        </p>
      )}
    </div>
  );
}

export default SpecificCategory;
