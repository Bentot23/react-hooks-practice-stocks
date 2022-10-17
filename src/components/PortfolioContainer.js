import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, clickHandler }) {

  const renderPortfolio = portfolio.map(stock => (
    <Stock key={stock.id} stock={stock} clickHandler={clickHandler} />
  ))


  return (
    <div>
      <h2>My Portfolio</h2>
      { renderPortfolio }
    </div>
  );
}

export default PortfolioContainer;
