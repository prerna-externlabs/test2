import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../compoment/style.css"

const getCartFromStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

function Cart() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const price = searchParams.get('price');

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartFromStorage = getCartFromStorage();
    if (cartFromStorage) {
      setCart(cartFromStorage);
    }
  }, []);

 
  const handleAddItem = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const calculateTotal = () => {
    const totalPrice = price ? parseFloat(price) * quantity : 0;
    return totalPrice.toFixed(2);
  };

  const handleDelete = () => {
    const updatedCart = cart.filter(item => item.id !== id);
    saveCartToStorage(updatedCart);
    setCart(updatedCart);
  };


  return (
    <div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: {price}</p>
          <p>Total: {calculateTotal()}</p>
          <button className="plus-button" onClick={handleAddItem}>+</button>
          <button className="minus-button" onClick={handleRemoveItem}>-</button>
          <br />
          <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
          <br />
        </div>
    </div>

   

  );
}

export default Cart;
