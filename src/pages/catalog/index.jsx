import { useContext } from 'react';
import { SearchContext } from '../../contexts/search-context';
import { FilterHeader } from '../../components/filter-header';
import { UserContext } from '../../contexts/user-content';
import { ProductList } from '../../components/product-list';

export const CatalogPage = ({}) => {

  const searchValue = useContext(SearchContext);
  const userInfo = useContext(UserContext);

  return <>
    {searchValue && <FilterHeader/>}
    {userInfo && <ProductList/>}
  </>;
};