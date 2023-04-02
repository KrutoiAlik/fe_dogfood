import './styles.css';
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';

export const Search = ({ value, handleChange, handleSubmit }) => {

  const resetSearch = () => {
    handleChange('');
    document.getElementById('searchInputId').value = '';
  };

  return <form className="search" onSubmit={handleSubmit}>
    <input id="searchInputId"
           className="search__input"
           type="text"
           placeholder="Поиск..."
           onChange={(e) => handleChange(e.target.value)}/>
    <button className="search__btn" type="submit">
      {value ? <CloseIcon onClick={() => resetSearch()}/> : <SearchIcon/>}
    </button>
  </form>;
};