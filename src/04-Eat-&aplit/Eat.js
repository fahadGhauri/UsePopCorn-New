import React, { useState } from "react";
import "./Eat.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const Eat = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showfrnd, setShowfrnd] = useState(false);
  const [select, setSelect] = useState(null);

  function handelAdd() {
    setShowfrnd((s) => !s);
  }

  function handelAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowfrnd(false);
  }

  function handelSelect(friend) {
    // setSelect(friend);
    setSelect((cur) => (cur?.id === friend.id ? null : friend));
    setShowfrnd(false);
  }

  function habdelsplit(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === select.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setFriends(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friend friends={friends} select={select} onselected={handelSelect} />
        {showfrnd && <FormFriend onAddFriend={handelAddFriend} />}
        <Button onClick={handelAdd}>{showfrnd ? "Close" : "Add Friend"}</Button>
      </div>
      {select && (
        <FormsSplitBill
          onselect={select}
          habdelsplit={habdelsplit}
          key={select.id}
        />
      )}
    </div>
  );
};

function Friend({ friends, onselected, select }) {
  return (
    <ul>
      {friends.map((e) => (
        <Frend e={e} key={e.id} select={select} onselected={onselected} />
      ))}
    </ul>
  );
}

function Frend({ e, onselected, select }) {
  const isSelect = select?.id === e.id;
  return (
    <li className={isSelect ? "selected" : ""}>
      <img src={e.image} alt={e.name} />
      <h3>{e.name}</h3>
      {e.balance < 0 && (
        <p className="red">
          You own {e.name} {Math.abs(e.balance)}$
        </p>
      )}
      {e.balance > 0 && (
        <p className="green">
          {e.name} owns you {Math.abs(e.balance)}$
        </p>
      )}
      {e.balance === 0 && <p>You and {e.name} are even</p>}

      <Button onClick={() => onselected(e)}>
        {isSelect ? "Close" : "select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handelSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID;
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handelSubmit}>
      <label>❤️Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🎇 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormsSplitBill({ onselect, habdelsplit }) {
  const [bill, SetBill] = useState("");
  const [paidbill, SetPaidbill] = useState("");
  const paidby = bill ? bill - paidbill : "";
  const [whopay, SetWhopay] = useState("user");

  function handsubmit(e) {
    e.preventDefault();

    if (!bill || !paidbill) return;
    habdelsplit(whopay === "user" ? paidbill : -bill);
  }

  return (
    <form className="form-split-bill" onSubmit={handsubmit}>
      <h2>Split a bill with {onselect.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => SetBill(Number(e.target.value))}
      />

      <label>👟 Your expanse</label>
      <input
        type="text"
        value={paidbill}
        onChange={(e) =>
          SetPaidbill(
            Number(e.target.value) > bill ? paidby : Number(e.target.value)
          )
        }
      />

      <label>🍟 {onselect.name} Bill Value</label>
      <input type="text" disabled value={paidby} />

      <label> Who is Paying Bill</label>
      <select value={whopay} onChange={(e) => SetWhopay(e.target.value)}>
        <option value="user">You</option>
        <option value="Friend">{onselect.name}</option>
      </select>
      <Button>Spilit Bill</Button>
    </form>
  );
}

export default Eat;
