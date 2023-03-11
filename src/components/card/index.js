import './styles.css';
import {ReactComponent as FavoriteIcon} from './assets/ic-favorites.svg';

export const Card = ({
  name,
  price,
  discount,
  weight,
  picture
}) => {

  const discountedPrice = discount !== 0 ? price * (1 - discount / 100) : 0;

  return <div className={'card'}>
    <div className={'card__sticky card__sticky_type_top-left'}>
      {discount !== 0 && <span className={'card__discount'}>{`-${discount}%`}</span>}
    </div>
    <div className={'card__sticky card__sticky_type_top-right'}>
      <button className={'card__favorite'}>
        <FavoriteIcon/>
      </button>
    </div>
    <a href="#" className={'card__link'}>
      <img className={'card__image'} src={picture} alt={name}/>
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
    </a>
    <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
  </div>;
};