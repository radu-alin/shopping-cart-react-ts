import Button from '@material-ui/core/Button';

import { CartItemType } from '../../App';

import { Wrapper } from './Item.styles';

interface ItemType {
  item: CartItemType;
  handleAddToChart: (clickedItem: CartItemType) => void;
}

export const Item = ({ item, handleAddToChart }: ItemType) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToChart(item)}>Add To Cart</Button>
  </Wrapper>
);
