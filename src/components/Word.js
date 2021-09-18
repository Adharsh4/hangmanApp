import React from 'react';
import './Word.css';

const Word = ({ selectedWord, correctCharacters }) => {

  return (
    <div className="word">
      {selectedWord.split('').map((letter, i) => 
          letter !== " " ?  (
            <span className="letter" key={i}>
              {correctCharacters.includes(letter) ? letter.toUpperCase() : ''}
            </span>
          ) : (<span className="letters" key={i}></span>)
      )}
    </div>
  )
}

export default Word
