import React, { useState, useEffect, useCallback, useRef } from 'react';
import Word from './components/Word';
import Backdrop from './components/Backdrop';
import './App.css';
import Hangman from './components/Hangman';
import Buttons from './components/Buttons';

import {connect} from 'react-redux';
import * as actions from './store/actions';

const App = (props) => {

  const [correctCharacters, setCorrectCharacters] = useState([]);
  const [wrongCharacters, setWrongLetters] = useState([]);
  const [canPlay, setCanPlay] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const timeOutId = useRef(null)

  
  const handleKeydown = useCallback((event, letterClicked) => {
    const key = event.key;
    const keyCode = event.which || event.keycode  // for mozilla and other browsers
    if (canPlay && ((keyCode >= 65 && keyCode <= 90) || letterClicked)) { 
      let letter;
      if(letterClicked){
        letter = letterClicked.toLowerCase();
      }  else{
        letter = key.toLowerCase();
      }
      
      if (props.selectedWord.includes(letter)) {
        if (!correctCharacters.includes(letter)) {
          setCorrectCharacters(present => [...present, letter]);  // array which has correct characters entered
        } else {
          notifcationHandler();   // To show notification if key is already present
        }
      } else {
        if (!wrongCharacters.includes(letter)) {
          setWrongLetters(present => [...present, letter]);  // array which has wrong characters entered
        } else {
          notifcationHandler();  // To show notification if key is already present
        }
      }
    }
  })
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);   // Clean up function which can run clean up the previous effect and run the new Effect
  }, [handleKeydown]);

  useEffect(() => {
    props.getWordsData();
  }, [])



  const notifcationHandler = useCallback(() => {
    setShowNotification(true);
    timeOutId.current = setTimeout(() => {
      setShowNotification(false);
      clearTimeout(timeOutId.current)
    }, 1000);
  })

  // correctCharacters, wrongCharacters, canPlay

  const playAgain = () => {   // ReInitialize all values to default
    setCanPlay(true);
    setCorrectCharacters([]);
    setWrongLetters([]);
    props.setSelectedWord()
  }

  const handleButtonClicked = (e, letter) => {
    e.preventDefault();
    handleKeydown(e, letter)
  }

  return (
    <>
      <h1>Hangman - Find the hidden word</h1>
      <h2>Type/Click a letter to start</h2>
      <hr className="seperator"/>
      <div className="hangman-container">
        <Hangman wrongCharacters={wrongCharacters} />   {/*  for body part and missded characters  */}
        <Word {...{   
          selectedWord: props.selectedWord,
          correctCharacters
        }} />     {/*  To show Letters pressed  */}
        
      </div>
      <hr  className="seperator"/>
      <Buttons handleButtonClicked={handleButtonClicked}/>
      <Backdrop {...{
        correctCharacters, 
        wrongCharacters, 
        selectedWord: props.selectedWord, 
        setCanPlay, 
        playAgain}} />
      <div className={`notification ${showNotification ? 'show' : ''}`}>
        <p>You have already entered this letter</p>
      </div>
    </>
  );
}


const mapStateToProps = (state) => {
  return{
    wordsArray: state.wordsArray,
    selectedWord: state.selectedWord,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getWordsData: () => dispatch(actions.getWordsData()),
    setSelectedWord: () => dispatch(actions.setSelectedWord())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
