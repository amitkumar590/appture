function Question({ question, selectedOption, onOptionSelect, isSelected }) {
  const { id, text, type, options } = question;

  const handleOptionChange = (optionId, followUpQuestionId) => {
    onOptionSelect(id, optionId, followUpQuestionId);
  };

  return (
    <div className="Question">
      <p>{text}</p>
      {type === "radio" && (
        <div className="Options">
          {options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name={`question-${id}`}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() =>
                  handleOptionChange(option.id, option.followUpQuestionId)
                }
              />
              {option.text}
            </label>
          ))}
        </div>
      )}
      {type === "text" && (
        <div className="Options">
          <input
            type="text"
            value={selectedOption || ""}
            placeholder="Enter your answer here"
            onChange={(e) => handleOptionChange(e.target.value, null)}
          />
        </div>
      )}
    </div>
  );
}

export default Question;
