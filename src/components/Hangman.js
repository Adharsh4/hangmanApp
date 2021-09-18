import React from 'react'
import './Hangman.css';

const Hangman = ({ wrongCharacters }) => {
  const errorLength = wrongCharacters.length

  return (
    <div className="hangman-missed-letters-container">
      <svg height="250" width="200" className="human">
        <line x1="60" y1="20" x2="140" y2="20" />
        <line x1="140" y1="20" x2="140" y2="50" />
        <line x1="60" y1="20" x2="60" y2="230" />
        <line x1="20" y1="230" x2="100" y2="230" />
        {errorLength > 0 && <circle cx="140" cy="70" r="20" />}
        {errorLength > 1 && <line x1="140" y1="90" x2="140" y2="150" />}
        {errorLength > 2 && <line x1="140" y1="120" x2="120" y2="100" />}
        {errorLength > 3 && <line x1="140" y1="120" x2="160" y2="100" />}
        {errorLength > 4 && <line x1="140" y1="150" x2="120" y2="180" />}
        {errorLength > 5 && <line x1="140" y1="150" x2="160" y2="180" />}
      </svg>
      <div className="missed-letters">
        <div>
          {errorLength > 0 &&
            <p>Missed: <strong>{wrongCharacters
              .map((letter, i) => <span key={i}>{letter}</span>)
              .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}</strong></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Hangman
