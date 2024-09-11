import React, { useState, useEffect } from "react";

function NewsSlider() {
  const mockData = [
    {
      index: 1,
      date: "2023-03-25",
      slogan: "ليف إلى قادة لبنان: لم يتبق المزيد من الوقت",
      title: "اخبار محلية",
      image: "/src/assets/20b3844209bd622c8c99eaaab6d0c81a-1.jpeg",
    },
    {
      index: 2,
      date: "2024-09-08",
      slogan:
        "استطلاع: هاريس وترامب متعادلان تقريباً قبل نهاية الحملات الانتخابيّة",
      title: "دوليات",
      image: "/src/assets/GettyImages-2170588081-1024x683.jpg",
    },
    {
      index: 3,
      date: "2024-09-10",
      slogan: "انخفاض كبير في أسعار المحروقات",
      title: "اقتصاد",
      image:
        "/src/assets/Capture_379607_819783_298074_741312_650937_110885_873086_230410_749165.jpg",
    },
    {
      index: 4,
      date: "2024-09-10",
      slogan: "الصحة العالمية: ارتفاع حاد عام 2023 بحالات الكوليرا ووفياتها",
      title: "صحة",
      image: "/src/assets/IMG_0708.jpeg",
    },
  ];
  return (
    <div className="news-slider-container">
      <div className="news-slider">
        {mockData.map((newsItem, index) => (
          <div className="news-slide" key={index}>
            <img src={newsItem.image} alt={newsItem.title} />
            <div className="news-details">
              <div className="news-date-container">
                <span className="date-icon">🕘</span>
                <p className="news-date">{newsItem.date}</p>
              </div>
              <h2 className="news-title">{newsItem.title}</h2>
              <p className="news-slogan">{newsItem.slogan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSlider;
