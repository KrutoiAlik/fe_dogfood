import { useMemo } from 'react';
import s from './styles.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export const ProductReviews = ({ product, reviewList = [] }) => {

  const getReviewElements = () => {

    if (!product.reviews?.length) return <p className={'no-reviews__message'}>Отзывов нет</p>;
    product.reviews.sort((r1, r2) => {
      if(r1.created_at > r2.created_at) return -1;
      if(r1.created_at < r2.created_at) return 1;
      return 0;
    });
    return product.reviews.map(review => (
      <div key={review._id} className={s.review}>
        <h2 className={s.review__title}>{review.author.name.split(' ')[0]}&nbsp;
          <span className={s.review__created}>{dayjs(review.created_at).format('DD.MM.YY')}</span>
        </h2>
        <h5 className={s.review__address}>{review.city || 'Страна чудес'}</h5>
        <div className={s.review__content}>
          {review.text}
        </div>
      </div>));
  };

  const reviewElements = useMemo(getReviewElements, [reviewList]);

  return <div className="product__reviews">
    <h2>Отзывы</h2>
    <div className={'review-actions'}>
      <Link to={`/product/review/${product?._id}`}>
        <button className={cn('btn', 'btn-outline', s['btn-outline'])}>Написать отзыв</button>
      </Link>
    </div>
    <div className={s['review-list']}>
      {reviewElements}
    </div>
  </div>;
};