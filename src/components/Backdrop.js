import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';
import './Backdrop.css';

const Backdrop = ({correctCharacters, wrongCharacters, selectedWord, setCanPlay, playAgain}) => {
  let successMessage = '';
  let showCorrectWord = '';
  let playable = true;

  if( checkWin(correctCharacters, wrongCharacters, selectedWord) === 'win' ) {
    successMessage = 'Congratulations! You won! 😃';
    playable = false;
  } else if( checkWin(correctCharacters, wrongCharacters, selectedWord) === 'lose' ) {
    successMessage = 'Oops, Please try again';
    showCorrectWord = `Correct word was: ${selectedWord.toUpperCase()}`;
    playable = false;
  }

  useEffect(() => {
    setCanPlay(playable);
  });

  return (
    <div className={`backdrop-div ${successMessage !== '' ? 'make-flex' : ''}`} >
      <div className="backdrop-opener">
        <h2>{successMessage}</h2>
        <h3>{showCorrectWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default Backdrop
