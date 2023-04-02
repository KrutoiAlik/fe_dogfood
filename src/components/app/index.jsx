import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { Cards } from '../cards';
import { useState, useEffect } from 'react';
import { Footer } from '../footer';
import { FilterHeader } from '../filter-header';
import { MenuActions } from '../menu-actions';
import { productService } from '../../services/product-service';
import { useDebounce } from '../../hooks/debounce';
import { userService } from '../../services/user-service';
import { UserContext } from '../../contexts/user-content';

function App() {

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const debouncedValue = useDebounce(searchValue.toLowerCase(), 300);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterProducts();
  };

  function filterProducts() {
    productService
      .filterByQuery(debouncedValue)
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
  }, [debouncedValue]);

  return (
    <>
      <UserContext.Provider value={userInfo}>
        <Header>
          <Logo/>
          <Search value={searchValue} handleChange={handleSearchChange} handleSubmit={handleSearchSubmit}/>
          <MenuActions/>
        </Header>
        <main className="content container">
          {debouncedValue && <FilterHeader searchValue={debouncedValue} numberOfRecords={products.length}/>}
          {userInfo && <Cards data={products}/>}
        </main>
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;
