import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './components/home/Home'
import Quiz from './components/quiz/Quiz'
import './App.css'
import QuizResult from './components/quizresult/QuizResult'
import { QuizContextProvider } from './context/QuizContextProvider'

const App = () => {
  return (          
    <div>
      <QuizContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/quiz" element={<Quiz />}/>
            <Route path="/quiz-result" element={<QuizResult />}/>
          </Routes>
        </BrowserRouter>
      </QuizContextProvider>
    </div>
  )
}

export default App