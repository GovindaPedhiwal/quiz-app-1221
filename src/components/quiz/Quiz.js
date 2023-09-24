import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './Quiz.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import { QuizContext } from '../../context/QuizContextProvider';
import { Utility } from '../../helper/utility';
import Loader from '../loader/Loader';

const Quiz = () => {
 const [questions, setQuestions] = useState([])
 const [currQuestionIdx, setCurrQuestionIdx] = useState(0)
 const [answerSelected, setAnswerSelected] = useState([])
 const [percentage , setPercentage] = useState(0)
 const [isLoading, setIsLoading] = useState(false)
 const [currentQuestionTime, setCurrentQuestionTime] = useState(0)
 const navigate = useNavigate()
 const {results, updateCorrectAnswers, updateWrongAnswers, addTotalQuestions} = useContext(QuizContext)

  async function getQuestions() {
    setIsLoading(true)
    let response = await fetch('https://6510087f3ce5d181df5cdb30.mockapi.io/api/quiz')
    let resp = await response.json()
    if(resp?.length) {
      setQuestions(resp[0]?.questions)
      addTotalQuestions(resp[0]?.totalQuestions)
      setIsLoading(false)
    }
  }
  // when coming to this page loading all the questions
  useEffect(() => {
    getQuestions();
  },[])
  useEffect(() => {
      setCurrentQuestionTime(new Date().getTime())
      setPercentage((currQuestionIdx + 1) * (100 / questions?.length))
  },[questions,percentage])
  // this function is to compare the answer of current question
 const compareAnswer = () => {
     let correct_answers = questions[currQuestionIdx]?.correctAnswer;  
     let s1 = new Set(correct_answers)
     let s2 = new Set(answerSelected)
     const eqSet = (xs, ys) =>
            xs.size === ys.size &&
            [...xs].every((x) => ys.has(x));   
    if(eqSet(s1,s2)) {
        updateCorrectAnswers(results?.correctAnswers + 1)
    } else {
        updateWrongAnswers(results?.wrongAnswers + 1)
    }
 }
//  This is to update the progress bar when jump to next question
 const updateProgressBarPercentage = () => {
     let percentage = (currQuestionIdx + 2) * (100 / questions?.length)
     setPercentage(percentage)                                
 }
// This API will be called after selecting each question to pass the details how many time taken for it
 async function updateQuestionInfo(total_time_taken) {
  let data = {
    question_id: questions[currQuestionIdx]?.questionId,
    total_time_taken: total_time_taken
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  await fetch('https://6510087f3ce5d181df5cdb30.mockapi.io/api/question',requestOptions).then(res => res.json())
 }
//  when clicking on Next it will move the question from first to second and so on
 const onNext = () => {
    let total_time_taken = Utility.convertMsToTime(new Date().getTime() - currentQuestionTime);
    updateQuestionInfo(total_time_taken)
    compareAnswer()
    setAnswerSelected([])
    setCurrentQuestionTime(new Date().getTime())
    setCurrQuestionIdx(currQuestionIdx + 1);
    updateProgressBarPercentage();
    // once we reach to the last question then redirect to quiz result page
    if(currQuestionIdx === questions?.length-1) {
        navigate('/quiz-result')
    }
 }
 const onAnswerSelected = (choice) => {
    if(answerSelected?.includes(choice)) {
        const temp = answerSelected?.filter(answer => {
            return answer !== choice;
        })
        setAnswerSelected(temp)
    } else {
        setAnswerSelected([...answerSelected, choice])
    }
 }
  if(isLoading)
    return <Loader /> 
  return (
    <div className="quiz-wrapper">
        <div className="quiz-container">
            <div className="progress-bar">
                <CircularProgressbar strokeWidth={9} value={percentage} text={ `${currQuestionIdx + 1}/${questions?.length}`} />
            </div>
            <p className="question-header">{questions[currQuestionIdx]?.question}</p>
            <p className="question-image">
              <img src={questions[currQuestionIdx]?.imagePath} alt="" />
            </p>
            <ul className="questions-list">
                {
                    questions[currQuestionIdx]?.choices?.map((choice,idx) => {
                        return <li key={idx} onClick={() => onAnswerSelected(choice)} className={answerSelected?.includes(choice) ? 'question-item selected' : 'question-item'}>
                            {choice}
                            </li>
                    })
                }
            </ul>

            {
                <button onClick={() => onNext()} disabled={!answerSelected?.length} className={answerSelected?.length === 0 ? 'btn-cta disabled-cta' : 'btn-cta'}>
                    {currQuestionIdx !== questions?.length - 1 ? 'Next' : 'Show Results'}
                </button> 
            }
        </div>
    </div>
  )
}

export default Quiz