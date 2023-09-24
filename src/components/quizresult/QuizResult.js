import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { QuizContext } from '../../context/QuizContextProvider'
import './QuizResult.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import { ApiConfig } from '../../config/api-config'
const QuizResult = () => {
    const {results, updateCorrectAnswers, updateWrongAnswers, addTotalQuestions} = useContext(QuizContext)
    const [percentage, setPercentage] = useState(0)
    const navigate = useNavigate()
    const redirectToHome = () => {
        // performing cleanup actitivies here
        updateCorrectAnswers(0);
        updateWrongAnswers(0);
        addTotalQuestions(0);
        navigate('/');
    }
    function findTotalPercentage() {
        let totalQuestions = results?.totalQuestions;
        let perQuestion = 100 / totalQuestions;
        let totalPercentage = (perQuestion * results?.correctAnswers).toFixed(2)
        if(isNaN(totalPercentage))
            totalPercentage = 0;
        setPercentage(totalPercentage)
    }
    // calling an API with passing all the required details
    async function submitResult() {
        let data = {
            total_questions: results?.totalQuestions,
            correct_answers: results?.correctAnswers,
            wrong_answers: results?.wrongAnswers
          }
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          };
          try {
              await fetch('https://65102ab43ce5d181df5cfac7.mockapi.io/api' + ApiConfig.SUBMIT_QUIZ_RESULTS,requestOptions).then(res => res.json())
          } catch(error) {
              console.log(error);
          }
        
    }
    useEffect(() => {
        findTotalPercentage();
        submitResult();
    },[])
    return (
        <div className="result-wrapper">
            <div className="result-container">
                <h1 className="result-header">Your Result</h1>
                <div className="progress-bar">
                    <CircularProgressbar strokeWidth={9} value={percentage} text={ `${percentage}%`} />
                </div>
           
                <p className="result-info"><b>Total Questions:</b> {results?.totalQuestions}</p>
                <p className="result-info correct">{results?.correctAnswers} Correct</p>
                <p className="result-info wrong">{results?.wrongAnswers} Wrong</p>
                
                <button className="btn-cta" onClick={() => redirectToHome()}>Start Again</button>
            </div>
        </div>
    )
}

export default QuizResult