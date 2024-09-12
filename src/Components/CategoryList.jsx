import React from "react";

const mockCategories = [
  {
    name: "دوليات",
    newsItems: [
      {
        id: 1,
        title: "هدية قيّمة من الملكة الراحلة للأمير هاري.. ما هي؟",
        url: "/src/assets/prince-harry-queen-18e96e20add74a5b81c64cbc0f8a2d6b.jpg",
        date: "2024-09-09",
      },
      {
        id: 2,
        title: "فيتنام: 65 قتيلًا و39 مفقودًا في الإعصار",
        url: "/src/assets/vietnam.jpg",
        date: "2024-09-10",
      },
    ],
  },
  {
    name: "متفرقات",
    newsItems: [
      {
        id: 3,
        title: "!ماسك: سنتمكن من نقل البشر إلى المريخ",
        url: "/src/assets/skynews-elon-musk-x_6659746.jpg",
        date: "2024-09-01",
      },
      {
        id: 4,
        title: "!زفاف ابن أغنى رجل في آسيا يوقف حركة المرور لأيام",
        url: "/src/assets/061b6693-8746-4854-8e44-24a5f2af81f8.jpg",
        date: "2024-09-10",
      },
    ],
  },
  {
    name: "عدل وأمن",
    newsItems: [
      {
        id: 5,
        title: "توقيف رياض سلامة",
        url: "/src/assets/Doc-P-794152-638611312428363141.jpg",
        date: "2024-09-03",
      },
      {
        id: 6,
        title: "...خرج من منزله في كسروان ولم يعد",
        url: "/src/assets/554795533396.jpg",
        date: "2024-09-11",
      },
    ],
  },
  {
    name: "الوضع العربي",
    newsItems: [
      {
        id: 7,
        title: "انتخابات الجزائر.. تبون يفوز بولاية رئاسية ثانية",
        url: "/src/assets/000_36FK4JZ-1.jpg",
        date: "2024-09-08",
      },
      {
        id: 8,
        title: "المغرب… تحرك برلماني لحظر تيك توك",
        url: "/src/assets/tiktok-banned-02.jpg",
        date: "2024-08-27",
      },
    ],
  },
];

function CategoryList() {
  return (
    <div className="categories-container">
      {mockCategories.map((category) => (
        <div key={category.name} className="category">
          <h2 className="category-name">{category.name}</h2>
          <div className="news-items">
            {category.newsItems.map((item) => (
              <div key={item.id} className="news-item">
                <img src={item.url} alt={item.title} className="news-image" />
                <div className="news-info">
                  <span className="news-date">🕘 {item.date}</span>
                  <span className="name">{category.name}</span>
                </div>
                <p className="news-title">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
