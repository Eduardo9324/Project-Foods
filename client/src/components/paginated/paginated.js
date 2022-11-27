import "./paginated.css";
import React from "react";

const Paginated = ({ recipesForPages, recipes, pages }) => {
  const pagesNumber = [];

  for (let i = 0; i < Math.ceil(recipes / recipesForPages); i++) {
    pagesNumber.push(i + 1);
  }

  return (
    <React.Fragment>
      <nav className="paginated">
        <ul>
          {pagesNumber && pagesNumber.map((e) => (
            <li className="li" key={e}>
              <a className="a" onClick={() => pages(e)}>{e}</a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  )
};

export default Paginated;