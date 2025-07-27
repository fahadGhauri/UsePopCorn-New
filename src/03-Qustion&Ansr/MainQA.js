import React, { useState } from "react";
import "./style.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

const MainQA = () => {
  return (
    <div>
      <Items data={faqs} />
    </div>
  );
};

function Items({ data }) {
  const [curopen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((e, i) => (
        <Mainitem
          num={i}
          curopen={curopen}
          onOpen={setCurOpen}
          title={e.title}
          key={e.title}
        >
          {e.text}
        </Mainitem>
      ))}
      <Mainitem
        num={22}
        curopen={curopen}
        onOpen={setCurOpen}
        title="Test "
        key="test 1"
      >
        <p>Aloows React Funvtion</p>
        <ul>
          <li>React- Hooks</li>
          <li>React- State</li>
          <li>React- Props</li>
        </ul>
      </Mainitem>
    </div>
  );
}

function Mainitem({ num, title, curopen, onOpen, children }) {
  const isopen = num === curopen;

  function Abc() {
    onOpen(isopen ? null : num);
    // setIsopen((isopen) => !isopen);
  }
  return (
    <div className={`item ${isopen ? "open" : ""}`} onClick={Abc}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isopen ? "-" : "+"}</p>
      {isopen && <p className="content-box">{children}</p>}
    </div>
  );
}

export default MainQA;
