import React, { useState } from "react";
import "./step.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function Step() {
  const [step, setStep] = useState(1);
  const [isopen, setIsopen] = useState(true);

  function handelPervious() {
    if (step > 1) {
      setStep(step - 1);
    }
  }
  function handelNext() {
    if (step < 3) {
      setStep(step + 1);
    }
  }
  function close() {
    setIsopen(!isopen);
  }
  return (
    <div>
      <button className="close" onClick={close}>
        &times;
      </button>
      {isopen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : "deactive"}>1</div>
            <div className={step >= 2 ? "active" : "deactive"}>2</div>
            <div className={step >= 3 ? "active" : "deactive"}>3</div>
          </div>

          <Stepmessage step={step}>{messages[step - 1]}</Stepmessage>

          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#ffffff"
              onClick={handelPervious}
            >
              <span>👈</span>Pervios
            </Button>
            <Button bgColor="#7950f2" textColor="#ffffff" onClick={handelNext}>
              <span>👉</span>Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stepmessage({ step, children }) {
  return (
    <div className="message">
      <h3> Step{step}</h3>
      {children}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
