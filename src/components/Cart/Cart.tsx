import { CartItem } from '../CartItem/CartItem';

import { Wrapper } from './Cart.styles';

import { CartItemType } from '../../App';

interface CartProps {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

export const Cart = ({ cartItems, addToCart, removeFromCart }: CartProps) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h3>Total: ${calculateTotal(cartItems).toFixed(2)}</h3>
    </Wrapper>
  );
};
