import * as actionTypes from './actionTypes';

import axios from 'axios';

export const saveData = (wordsData) => {
    return{
        type: actionTypes.SAVEDATA ,
        data: wordsData
    }
}

export const setErrorMessage = (errorMessage) => {
    return{
        type: actionTypes.SET_ERROR_MESSAGE ,
        errorMessage: errorMessage
    }
}

export const setSelectedWord = () => {
    return{
        type: actionTypes.SET_SELECTED_WORD
    }
}

export const getWordsData = () => {
    return (dispatch) => {
        axios.get('https://api.datamuse.com/words?ml=fruit').then((response) => {
            dispatch(saveData(response.data.map(ele => ele.word)))
            dispatch(setSelectedWord())
        }).catch((error) => {
            dispatch(setErrorMessage(error))
        })
    }
}