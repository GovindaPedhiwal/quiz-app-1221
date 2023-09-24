import React from 'react'
import { useNavigate } from 'react-router'
import './Home.css'

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home-wrapper">
            <div className="home-header">
                <p>Quiz App</p>
            </div>
            <div className="home-container">
                <div className="description">
                    <h1 className="quiz-box">Quiz</h1>
                    <div className="start-cta">
                        <button onClick={() => navigate('quiz')} className="btn-cta">Start</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
