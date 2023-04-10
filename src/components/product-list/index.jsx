import { Product } from '../card';
import './styles.css';
import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/products-context';

export const ProductList = () => {

  const products = useContext(ProductsContext);

  const getProductElements = () => {
    return products?.map((record, index) => <Product key={index} {...record} />);
  };

  const productElements = useMemo(() => getProductElements(), [products]);

  return <>
    <div className="cards content__cards">
      {productElements}
    </div>
  </>;
};