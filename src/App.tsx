import { useState } from 'react';
import { useQuery } from 'react-query';

import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Item } from './components/Item/Item';
import { Cart } from './components/Cart/Cart';

import { Wrapper, StyledButton } from './App.styles';

export interface CartItemType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const STORE_URL = 'https://fakestoreapi.com/products';

const getProducts = async () => {
  try {
    return await (await fetch(STORE_URL)).json();
  } catch (error) {
    console.log('%c-> developmentConsole: error= ', 'color:#77dcfd', error);
  }
};

const App = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const handleAddToChart = (clickedItem: CartItemType) => {
    setCartItems((prevState) => {
      // item exist already in the cart
      const isItemInCart = prevState.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prevState.map((item) =>
          item.id === clickedItem.id
            ? {
                ...item,
                amount: item.amount + 1,
              }
            : item
        );
      } else {
        return [...prevState, { ...clickedItem, amount: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevState) =>
      prevState.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return acc;
          }
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LinearProgress />;
    }
    if (error) {
      return <h3>Something went wrong ...</h3>;
    }
    return (
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4} md={3}>
            <Item item={item} handleAddToChart={handleAddToChart} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToChart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge
          overlap="rectangular"
          badgeContent={getTotalItems(cartItems)}
          color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      {renderContent()}
    </Wrapper>
  );
};

export default App;
