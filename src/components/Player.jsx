import { useState } from "react";

export default function player({ name, symbol, isActive, onChangeName }) {
  // STATES
  const [playerValue, setPlayerValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  // HANDLER FUNCTIONS
  const handleChange = function (e) {
    setPlayerValue(e.target.value);
  };

  const handleClick = function () {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerValue);
    }
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerValue}</span>
        ) : (
          <input
            type="text"
            required
            value={playerValue}
            onChange={handleChange}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
