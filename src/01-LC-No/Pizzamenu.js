import React from "react";
import ReactDOM from "react-dom/client";
import "./pizzas/index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "./pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "./pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "./pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "./pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "./pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "./pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const Pizzamenu = () => {
  function Header() {
    // const style = { color: "Red", fontSize: "48PX", textTransform: "uppercase" };
    return (
      <header className="header">
        <h1>Pizza Resturent CO</h1>
      </header>
    );
  }
  function Menu() {
    const Pizzadaat = pizzaData;
    return (
      <>
        <div className="menu">
          <h2>Our Menu</h2>
          <ul className="pizzas">
            {/* faster way to give props */}
            {Pizzadaat && (
              <ul>
                {pizzaData.map((pizza) => (
                  <Pizza pizzaObject={pizza} key={pizza.name} />
                ))}
              </ul>
            )}

            {/* {pizzaData.map((pizza) => (
                  <Pizza
                    name={pizza.name}
                    img={pizza.photoName}
                    ingredients={pizza.ingredients}
                    price={pizza.price}
                  />
                ))} */}
          </ul>
          {/* <Pizza
                name="Pizza Salamino"
                img="./pizzas/focaccia.jpg"
                ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
                price={90}
              />
              <Pizza
                name="Pizza Salamino"
                img="./pizzas/prosciutto.jpg"
                ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
                price={10}
              />
              <Pizza
                name="Pizza Salamino"
                img="./pizzas/funghi.jpg"
                ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
                price={100}
              /> */}
        </div>
      </>
    );
  }

  function Pizza(props) {
    return (
      <li className={`pizza ${props.pizzaObject.soldOut ? "sold-out" : ""}`}>
        <img src={props.pizzaObject.photoName} />
        <div></div>
        <h3>{props.pizzaObject.name}</h3>
        <p>{props.pizzaObject.ingredients}</p>
        <h2>
          {props.pizzaObject.soldOut ? "SOLD OUT" : props.pizzaObject.price}
        </h2>
      </li>
    );
  }

  function Footer() {
    const hour = new Date().getHours();

    const storeOpen = 5;
    const storeclose = 10;

    const storetime = hour >= storeOpen && hour <= storeclose;

    return (
      <footer className="footer">
        {/* {new Date().toLocaleDateString()} */}
        {storeOpen ? <Asd /> : <p>We WELCOME you in BTN {storeOpen}</p>}
        {/* {storetime ? alert("Strore is Open") : alert("Strore is Close")} */}
      </footer>
    );
  }
  function Asd() {
    const storeOpen = 5;
    const storeclose = 10;
    return (
      <div className="order">
        <br></br>
        <br></br>
        <p>We are Currently {storeclose}:00. order Online</p>
        <button className="btn">Order Now</button>
      </div>
    );
  }

  function Card() {
    return (
      <div className="add">
        <img className="aimgs" src="pizzas/funghi.jpg"></img>
        <h1 className="abc">Fahad Ghauri</h1>
        <h3 className="abd">
          Full stack web developer and youtuber.Full stack web developer and
          youtuber.Full stack web developer and youtuber.
        </h3>
      </div>
    );
  }
  function skillList() {
    return (
      <duiv className="skill-list">
        <Skill skill="HTML_CODE" emoji="" color="red" />
      </duiv>
    );
  }
  function Skill(props) {
    return (
      <div className="skill">
        <span>{props.skill}</span>
        <span>{props.color}</span>
      </div>
    );
  }

  function Apps() {
    return (
      <>
        <Header />
        <Menu />
        <Footer />
        {/* <Card /> */}
      </>
    );
  }

  return <Apps />;
};

export default Pizzamenu;
