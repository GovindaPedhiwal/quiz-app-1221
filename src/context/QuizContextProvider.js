import React, { useReducer } from 'react'
import { actions } from '../constants/constants';
import { quizReducer } from '../reducer/quizReducer';

export const QuizContext = React.createContext();

export const Provider = QuizContext.Provider;
export const Consumer = QuizContext.Consumer;
const initialState = {
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0
}
export const QuizContextProvider = (props) => {
    const [results, dispatch] = useReducer(quizReducer,initialState)

    const value = {
        results: results,
        addTotalQuestions: (total) => {
            dispatch({type: actions.ADD_TOTAL_QUESTIONS, total})
        },
        updateCorrectAnswers: (count) => {
            dispatch({type: actions.UPDATE_CORRECT_ANSWERS, count})
        },
        updateWrongAnswers: (count) => {
            dispatch({type: actions.UPDATE_WRONG_ANSWERS, count})
        }
    }

    return <QuizContext.Provider value={value}>
        {props.children}
    </QuizContext.Provider>
}