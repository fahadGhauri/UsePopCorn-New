import React, { useState } from "react";

export default function Statproject() {
  return (
    // <div>
    //   <button></button>
    //   <h1>Step :</h1>
    //   <button></button>

    //   <button></button>
    //   <h1>Step :</h1>
    //   <button></button>
    // </div>
    <Count />
  );
}

function Count() {
  const [cont, setCont] = useState(0);
  const [sa, setSa] = useState(1);

  function plus() {
    setCont(cont + 1);
  }
  //   function mins() {
  //     setCont(cont - 1);
  //   }

  const date = new Date();
  date.setDate(date.getDate() + cont);

  return (
    <div>
      <div>
        <button onClick={() => setSa(sa + 1)}>Plus </button>
        <span>Count : {sa}</span>
        <button onClick={() => setSa(sa - 1)}>Mins </button>
      </div>
      <div>
        <button onClick={plus}>Plus </button>
        <span>Date : {cont}</span>
        <button onClick={() => setCont(cont - 1)}>Mins </button>
      </div>

      <p>
        <span>
          {cont === 0
            ? "Today is "
            : cont > 0
            ? `${cont}  days ago was  `
            : `${Math.abs(cont)}  day from today is  `}
        </span>
        {date.toDateString()}
      </p>
    </div>
  );
}
