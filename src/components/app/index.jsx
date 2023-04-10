import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { useEffect, useState } from 'react';
import { Footer } from '../footer';
import { MenuActions } from '../menu-actions';
import { productService } from '../../services/product-service';
import { useDebounce } from '../../hooks/debounce';
import { userService } from '../../services/user-service';
import { UserContext } from '../../contexts/user-content';
import { ProductsContext } from '../../contexts/products-context';
import { Route, Routes } from 'react-router-dom';
import { SearchContext } from '../../contexts/search-context';
import { CatalogPage } from '../../pages/catalog';
import { ProductPage } from '../../pages/product';
import { NotFoundPage } from '../../pages/not-found';

function App() {

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const debouncedSearchValue = useDebounce(searchValue.toLowerCase(), 300);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterProducts();
  };

  function filterProducts() {
    productService
      .filterByQuery(debouncedSearchValue)
      .then(data => {
        setProducts(data);
      });
  }

  useEffect(() => {
    Promise.all([productService.getAll(), userService.getCurrentUserInfo()])
      .then(data => {
        const [productsData, userInfo] = data;
        setProducts(productsData.products);
        setUserInfo(userInfo);
      });
  }, []);

  useEffect(() => {
    setProducts([]);
    filterProducts();
  }, [debouncedSearchValue]);

  return (
    <>
      <UserContext.Provider value={userInfo}>
        <SearchContext.Provider value={debouncedSearchValue}>
          <ProductsContext.Provider value={products}>
            <Header>
              <Routes>
                <Route path="*" element={
                  <>
                    <Logo href="/"/>
                    <Search value={searchValue} handleChange={handleSearchChange} handleSubmit={handleSearchSubmit}/>
                    <MenuActions/>
                  </>
                }/>
              </Routes>
            </Header>
            <main className="content container">
              <Routes>
                <Route path="/" element={<CatalogPage/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
            </main>
            <Footer/>
          </ProductsContext.Provider>
        </SearchContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
