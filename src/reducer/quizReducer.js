import { actions } from "../constants/constants"

export const quizReducer = (state,action) => {
    switch(action.type) {
        case actions.ADD_TOTAL_QUESTIONS: {
            return {
                ...state,
                totalQuestions: action.total
            }
        }
        case actions.UPDATE_CORRECT_ANSWERS: {
            return {
                    ...state,
                    correctAnswers: action.count
                }
            }
        case actions.UPDATE_WRONG_ANSWERS: {
            return {
                ...state,
                wrongAnswers: action.count
                }
            }
        default: {
            return state
            }
        }
    }