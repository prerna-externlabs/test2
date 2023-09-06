import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { Link } from 'react-router-dom';


const Home = () => {
  const FilterOptions = [
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredData = data.filter((item) =>{
  // if (selectedCategory === "All") {
  //   return true; 
  // }
  // return(
  //   item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //   item.category.toLowerCase() === selectedCategory.toLowerCase()
  // );
  const categoryFilter =
      selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const searchFilter =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryFilter && searchFilter;
});
  const records = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);


  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setData(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData()

  }, [])

  function goToPreviousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goToPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>

      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {FilterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {records.map((item, index) => (
        <div
          class="card"
          style={{ width: "18rem", display: "inline-block", margin: "10px" }}
          key={item.id}
        >
          <img src={item.images[0]} class="card-img-top" alt="images" />
          <div class="card-body">
            <h5>{item.title}</h5>
            <p class="card-text">{item.description}</p>
            <Link to={`/description/${index}`}>
              <button className='btn btn-primary'>Product Details</button>
            </Link>
          </div>
        </div>
      ))}

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={goToPreviousPage}>Previous</button>
          </li>
          {numbers.map((pageNumber) => (
            <li className={`page-item ${currentPage === pageNumber ? 'active' : ''}`} key={pageNumber}>
              <button className="page-link" onClick={() => goToPage(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={goToNextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Home