import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import GroceryItemComponent from "./GroceryItemComponent";

const GroceryComponent = () => {
  const [item, setItem] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [errors, setErrors] = useState("");
  const inputRef = useRef();

  const handleAddItem = () => {
    if(item){
      setGroceryItems([...groceryItems, {id: uuid(), name: item} ]);
      setItem("");
      setErrors("");
    }else{
      setErrors("Grocery item cannot be empty.");
      inputRef.current.focus();
    }
  };

  const handleEditItem = (id, newItem) => {
    const updatedGroceryItems = groceryItems.map((item) => {
      if(item.id === id){
        return { ...item, name: newItem };
      }
      return item;
    });
    setGroceryItems(updatedGroceryItems);
  };

  const handleDeleteItem = (removeId) => {
    const filteredItems = groceryItems.filter((item) => item.id !== removeId);
    setGroceryItems(filteredItems);
  };

  const handleClearItems = () => {
    setGroceryItems([]);
  };

  return (
    <div className="grocery-buddy">
      <h1>Grocery Buddy!</h1>
      <div className='input-section'>
        <div className='input-container'>
          <input type="text" placeholder="Enter an item..." value={item} onChange={(event) => setItem(event.target.value)} ref={inputRef} />
          <button className="btn-add" onClick={handleAddItem}>Add Item</button>
        </div>
        <div>{errors ? <p className="errors">{errors}</p> : null}</div>
      </div>
      <ul className="grocery-list">
        {groceryItems.map((item) => (<GroceryItemComponent key={item.id} item={item} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} />))}
      </ul>
      {groceryItems.length > 0 ? ( <button className="btn-clear" onClick={handleClearItems}>Clear Grocery Items</button>) : null}
    </div>
  )
}

export default GroceryComponent