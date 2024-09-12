import React from "react";

function LatestNews() {
  const mockData = [
    {
      id: 1,
      title: "زيلينسكي: خطتنا قد تدفع روسيا لإنهاء الحرب دبلوماسيا",
      image: "/src/assets/_123388662_zelensky.jpg",
      date: "2024-09-11",
      category: "دوليات",
    },
    {
      id: 2,
      title: "تايلور سويفت تعلن تأييدها لهاريس في الانتخابات الرئاسية",
      image: "/src/assets/f3db88d3f76cf546544eca7199920c659d767953.jpg",
      date: "2024-09-11",
      category: "متفرقات",
    },
    {
      id: 3,
      title:
        "انتقادات لرئيس بنك الاحتياطي الفيدرالي بأتلانتا لانتهاكات استثمارية",
      image: "/src/assets/Capture-24.png",
      date: "2024-09-12",
      category: "اقتصاد",
    },
    {
      id: 4,
      title: "بعد 8 أشهر.. روزفلت الأميركية تغادر الشرق الأوسط",
      image: "/src/assets/3089091.jpg",
      date: "2024-09-11",
      category: "دوليات",
    },
    {
      id: 5,
      title: "بـ600 مليون دولار.. خطة استجابة لجدري القردة على مستوى إفريقيا",
      image:
        "/src/assets/1000x563_cmsv2_8af25893-748d-50af-aeba-e6f0b2f6ce54-6704238-780x470.jpg",
      date: "2024-09-12",
      category: "صحة",
    },
    {
      id: 6,
      title: "كارولينا هيريرا تتربّع ملكة على عرش أسبوع نيويورك للموضة",
      image: "/src/assets/372695.jpg.webp",
      date: "2024-09-11",
      category: "متفرقات",
    },
    {
      id: 7,
      title: "للمرة الخامسة.. إسرائيل تقصف مدرسة نازحين بغزة وتقتل 18",
      image:
        "/src/assets/523f26d5-20df-44d4-aff5-0dfabb2fecf9_16x9_1200x676.webp",
      date: "2024-09-12",
      category: "الوضع العربي",
    },
    {
      id: 8,
      title: "موظف سابق في أبل ينتقد هاتف آيفون 16 ويصفه بالسيئ والمخيب للآمال",
      image: "/src/assets/Apple-iPhone-16-release-date-price-and-features.jpg",
      date: "2024-09-11",
      category: "اقتصاد",
    },
    {
      id: 9,
      title: "بو حبيب: السلام الدائم في المنطقة يتطلب حل القضية الفلسطينية",
      image: "/src/assets/abdallah bou habib12.jpg",
      date: "2024-09-12",
      category: "تحليل سياسي",
    },
    {
      id: 10,
      title: "الجيش يحرر 3 مخطوفين",
      image: "/src/assets/1649533659blobid0.jpg",
      date: "2024-09-11",
      category: "عدل وأمن",
    },
  ];
  return (
    <div className="latest-list">
      {mockData.map((latestItem, index) => (
        <div className="latest-item" key={index}>
          <img src={latestItem.image} alt={latestItem.title} />
          <div className="latest-details">
            <h2 className="latest-title">{latestItem.title}</h2>
            <div className="line">
              <p className="latest-date">{latestItem.date}</p>
              <h4 className="latest-category">{latestItem.category}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestNews;
