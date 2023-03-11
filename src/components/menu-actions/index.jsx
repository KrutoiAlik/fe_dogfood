import {ReactComponent as CartIcon} from './assets/cart.svg';
import {ReactComponent as FavoriteIcon} from './assets/ic-favorites-babl.svg';
import {ReactComponent as ProfileIcon} from './assets/ic-profile.svg';
import './styles.css';

export const MenuActions = () => {
  return <div className='menu'>
    <FavoriteIcon/>
    <CartIcon/>
    <ProfileIcon/>
  </div>
}