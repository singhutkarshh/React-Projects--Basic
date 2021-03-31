import React, { useState, useEffect } from "react";
import "./homepage.css";
const url = `https://course-api.com/react-tours-project`;
const Homepage = () => {
  return (
    <>
      <Navigationbar />
      <section className="row">
        <div className="col-2"></div>
        <div className="itemBox col">
          <MainBody />
        </div>
        <div className="col-2"></div>
      </section>
    </>
  );
};

const Navigationbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://facebook.com">
            Tour Guide
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="https://facebook.com"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const MainBody = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetching = async () => {
    const res = await fetch(url);
    const user = await res.json();
    setItems(user);
    console.log(user.status);
    setLoading(false);
  };

  useEffect(() => {
    fetching();
  }, []);

  const handleClick = (aid) => {
    const newItems = [];
    items.forEach((ele) => {
      if (ele.id !== aid) {
        newItems.push(ele);
      }
    });
    setItems(newItems);
  };
  if (loading === false) {
    return (
      <>
        <div className="boxes">
          <h1 className="heading">Our Tours</h1>

          {items.map((item) => {
            const { id, name, info, image, price } = item;
            return (
              <>
                <div className="itemContent container" key={id}>
                  <img src={image} alt="image"></img>
                  <h4>{name}</h4>
                  <p>{info}</p>
                  <h3>Price: ${price}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      handleClick(id);
                    }}
                  >
                    Not Interested
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
  if (loading === true) {
    return (
      <section className="loading">
        <h1>Hold on Loading...</h1>
      </section>
    );
  }
};
export default Homepage;
