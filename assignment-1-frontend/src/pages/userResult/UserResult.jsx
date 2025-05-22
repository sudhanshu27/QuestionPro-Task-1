import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserResult.css";

const UserResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [rank, setRank] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/user/${email}`);
        const allRes = await axios.get("http://localhost:3000/admin/results");

        const user = userRes.data;
        setUserData(user);

        // Find rank
        const sorted = allRes.data; // assuming this is sorted descending by score
        const userRank = sorted.findIndex((r) => r.email === email);
        if (userRank !== -1) {
          setRank(userRank + 1); // +1 because index is 0-based
        }
      } catch (error) {
        console.error("Error fetching user or results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (!email)
    return (
      <div className="user-result">Invalid access — email not provided.</div>
    );
  if (loading) return <div className="user-result">Loading...</div>;
  if (!userData) return <div className="user-result">User not found.</div>;

  return (
    <div className="user-result">
      <div className="user-result-container">
        <h2 className="heading">Your Result</h2>

        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Score:</strong> {userData.score}
        </p>
        <p>
          <strong>Rank:</strong> {rank}
        </p>

        <h3 className="responses">Your Answers:</h3>
        <ul className="response-list">
          {userData.detailedResponses.map((item, index) => (
            <li key={index} className="response-item">
              <p className="question-text">
                Q{index + 1}: {item.question}
              </p>
              <p className={item.isCorrect ? "correct" : "wrong"}>
                Your Answer: {item.userAnswer.option} - {item.userAnswer.text}
              </p>
              <p>
                Correct Answer: {item.correctAnswer.option} -{" "}
                {item.correctAnswer.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="btn-container">
          <button
            className="view-rank-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="view-rank-btn"
            onClick={() => navigate("/admin")}
          >
            View All Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserResult;
