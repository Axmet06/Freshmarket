import React from 'react';
import '../styles/customer-reviews.css';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Анна К.',
      rating: 5,
      date: '15 октября 2023',
      review: 'Заказала продукты - просто восторг! Качество отличное, упаковка идеальная. Доставка быстрая, всё как обещано. Обязательно закажу ещё!',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      name: 'Мария С.',
      rating: 4,
      date: '3 ноября 2023',
      review: 'Отличный магазин! Купила продукты для семьи - все довольны. Упаковка красивая, цены приятно удивили.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Елена В.',
      rating: 5,
      date: '22 сентября 2023',
      review: 'Пользуюсь этим магазином уже полгода. Всегда свежие продукты, высокое качество. Рекомендую всем!',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      name: 'Дарья П.',
      rating: 5,
      date: '5 октября 2023',
      review: 'Заказала пробник нового продукта - отличная покупка! Экономия и возможность попробовать перед основной покупкой.',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    {
      id: 5,
      name: 'Ольга М.',
      rating: 4,
      date: '18 ноября 2023',
      review: 'Хороший выбор, удобный сайт. Заказала продукты в подарочной упаковке - всё пришло в идеальном состоянии. Буду заказывать ещё.',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg'
    },
    {
      id: 6,
      name: 'Виктория Л.',
      rating: 5,
      date: '1 ноября 2023',
      review: 'Лучший магазин продуктов в городе! Широкий ассортимент, выгодные цены, отличное обслуживание. Спасибо за качество!',
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