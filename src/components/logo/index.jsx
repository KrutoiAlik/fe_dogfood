import './styles.css';
import logo from '../../assets/logo.svg';

export const Logo = () => {
    return <a href="/" className="logo">
        <img className='logo__img' src={logo} alt='logo' />
    </a>
}