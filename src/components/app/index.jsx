import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { Cards } from '../cards';
import { dataCard as data } from '../../data';
import { useState, useEffect } from 'react';
import { Footer } from '../footer';
import { FilterHeader } from '../filter-header';
import { MenuActions } from '../menu-actions';

function App() {

  const [products, setProducts] = useState(data || []);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterProducts();
  };

  function filterProducts() {
    const filteredProducts = data.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
    setProducts(filteredProducts);
  }

  useEffect(() => {
    filterProducts();
  }, [searchValue]);

  return (
    <>
      <Header>
        <Logo/>
        <Search value={searchValue} handleChange={handleSearchChange} handleSubmit={handleSearchSubmit}/>
        <MenuActions/>
      </Header>
      <main className="content container">
        {searchValue && <FilterHeader searchValue={searchValue} numberOfRecords={products.length}/>}
        <Cards data={products}/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
