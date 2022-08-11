import { useState } from "react";

const useCarrito = () => {
  const [cart, setCart] = useState([]);
  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const getTotal = () => {
    const total = cart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    let discountToApply = 0;
    discountRules.forEach((rule) => {
      const m = rule.m;
      const arrayMoviesWithDiscount = cart.filter((movie) =>
        m.includes(movie.id)
      );
      const existDiscount = arrayMoviesWithDiscount.length === m.length;
      if (!existDiscount) return;
      if (rule.discount > discountToApply) {
        discountToApply = rule.discount;
      }
    });
    discountToApply = discountToApply * total;
    return total - discountToApply;
  };

  const addMovieToCart = (movie) => {
    const isMovie = cart.find((m) => m.id === movie.id);
    if (!isMovie) return setCart([...cart, { ...movie, quantity: 1 }]);
    const cartEditada = cart.map((cartState) => {
      if (cartState.id === movie.id) {
        cartState.quantity++;
      }
      return cartState;
    });
    setCart(cartEditada);
  };

  const decrementQuantity = (movie) => {
    const editedCar = cart
      .map((cartState) => {
        if (cartState.id === movie.id) {
          cartState.quantity--;
        }
        return cartState;
      })
      .filter((cartState) => cartState.quantity > 0);
    setCart(editedCar);
  };

  const incrementQuantity = (movie) => {
    const editedCar = cart.map((cartState) => {
      if (cartState.id === movie.id) {
        cartState.quantity++;
      }
      return cartState;
    });
    setCart(editedCar);
  };

  return {
    addMovieToCart,
    cart,
    decrementQuantity,
    incrementQuantity,
    getTotal,
  };
};

export default useCarrito;
