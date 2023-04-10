import { useParams } from 'react-router-dom';
import './styles.css';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products-context';
import { BreadCrumbs } from '../../components/navigate';

export const ProductPage = () => {

  const { id } = useParams();
  const products = useContext(ProductsContext);
  const product = products.find(pr => pr._id === id);

  return <>
    <BreadCrumbs textButton="Назад" title={product?.name}>
      <div className={'product__header'}>
        <span className={'vendor-code'}><span className={'vendor-code__sub-header'}>Артикул:</span>&nbsp;2388907</span>
      </div>
    </BreadCrumbs>
    <div className="product__general">
      <img className={'product__img'} src={product?.pictures} alt={''}/>
    </div>
    <div className="product__details">
      <section className="product__description">
        <h2>Описание</h2>
        <p>{product?.description}. (!Только для заполнения текста!) Бублик из бычьего корня-забавная, интересная, вкусная, а главное полезная вкусняшка
          для вашего любимца. Неповторимый вкус этого лакомства надолго отвлечет Вашего питомца от любых дел.</p>
      </section>
      <section className="product__properties">
        <h2>Характеристики</h2>
      </section>
      <div className="product__reviews">
        <h2>Отзывы</h2>
      </div>
    </div>
  </>;
};