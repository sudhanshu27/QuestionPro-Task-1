import { useState, useEffect } from "react";
import axios from "axios";
import "./allResults.css";
import x from "../../assets/x-mark-2.png";
import homepage from "../../assets/home-page.png";
import { useNavigate } from "react-router-dom";

const AllResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/results");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const handleViewDetails = async (email) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${email}`);
      setSelectedUser(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="outer-container">
      <header className="header">
        <div className="inside-header">
          <img
            className="home-logo"
            src={homepage}
            alt=""
            onClick={() => navigate("/")}
          />
        </div>
        <div className="inside-header">
          <h1>Survey Results</h1>
        </div>
        <div className="inside-header"></div>
      </header>

      <div className="text-1">View all users' results and details</div>

      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Rank</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.score}</td>
                  <td>{index + 1}</td>
                  <td className={result.score > 5 ? "correct" : "wrong"}>
                    {result.score > 5 ? "Pass" : "Fail"}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleViewDetails(result.email)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && selectedUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                <img className="cross-logo" src={x} alt="Close" />
              </button>
              <h2 className="user-name">{selectedUser.name}</h2>

              <h3 className="responses">Responses:</h3>
              <ul className="response-list">
                {selectedUser.detailedResponses.map((item, index) => (
                  <li key={index}>
                    <p className="question-text">
                      Q{index + 1}: {item.question}
                    </p>
                    <p className={item.isCorrect ? "correct" : "wrong"}>
                      Your Answer: {item.userAnswer.option} -{" "}
                      {item.userAnswer.text}
                    </p>
                    <p>
                      Correct Answer: {item.correctAnswer.option} -{" "}
                      {item.correctAnswer.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2025 Survey App. All rights Reserved</p>
      </footer>
    </div>
  );
};

export default AllResults;
