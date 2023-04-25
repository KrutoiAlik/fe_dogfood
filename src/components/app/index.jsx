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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contexts/search-context';
import { CatalogPage } from '../../pages/catalog';
import { ProductPage } from '../../pages/product';
import { NotFoundPage } from '../../pages/not-found';
import { Modal } from '../modal';
import { AddReviewPage } from '../../pages/add-review';
import { Login } from '../login';
import { Register } from '../register';
import { Reset } from '../reset';

function App() {

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const debouncedSearchValue = useDebounce(searchValue.toLowerCase(), 300);

  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  const closeModal = () => {
    navigate(initialPath || '/', { replace: true });
  };

  const onNavigateRegister = (e) => {
    e.preventDefault();
    navigate('/register', {
      replace: true,
      state: {
        backgroundLocation: {
          ...location,
          state: null
        },
        initialPath
      }
    });
  };

  const onNavigateLogin = (e) => {
    e.preventDefault();
    navigate('/login', {
      replace: true,
      state: {
        backgroundLocation: {
          ...location,
          state: null
        },
        initialPath
      }
    });
  };

  const onNavigateReset = (e) => {
    e.preventDefault();
    navigate('/reset', {
      replace: true,
      state: {
        backgroundLocation: {
          ...location,
          state: null
        },
        initialPath
      }
    });
  };

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
              <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
                <Route path="/" element={<CatalogPage/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="/product/review/:id" element={<AddReviewPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
            </main>
            <Footer/>

            {backgroundLocation &&
              <Routes>
                <Route path="/login" element={
                  <Modal isOpen onClose={closeModal}>
                    <Login onNavigateRegister={onNavigateRegister}
                           onNavigateReset={onNavigateReset}
                           onSubmit={(data) => console.log('submit login', { data })}
                           onClose={closeModal}/>
                  </Modal>
                }/>

                <Route path="/register" element={
                  <Modal isOpen onClose={closeModal}>
                    <Register onSubmit={(data) => console.log('submit register', { data })}
                              onClose={closeModal}
                              onNavigateLogin={onNavigateLogin}/>
                  </Modal>
                }/>

                <Route path="/reset" element={
                  <Modal isOpen onClose={closeModal}>
                    <Reset onClose={closeModal} onSubmit={(data) => console.log('submit reset', { data })}/>
                  </Modal>
                }/>
              </Routes>
            }

          </ProductsContext.Provider>
        </SearchContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
