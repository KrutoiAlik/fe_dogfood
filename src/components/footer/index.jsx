import './styles.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

export const Footer = () => {

  return <footer>
    <div className="container">

      <div className="footer__logo"><LogoIcon/>
      </div>
      <ul className="footer__links">
        <li className="footer__link">Каталог</li>
        <li className="footer__link">Акции</li>
        <li className="footer__link">Новости</li>
        <li className="footer__link">Отзывы</li>
      </ul>
      <ul className="footer__links">
        <li className="footer__link">Оплата и доставка</li>
        <li className="footer__link">Часто спрашивают</li>
        <li className="footer__link">Обратная связь</li>
        <li className="footer__link">Контакты</li>
      </ul>
      <div className="footer__contacts">
        <h2 className="footer__contacts-title">Мы на связи</h2>
        <h2 className="footer__contacts-phone">8 (999) 00-00-00</h2>
        <span className="footer__email">dogfood.ru@gmail.com</span>
        <div className="footer__socials">
        </div>
      </div>
    </div>
  </footer>;
};