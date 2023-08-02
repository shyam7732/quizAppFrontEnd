import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import ErrorMessage from "../error/ErrorMessage";
import "./home.css"


function Home ({ name, setName }) {

  const [error, setError] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = () => {
    if ( !name) {
      setError(true);
      return;
    }
    else {
      setError(false);
      return navigate("/quiz")
    }
  }

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Fill Out The Details</span>
        <div className="settings_select">

          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}

          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          

         

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}>
            Start Quiz
          </Button>

        </div>
      </div>
      <img src="/undraw_online_test_re_kyfx.svg" className="banner" alt="quiz img"></img>



    </div>);
};
export default Home;