import React, { useState, useEffect, useRef } from "react";
import ItemContainer from "./components/ItemContainer";
import nft_data from "./components/nft_data.json";
import "./App.css";

function App() {
  const results = nft_data.results;
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedResults, setLoadedResults] = useState([]);
  const [loadCount, setLoadCount] = useState(20);
  const loadMoreRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the results based on the search term
  const filteredResults = results.filter((result) =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load more results when the user scrolls to the end of the page
  const loadMoreResults = () => {
    setLoadCount((prevCount) => prevCount + 20);
  };

  useEffect(() => {
    setLoadedResults(filteredResults.slice(0, loadCount));
  }, [filteredResults, loadCount]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMoreResults();
      }
    }, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="search_container">
        <input
          className="search_input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="items">
        {loadedResults.map((result) => (
          <ItemContainer key={result.mintAddress} result={result} />
        ))}
      </div>
      <div ref={loadMoreRef} className="loadMore"></div>
    </div>
  );
}

export default App;
