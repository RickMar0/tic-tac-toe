// before doing anything, i wanna explain what's going on with comments.
// there will be a lot of commented code in this file.
// i will start with A1 wich will represent the first instance (A) of my code (1)
// and then there will be the teacher's version (2) of the same code (A) 
// effectively becoming A2, 
// again (insert-letter-here) is the instance, (insert-number-here) is who did it.
// 1 is for me, 2 is for the teacher.
// also, there will be explanations of what the code does as well as
// why i did it that way, so let's get started

import { useState } from "react"

export default function Player({initialName, symbol, onClick, ...props}){

  const [playerName, setPlayerName] = useState(initialName);

  const [isEditing, setIsEditing] = useState(false)

  // (A1) showing input field instead of span when clicking edit button
  {/* 
    if (isEditing) {
      return(
        <li>
          <span className="player">
            <input type="text" placeholder={name} />
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={()=>
          {setIsEditing(false)}}
          >Save</button>
        </li>
      )
    } else { 
       return (
        <li>
          <span className="player">
          <input type="text" placeholder={name} />
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={()=>
            {setIsEditing(false)}}
          >
            Save
          </button>
       </li>
      )
    }
*/}
// so basically i'm re-rendering the entire component when the state changes,
// which is not the best practice, but it's what i came up with.
// in my defense i didn't know you could save html elements in variables like that ⬇⬇

// (A2) showing input field instead of span when clicking edit button
  function handleEditClick() {
    setIsEditing((editing)=>!editing);
  };

  function handleChange(event) {
    setPlayerName(event.target.value);
  };

  let editablePlayerName = <span className="player-name">{playerName}</span>
  let buttonElement = <button onClick={handleEditClick}>Edit</button>

  if (isEditing) {
    editablePlayerName = //⤵
    <input type="text" placeholder={initialName} required onChange={handleChange}/>;

    buttonElement = 
    <button onClick={() => setIsEditing(false)}>Save</button>;
  }

  return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {buttonElement}
    </li>
  )
}