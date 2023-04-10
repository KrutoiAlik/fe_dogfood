import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export const Logo = ({ className, href }) => {

  const value = href || null;

  if (value) {
    return <Link replace to={{ pathname: value }} className={cn('logo', { className: !!className })}>
      <img className="logo__img" src={logo} alt="logo"/>
    </Link>;
  }

  return <span className={`${className} logo`}>
    <img className="logo__img" src={logo} alt="logo"/>
  </span>;
};