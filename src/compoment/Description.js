import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Description() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setData(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        navigate(`/cart?id=${encodeURIComponent(id)}&title=${encodeURIComponent(data[id]?.title)}&description=${encodeURIComponent(data[id]?.description)}&price=${encodeURIComponent(data[id]?.price)}`);
    } else {
      navigate(`/login?id=${id}`);
    }
  };

  return (  
    <div>
      <h1>Product Details</h1>
      <h5> Title: {data[id]?.title}</h5>
      <h5> Description: {data[id]?.description}</h5>
      <h5> Brand: {data[id]?.brand}</h5>
      <h5> Price: {data[id]?.price}</h5>

      <Link to={'/'}> <button className='btn btn-secondary'>Go back to home page</button></Link>

      <button style={{ margin: "10px" }} onClick={handleAddToCart} className='btn btn-primary'>
        Add to Cart
      </button>
    </div>
  );
}

export default Description;
