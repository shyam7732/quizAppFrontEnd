import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Header from './page/header/Header';
import Home from './page/home/Home';
import Quiz from './page/quiz/Quiz';
import Result from './page/result/Result';
import Footer from './page/footer/Footer';
import "./App.css"


function App() {
  const [questions, setQuestions] = useState([])
  const [name, setName] = useState("")
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/quiz")
      .then((response) => {
        if (response.status === 200) {
          setQuestions(response.data)
        }
      })
  }, [])




  return (
    <>
      <BrowserRouter>
        <div className="app" style={{ backgroundImage: "url(./ques1.png)" }}>
          <Header />
          <Routes>
            <Route path='/' element={
              <Home
                name={name}
                setName={setName}
              />} />
            <Route path='/quiz' element={
              <Quiz
                questions={questions}
                name={name}
                score={score}
                setScore={setScore}
              />} />

            <Route path='/result' element={
              <Result
                name={name}
                score={score} />
            }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
