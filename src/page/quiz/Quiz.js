import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import ErrorMessage from '../error/ErrorMessage';
import "./quiz.css"

function Quiz({ questions, name, score, setScore }) {

  const [currQuesNum, setCurrQuesNum] = useState(0)
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const correct = questions[currQuesNum].answer

  function handleSelect(i) {
    if (selected === i && selected === correct) {
      return "select";
    }
    else if (selected === i && selected !== correct) {
      return "wrong";
    }
    else if (i === correct) {
      return "select";
    }
  }

  function handleCheck(i) {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  }
  const navigate = useNavigate()

  function handleNext() {
    if (currQuesNum >= 4) {
      navigate("/result");
    }
    else if (selected) {
      setCurrQuesNum(currQuesNum + 1);
      setSelected();
    }
    else {
      setError("Please select an option");
    }
  }

  function handleQuit() {

  }


  return (
    <>
      <div className='quiz'>

        <span className="subtitle">Welcome to the Quiz {name}</span>
        <div className="quizInfo">
          <span>Score : {score}</span>
        </div>
        {
          questions.length > 0
            ? <>
              <div className='question'>
                <h1>Question {currQuesNum + 1}</h1>
                <div className='singleQuestion'>
                  <h3>{questions[currQuesNum].question}</h3>
                </div>

                <div className='options'>

                  {error && <ErrorMessage>{error}</ErrorMessage>}

                  {
                    questions[currQuesNum].options.map((option, index) => {
                      return (
                        <button key={index}
                          onClick={() => handleCheck(option)}
                          disabled={selected}
                          className={`singleOption ${selected && handleSelect(option)}`}>
                          {option}
                        </button>
                      )
                    })
                  }
                </div>

                <div className='control'>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ width: 185 }}
                    href="/"
                    onClick={handleQuit}
                  >Quit</Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ width: 185 }}
                    onClick={handleNext}
                  >Next Question</Button>
                </div>
              </div>

            </>

            : (
              <CircularProgress
                style={{ margin: 100 }}
                color="inherit"
                size={150}
                thickness={1}
              />
            )
        }


      </div>

    </>
  )
}

export default Quiz