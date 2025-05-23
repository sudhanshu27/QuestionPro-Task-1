import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import SurveyQuestion from "../../components/surveyQuestion/SurveyQuestion";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/logo-1.png";

const Home = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(4);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/questions");
        const questionData = response.data;
        setQuestions(questionData);
        setResponses(Array(questionData.length).fill(""));
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions. Please refresh the page.");
      }
    };
    fetchQuestions();
  }, []);

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
    setHighlightedIndex(null); // Reset highlight on answer change
  };

  // Remove per-page validation, just set page directly on click
  const handlePageChange = (newPage) => {
    setHighlightedIndex(null); // clear highlight on page change (optional)
    setCurrentPage(newPage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    // Full validation on submit: check all questions answered
    for (let i = 0; i < responses.length; i++) {
      if (responses[i] === "") {
        toast.warning(`Please answer question ${i + 1}.`);
        setHighlightedIndex(i);

        // Jump to page of the unanswered question
        const page = Math.floor(i / questionsPerPage) + 1;
        setCurrentPage(page);
        return;
      }
    }

    // Submit form if all valid
    try {
      const res = await axios.post("http://localhost:3000/api/submit", {
        name,
        email,
        responses,
      });

      toast.success(res.data.message);

      navigate("/user-result", {
        state: {
          email,
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit survey. Please try again later.");
    }
  };

  return (
    <div className="home">
      <div className="inside-home">
        <div className="heading-1">
          <h1>SURVEY FORM</h1>
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="heading-2">
          <h2>Welcome to the Survey Form</h2>
        </div>
        <div className="text">
          <div className="inside-text">
            Please enter your Name and Email below-
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={name}
                placeholder="Enter username"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <hr className="hr" />
          <SurveyQuestion
            questions={currentQuestions}
            responses={responses}
            handleResponseChange={handleResponseChange}
            highlightedIndex={highlightedIndex}
            currentPage={currentPage}
            questionsPerPage={questionsPerPage}
          />
          <hr className="hr" />
          <Pagination
            postsPerPage={questionsPerPage}
            totalPosts={questions.length}
            setCurrentPage={handlePageChange}
            currentPage={currentPage}
          />
          <div className="submit-button">
            <button type="submit">Submit Form</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
