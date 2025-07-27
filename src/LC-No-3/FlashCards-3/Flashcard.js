import React, { useState } from "react";
import "./Flash.css";
const Data = [
  {
    id: 1,
    question: "what language is react based on",
    answer: "JavaScript",
  },
  {
    id: 2,
    question: "what based on",
    answer: "JavaScript--2",
  },
  {
    id: 3,
    question: "what based",
    answer: "JavaScript---3",
  },
  {
    id: 4,
    question: "what react based on",
    answer: "JavaScript--4",
  },
  {
    id: 5,
    question: "what language is react based on",
    answer: "JavaScript--5",
  },
  {
    id: 6,
    question: "what language react",
    answer: "JavaScript--6",
  },
];
export default function Flashcard() {
  const [values, setValues] = useState(null);

  function click(id) {
    setValues(id !== values ? id : null);
  }
  return (
    <div className=" flashcards">
      {Data.map((question) => (
        <div
          key={question.id}
          onClick={() => click(question.id)}
          className={question.id === values ? "selected" : ""}
        >
          <p>{question.id === values ? question.answer : question.question}</p>
        </div>
      ))}
    </div>
  );
}
