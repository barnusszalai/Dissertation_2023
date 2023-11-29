import React, { useState, useContext, useEffect} from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import '../../css/homescreen.css'
import { GlobalContext } from '../../GlobalContext';


function ListItem({ item, onRemove, onSelect }) {
  return (
    <li className="list-item">
      {item}
      <button style={{marginLeft: 50, backgroundColor: 'red'}} className="remove-edit-button" onClick={onRemove}>
        <FaTrashAlt />
      </button>
      <button onClick={onSelect} style={{backgroundColor: '#5bb450'}} className="remove-edit-button">
        <FaEdit />
      </button>
    </li>
  );
}

function ListMeetingComponent(props) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting, addedMeetings, setAddedMeetings] = useContext(GlobalContext);

  useEffect(() => {
    setItems([])
    if (props.title == "Meeting Requests" && (items.length != addedMeetings.length)) {
      addedMeetings.forEach((p, i) => [setItems(old => [...old, p.name]), console.warn("adding" + p.name)]);
    }
    console.log(addedParticipants.length)
    console.log(items.length)
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    setAddedMeetings(old => [...old, {name: newItem, day_interval : null, duration: 30}])
    setSelectedMeeting(newItem)
    setSelectedParticipant('')
    setItems([...items, newItem]);
    //props.addParticipant(newItem)
    setNewItem('');
    console.warn(addedParticipants)
  }

  useEffect(() => {
    console.warn(selectedMeeting)
  }, [selectedMeeting])
  
  

  function handleRemove(index, item) {
    setItems(items.filter((_, i) => i !== index));
  }


  return (
    <div className="list-container">
        <text style={{fontWeight: 'bold'}}>{props.title}</text>
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
      <ul className="list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onRemove={() => handleRemove(index, item)}
            onSelect={() => {
              setSelectedMeeting(item);
              setSelectedParticipant('');
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListMeetingComponent;