import React, { useState, useEffect } from "react";
import Question from "./Question";

function QuestionForm() {
  const [formData, setFormData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [textInputs, setTextInputs] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  const handleOptionSelect = (
    questionId,
    optionId,
    followUpQuestionId,
    textInputValue
  ) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));

    if (followUpQuestionId) {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [followUpQuestionId]: undefined,
      }));
    }

    if (textInputValue !== undefined) {
      setTextInputs((prevTextInputs) => ({
        ...prevTextInputs,
        [questionId]: textInputValue,
      }));
    }
  };

  const handleNextButtonClick = () => {
    const currentQuestion = formData[currentQuestionIndex];
    const selectedOptionIds = selectedOptions[currentQuestion.id];

    if (
      !selectedOptionIds &&
      currentQuestion.type !== "text" &&
      currentQuestion.type !== "checkbox"
    ) {
      setError("Please select an option.");
      return;
    }

    setError(""); // Clear any previous errors
    let followUpQuestionId = null;
    if (currentQuestion && currentQuestion.options) {
      followUpQuestionId = currentQuestion.options.find(
        (option) => option.id === selectedOptionIds
      )?.followUpQuestionId;
    }

    if (followUpQuestionId) {
      const followUpQuestionIndex = formData.findIndex(
        (question) => question.id === followUpQuestionId
      );
      setCurrentQuestionIndex(followUpQuestionIndex);
    } else if (currentQuestionIndex < formData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setFormSubmitted(true);
    }
  };

  const currentQuestion = formData[currentQuestionIndex];

  return (
    <div className="QuestionForm">
      {formSubmitted ? (
        <div>
          <h2 className="submitted">Thanks for your response!</h2>
        </div>
      ) : (
        <form>
          {currentQuestion && (
            <Question
              key={currentQuestion.id}
              question={currentQuestion}
              selectedOption={selectedOptions[currentQuestion.id]}
              textInputValue={textInputs[currentQuestion.id]}
              onOptionSelect={handleOptionSelect}
            />
          )}
          {error && (
            <div className="ErrorMessageOverlay">
              <div className="ErrorMessage">
                {error}
                <span
                  className="ErrorMessageCloseButton"
                  onClick={() => setError("")}
                >
                  &#10005;
                </span>
              </div>
            </div>
          )}
          <button
            className="next-button"
            type="button"
            onClick={handleNextButtonClick}
            disabled={!currentQuestion}
          >
            {currentQuestionIndex === formData.length - 1 ? "Submit" : "Next"}
          </button>
        </form>
      )}
    </div>
  );
}

export default QuestionForm;
