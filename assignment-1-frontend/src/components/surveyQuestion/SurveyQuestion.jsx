import "./SurveyQuestion.css";

const SurveyQuestion = ({
  questions,
  responses,
  handleResponseChange,
  highlightedIndex,
}) => {
  return (
    <div className="survey-question">
      {questions.map((question, index) => (
        <div
          className={`question-block ${
            highlightedIndex === index ? "highlighted-question" : ""
          }`}
          key={index}
        >
          <p>
            Q{index + 1}. {question.question}
          </p>
          <ul>
            {["A", "B", "C", "D"].map((option) => (
              <li className="question-options" key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={() => handleResponseChange(index, option)}
                  />
                  {option}: {question[option]}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SurveyQuestion;
