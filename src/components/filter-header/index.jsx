import './styles.css';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products-context';
import { SearchContext } from '../../contexts/search-context';

export const FilterHeader = () => {

  const searchValue = useContext(SearchContext);
  const products = useContext(ProductsContext);

  const productDef = () => {
    const str = 'товар';
    if (products?.length % 10 === 1 && products?.length % 100 !== 11) {
      return str;
    }

    if (products?.length % 10 > 4 || products?.length % 10 === 0 || (products?.length % 100 > 10 && products?.length % 100 < 15))
      return str + 'ов';
    if (products?.length % 10 > 0 && products?.length < 5) {
      return str + 'а';
    }
  };

  const founded = () => {
    if (products?.length === 1) {
      return 'найден';
    }

    return 'найдено';
  };

  return <div className={'filter'}>
    <p className={'filter__message'}>
      По запросу <span
      className={'search__value'}>{searchValue.toLowerCase()}</span> {founded()} {products?.length} {productDef()}</p>
  </div>;
};