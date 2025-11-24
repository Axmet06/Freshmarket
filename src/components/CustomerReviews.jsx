import React from 'react';
import '../styles/customer-reviews.css';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Анна К.',
      rating: 5,
      date: '15 октября 2023',
      review: 'Заказала Chanel No. 5 - просто восторг! Аромат持久, упаковка идеальная. Доставка быстрая, всё как promised. Обязательно закажу ещё!',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      name: 'Мария С.',
      rating: 4,
      date: '3 ноября 2023',
      review: 'Отличный магазин! Купила подарочный набор для подруги - она в восторге. Упаковка красивая, цены приятно удивили.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Елена В.',
      rating: 5,
      date: '22 сентября 2023',
      review: 'Пользуюсь этим магазином уже полгода. Всегда свежие ароматы, оригинальная продукция. Рекомендую всем любителям парфюма!',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      name: 'Дарья П.',
      rating: 5,
      date: '5 октября 2023',
      review: 'Заказала тестер Dior Sauvage - отличная покупка! Экономия и возможность попробовать перед покупкой полного объема.',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    {
      id: 5,
      name: 'Ольга М.',
      rating: 4,
      date: '18 ноября 2023',
      review: 'Хороший выбор, удобный сайт. Заказала подарочную упаковку - всё пришло в идеальном состоянии. Буду заказывать ещё.',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg'
    },
    {
      id: 6,
      name: 'Виктория Л.',
      rating: 5,
      date: '1 ноября 2023',
      review: 'Лучший магазин парфюмерии в городе! Широкий ассортимент, выгодные цены, отличное обслуживание. Спасибо за качество!',
      avatar: 'https://randomuser.me/api/portraits/women/76.jpg'
    }
  ];

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="reviews-section">
      <div className="container">
        <h2 className="section-title">Отзывы покупателей</h2>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card glass fade-in">
              <div className="review-header">
                <img src={review.avatar} alt={review.name} className="review-avatar" />
                <div className="review-info">
                  <h3 className="reviewer-name">{review.name}</h3>
                  <div className="review-date">{review.date}</div>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;