import { ReactComponent as CartIcon } from './assets/cart.svg';
import { ReactComponent as FavoriteIcon } from './assets/ic-favorites-babl.svg';
import { ReactComponent as ProfileIcon } from './assets/ic-profile.svg';
import { ReactComponent as UserIcon } from './assets/user.svg';
import './styles.css';
import { useContext, useRef, useState } from 'react';
import cn from 'classnames';
import { UserContext } from '../../contexts/user-content';
import { useOutsideClick } from '../../hooks/outside-click';
import { Link, useLocation } from 'react-router-dom';

export const MenuActions = () => {

  const location = useLocation();
  const currentUser = useContext(UserContext);
  const [profilePopupActive, setProfilePopupActive] = useState(false);

  const profilePopupRef = useRef(null);

  useOutsideClick(profilePopupRef, () => setProfilePopupActive(false));

  const toggleProfileInfo = () => {
    setProfilePopupActive(prev => !prev);
  };

  return <div className="menu">
    <div><FavoriteIcon/></div>
    <div><CartIcon/></div>
    <div>{currentUser && <Link to={'/login'} replace state={{ backgroundLocation: location, initialPath: location.pathname }}><ProfileIcon/></Link>}</div>
    <div className={'menu__action'}>
      <UserIcon onClick={toggleProfileInfo}/>
      <div className={cn('profile__popup', { 'popup__active': profilePopupActive })} ref={profilePopupRef} onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex-bob profile__avatar">
          <img src={currentUser?.avatar} alt="avatar" width={50}/>
        </div>
        <div>
          <h3 className={'profile__name'}>{currentUser?.name}</h3>
          <span className={'profile__email'}>{currentUser?.email}</span>
        </div>

      </div>
    </div>
  </div>;
};