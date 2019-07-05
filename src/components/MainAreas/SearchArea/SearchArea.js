import React from "react";

import "./SearchArea.css";

const SearchArea = props => {
  let users = "No users found!";
  return (
    <div className="SearchArea">
      <div className="Searchbar__Container">
        <input type="text" placeholder="Search for users" />
      </div>
      <div className="SearchArea__User__Container">
        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>

        <div className="Usercard">
          <div className="Usercard__Left">
            <div className="Usercard__Left__Avatar" style={{
              backgroundImage: `url(http://localhost:8080/images/e07c3187-00e0-44bd-8e47-8b2775209248)`
            }}></div>
          </div>
          <div className="Usercard__Right"><p>Kristina Mckellar</p></div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
