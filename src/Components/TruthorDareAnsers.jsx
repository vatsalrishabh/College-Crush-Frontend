import React, { useEffect, useState } from "react";
import { useAuth } from "../context/loginContext";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IndiDareAnsers from "./IndiDareAnsers";
import AnsIt from "./AnsIt";
import PostNewQuestion from "./PostNewQuestion";
import { BaseUrl } from "./BaseUrl";

const TruthorDareAnsers = (props) => {
  const { loggedInUser } = useAuth();
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(1);
  const [maxIndex, setMaxIndex] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // Fetch the question
        const response = await axios.get(`${BaseUrl}api/questions?index=${index}`);
        if (response.status === 200) {
          setQuestion(response.data);
          if (maxIndex === null || index > maxIndex) {
            setMaxIndex(index);
          }
        }

        // Fetch answers
        try {
          const answersResponse = await axios.get(`${BaseUrl}api/questions/getAllAns?questionNumber=${index}`);
          if (answersResponse.status === 200) {
            setAnswers(answersResponse.data.data);
          } else {
            console.warn(`No answers found for question ${index}`);
            setAnswers([]); // Ensure answers state is empty when not found
          }
        } catch (answersError) {
          console.error('Error fetching answers:', answersError);
          // Handle the case where answers are not found
          setAnswers([]);
        }

      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Question not found:', error);
          setMaxIndex(index - 1);
          if (index > 1) {
            setIndex(index - 1);
          }
        } else {
          console.error('Error fetching question:', error);
        }
      }
    };

    fetchQuestion();
  }, [index]);

  const handlePrevious = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    console.log("Handle next is clicked in TruthorDareAnswer");

    console.log(index+"sdfsdf index");
    console.log(maxIndex+"Max index ");
    if (index <= maxIndex) {
      console.log("Handle next is clicked in TruthorDareAnswer and if codintion is being executed");
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <div className="h-[84vh] flex flex-col">
      {/* The question section */}
      <div className="flex-grow flex items-center justify-center relative">
        <div className="relative w-full max-w-lg p-4 bg-gradient-to-r from-[#ff4458] via-[#fe5b3b] to-[#fe2c73] rounded-xl shadow-lg glass-effect">
          {/* Back Button */}
          <div
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center hover:bg-[#fe5b3b] hover:rounded-full p-2 cursor-pointer transition ease-in-out duration-200 z-10"
          >
            <ArrowBackIcon sx={{ fontSize: 40, color: 'white' }} />
          </div>

          {/* Question Text */}
          <div
            className="text-center flex justify-center items-center font-bold text-lg p-2 h-32 overflow-y-auto"
            style={{ marginLeft: 40, marginRight: 40 }}
          >
            {question ? question.question : "Loading..."}
          </div>

          {/* Forward Button */}
          <div
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center hover:bg-[#fe5b3b] hover:rounded-full p-2 cursor-pointer transition ease-in-out duration-200 z-10"
          >
            <ArrowForwardIcon sx={{ fontSize: 40, color: 'white' }} />
          </div>
        </div>
      </div>
      {/* The question section ends */}

      {/* Answers section starts */}
      <div className="h-4/5 text-white overflow-y-auto">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <IndiDareAnsers
              key={answer._id}
              name={answer.studentName}
              dp={answer.studentDp}
              time={new Date(answer.answerTime).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              anonymous={answer.anonymous}
              answer={answer.question}
            />
          ))
        ) : (
          <p className="text-center">No answers yet.</p>
        )}
      </div>

      <PostNewQuestion questionId={index} userEmail={loggedInUser.collegeEmail} />
      <AnsIt questionId={index} userEmail={loggedInUser.collegeEmail} />
      {/* Answers section ends */}
    </div>
  );
};

export default TruthorDareAnsers;
