import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState("All");

  function fetchStocks() {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((stockData) => setStocks(stockData));
  }
  useEffect(fetchStocks, []);

  function buyStock(stock) {
    console.log("BUY");
    setPortfolio((prevState) => {
      const inPortfolio = prevState.includes(stock);
      if (inPortfolio) {
        return prevState;
      } else {
        return [...prevState, stock];
      }
    });
  }

  function sellStock(stock) {
    console.log("SELL");
    setPortfolio((prevState) =>
      prevState.filter((item) => item.id !== stock.id)
    );
  }

  function sortStocks(stocks) {
    if (sort === "Price") {
      return stocks.sort((a, b) => b.price - a.price);
    } else if (sort === "Alphabetically") {
      return stocks.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return stocks;
    }
  }

  function filterStocks(stocks) {
    if (filter === "All") {
      return stocks;
    } else {
      return stocks.filter((stock) => stock.type === filter);
    }
  }

  function sortAndFilterStocks() {
    let sorted = sortStocks(stocks);
    return filterStocks(sorted);
  }

  return (
    <div>
      <SearchBar setSort={setSort} setFilter={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={sortAndFilterStocks()}
            clickHandler={buyStock} 
          />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} clickHandler={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
