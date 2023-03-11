import './styles.css';

export const FilterHeader = ({ searchValue, numberOfRecords }) => {

  const productDef = () => {
    const str = 'товар';
    if (numberOfRecords % 10 === 1 && numberOfRecords % 100 !== 11) {
      return str;
    }

    if (numberOfRecords % 10 > 4 || numberOfRecords % 10 === 0 || numberOfRecords % 100 > 10 && numberOfRecords % 100 < 15)
      return str + 'ов';
    if (numberOfRecords % 10 > 0 && numberOfRecords < 5) {
      return str + 'а';
    }
  };

  const founded = () => {
    if (numberOfRecords === 1) {
      return 'найден';
    }

    return 'найдено';
  };

  return <div className={'filter'}>
    <p className={'filter__message'}>
      По запросу <span
      className={'search__value'}>{searchValue.toLowerCase()}</span> {founded()} {numberOfRecords} {productDef()}</p>
  </div>;
};