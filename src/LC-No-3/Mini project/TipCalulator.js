import React, { useState } from "react";

const TipCalulator = () => {
  const [bill, setBill] = useState("");
  const [perentage1, setPercentage1] = useState(0);
  const [perentage2, setPercentage2] = useState(0);

  const tip = bill * ((perentage1 + perentage2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <BillInput bill={bill} setBill={setBill} />
      <SelectPercentage perentage={perentage1} onselect={setPercentage1}>
        How did you Like the services?
      </SelectPercentage>
      <SelectPercentage perentage={perentage2} onselect={setPercentage2}>
        How did your Like the Friend?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset handleReset={handleReset} />
        </>
      )}
    </div>
  );
};
function BillInput({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill Value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, perentage, onselect }) {
  return (
    <div>
      <p>{children}</p>
      <select
        value={perentage}
        onChange={(e) => onselect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was Okay (5%)</option>
        <option value="10">It was Good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}
function Output({ bill, tip }) {
  return (
    <h3>
      You pay {bill + tip} ({bill}$ + ${tip} tip)
    </h3>
  );
}
function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>;
}

export default TipCalulator;
