import { Card } from '../card';
import './styles.css';

export const Cards = ({ data }) => {

  const getCards = () => {
    return data.map((record, index) => <Card key={index} {...record} />);
  };

  return <>
    <div className="cards content__cards">
      {getCards()}
    </div>
    ;
  </>;
};