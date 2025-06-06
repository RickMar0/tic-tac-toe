import { useState } from "react"

export default function Player({name="Player", symbol, onClick, ...props}){

  const [isEditing, setIsEditing] = useState(false)

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
  } 
  else {
    return (
      <li>
        <span className="player">
          <span id="" className="player-name">{name}</span>
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={()=>setIsEditing(true)}
        >Edit</button>
      </li>
    )
  }
}