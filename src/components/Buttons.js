
import "./Buttons.css"
import React from 'react';

const Buttons = ({handleButtonClicked}) => {
    return(
        <div className="buttons-container" >
            {new Array(26).fill(1).map((ele, index) => {
                return <button key={index} className="styled-buttons" onClick={(e) => handleButtonClicked(e, String.fromCharCode(65+index))}>{String.fromCharCode(65+index)}</button>
            })}
        </div>
    )
}

export default Buttons