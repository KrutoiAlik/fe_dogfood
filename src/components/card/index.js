import { useContext, useState } from 'react';
import cn from 'classnames';

import './styles.css';
import { ReactComponent as FavoriteIcon } from './assets/ic-favorites.svg';
import { ReactComponent as FavoriteIconLiked } from './assets/ic-favorites-liked.svg';
import { UserContext } from '../../contexts/user-content';
import { productService } from '../../services/product-service';
import { Link } from 'react-router-dom';

export const Product = ({
  _id,
  name,
  price,
  discount,
  weight,
  pictures,
  likes,
}) => {

  const currentUser = useContext(UserContext);
  const discountedPrice = discount !== 0 ? price * (1 - discount / 100) : 0;

  const [isFavorite, setFavorite] = useState(currentUser?._id ? likes.includes(currentUser._id) : false);

  const handleClick = () => {
    if(isFavorite){
      productService.removeLike(_id).then(() => setFavorite(false));
    } else {
      productService.addLike(_id).then(() => setFavorite(true));
    }
  };

  return <div className={'card'}>
    <div className={'card__sticky card__sticky_type_top-left'}>
      {discount !== 0 && <span className={'card__discount'}>{`-${discount}%`}</span>}
    </div>
    <div className={'card__sticky card__sticky_type_top-right'}>
      <button className={cn('card__favorite', { 'card__favorite-liked': isFavorite })}
              onClick={handleClick}>
        {isFavorite ? <FavoriteIconLiked/> : <FavoriteIcon/>}
      </button>
    </div>
    <Link to={`/product/${_id}`} className={'card__link'} >
      <img className={'card__image'} src={pictures} alt={name}/>
      <div className="card__desc">
        {discount !== 0
          ? (
            <>
              <span className="card__old-price">{price}&nbsp;₽</span>
              <span className="card__price card__price_type_discount">{discountedPrice}&nbsp;₽</span>
            </>)
          : <span className="card__price">{price}&nbsp;₽</span>
        }
        <span className="card__weight">{weight}</span>
        <h3 className="card__name">{name}</h3>
      </div>
    </Link>
    <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
  </div>;
};