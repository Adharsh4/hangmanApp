import * as actionTypes from './actionTypes';

const initialState = {
    wordsArray: [],
    errorMessage: "",
    selectedWord: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SAVEDATA:
            return{
                ...state,
                wordsArray: action.data
            };
        case actionTypes.SET_ERROR_MESSAGE:
            return{
                ...state,
                errorMessage: action.errorMessage
            };
        case actionTypes.SET_SELECTED_WORD:
            return{
                ...state,
                selectedWord: state.wordsArray[Math.floor(Math.random() * state.wordsArray.length)].toLowerCase()
                // selectedWord: "sour cheRRY".toLowerCase()
                
            };
        default:
            return state;    
    }
}

export default reducer;