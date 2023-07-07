import React, { useState } from 'react'

const GroceryItemComponent = ({ item, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState(item.name);
  const [errors, setErrors] = useState("");

  const onEdit = () => {
    if(newItem){
      handleEditItem(item.id, newItem);
      setIsEditing(false);
      setErrors("");
    }else{
      setErrors("Grocery item must not be empty."); 
    }

  };

  return (
    <>
        <li>
          {isEditing ? (
            <input type="text" value={newItem} onChange={(event) => setNewItem(event.target.value)} />
          ) : (
            <span>{item.name}</span>
          )}
            
            <div>
                <button className="btn-edit" onClick={() => {
                  isEditing ? onEdit() : setIsEditing(true);
                }}>{isEditing ? "Save" : "Edit"}</button>

                <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </div>
        </li>
        {errors ? <p className="errors">{errors}</p> : null}
    </>
  )
}

export default GroceryItemComponent