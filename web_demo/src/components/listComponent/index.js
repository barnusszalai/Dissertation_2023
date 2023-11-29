import React, { useState, useContext, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import '../../css/homescreen.css'
import { GlobalContext } from '../../GlobalContext';


function ListItem({ item, onRemove, onSelect, teamName }) {
  return (
    <li className="list-item" >
      {item}
      <button style={{marginLeft: 50, backgroundColor: 'red'}} className="remove-edit-button" onClick={onRemove}>
        <FaTrashAlt />
      </button>
      <button style={{backgroundColor: '#5bb450'}} className="remove-edit-button" onClick={onSelect}>
        <FaEdit />
      </button>
    </li>
  );
}

function ListItemComponent(props) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting] = useContext(GlobalContext);

  useEffect(() => {
    setItems([])
    if (props.title == "Participants" && (items.length != addedParticipants.length)) {
      addedParticipants.forEach((p, i) => [setItems(old => [...old, p.name]), console.warn("adding" + p.name)]);
    }
  }, [])
  

  function handleSubmit(e) {
    e.preventDefault();
    if (props.title==="Team Name") {
      if (items.length === 1) {
        return
      }
      setItems([...items, newItem]);
      //props.addParticipant(newItem)
      setNewItem('');
      return
    }
    if (props.title==="Meeting Requests") {
      return
    }
    setAddedParticipants(old => [...old, {name: newItem}])
    setSelectedParticipant(newItem)
    setSelectedMeeting('')
    setItems([...items, newItem]);
    //props.addParticipant(newItem)
    setNewItem('');
    console.warn(addedParticipants)
  }
  

  function handleRemove(index, item) {
    if (selectedParticipant == item) {
      setSelectedParticipant('');
    }
    setItems(items.filter((_, i) => i !== index));
  }


  return (
    <div className="list-container">
        <text style={{fontWeight: 'bold'}}>{props.title}</text>
        {!(props.title=="Team Name" && items.length==1) &&
        
        <form style={{marginTop: 10}} className="form" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Add an item"
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            />
            <button type="submit" style={{opacity: 0.8, backgroundColor: '#800020'}} className="add-button">
                <FaPlus />
            </button>
        </form>
        }
      <ul className="list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onRemove={() => handleRemove(index, item)}
            onSelect= {
              () => {
                if (props.title==="Team Name") {
                  console.log("")
                } else {
                  setSelectedParticipant(item);
                  setSelectedMeeting('');
                }
              }
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default ListItemComponent;
