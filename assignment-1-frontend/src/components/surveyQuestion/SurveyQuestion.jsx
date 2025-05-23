import "./SurveyQuestion.css";

const SurveyQuestion = ({
  questions,
  responses,
  handleResponseChange,
  highlightedIndex,
  currentPage,
  questionsPerPage,
}) => {
  return (
    <div className="survey-question">
      {questions.map((question, index) => {
        const globalIndex = (currentPage - 1) * questionsPerPage + index;

        return (
          <div
            className={`question-block ${
              highlightedIndex === globalIndex ? "highlighted-question" : ""
            }`}
            key={globalIndex}
          >
            <p>
              Q{globalIndex + 1}. {question.question}
            </p>
            <ul>
              {["A", "B", "C", "D"].map((option) => (
                <li className="question-options" key={option}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${globalIndex}`}
                      value={option}
                      checked={responses[globalIndex] === option}
                      onChange={() => handleResponseChange(globalIndex, option)}
                    />
                    {option}: {question[option]}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SurveyQuestion;
