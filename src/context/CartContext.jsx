import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const INCREASE_QTY = 'INCREASE_QTY';
const DECREASE_QTY = 'DECREASE_QTY';
const CLEAR_CART = 'CLEAR_CART';
const SET_CART = 'SET_CART';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case INCREASE_QTY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };

    case DECREASE_QTY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
      };

    case CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case SET_CART:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

const getInitialState = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      return { items: JSON.parse(savedCart) };
    } catch (e) {
      return { items: [] };
    }
  }
  return { items: [] };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const increaseQty = (id) => {
    dispatch({ type: INCREASE_QTY, payload: id });
  };

  const decreaseQty = (id) => {
    dispatch({ type: DECREASE_QTY, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart: state.items,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      getCartCount,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;