import React, { useEffect, useState } from "react";
import "./Converter.css";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

const Converter = () => {
  const [amout, setAmount] = useState(1);
  const [fromCut, setFromCut] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converter, setConverter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amout}&from=${fromCut}&to=${toCur}`
        );
        const data = await res.json();
        setConverter(data.rates[toCur]);
      }

      if (fromCut === toCur) return setConverter(amout);
      convert();
    },
    [amout, fromCut, toCur]
  );

  return (
    <div>
      <input
        type="text"
        value={amout}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCut}
        onChange={(e) => setFromCut(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT : {converter}</p>
    </div>
  );
};

export default Converter;
