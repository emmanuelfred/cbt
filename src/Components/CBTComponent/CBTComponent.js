import React, { useState } from 'react';
import './CBTComponent.css'; // Optional styling

const questions = [
  {
    id: 1,
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    ans: "Abuja"
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "2", "6"],
    ans: "4"
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus", "Saturn"],
    ans: "Mars"
  },
  {
    id: 4,
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C", "95°C"],
    ans: "100°C"
  },
  {
    id: 5,
    question: "Who wrote 'Things Fall Apart'?",
    options: ["Wole Soyinka", "Chinua Achebe", "Ngugi wa Thiong’o", "Ken Saro-Wiwa", "Fela Kuti"],
    ans: "Chinua Achebe"
  }
];

const CBTComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const goToQuestion = (index) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    let correct = 0;
    answers.forEach((answerIndex, i) => {
      if (answerIndex !== null && questions[i].options[answerIndex] === questions[i].ans) {
        correct += 1;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto',position:'relative' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToQuestion(index)}
            style={{
              backgroundColor:
                index === currentIndex ? '#20537c' :
                answers[index] !== null ? '#15253a' : '#F8F9F5',
              color:
                index === currentIndex || answers[index] !== null ? '#fff' : '#f4825d',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {!submitted ? (
        <>
          <h3>Question {currentIndex + 1} of {questions.length}</h3>
          <p style={{ fontWeight: 'bold' }}>{questions[currentIndex].question}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currentIndex].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(index)}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor:
                    answers[currentIndex] === index ? '#d1e7dd' : '#fff'
                }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </li>
            ))}
          </ul>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            
                  <button
                      onClick={() => goToQuestion(currentIndex+1)}
                    style={{
                      marginTop: '20px',
                      padding: '10px 20px',
                      background: 'linear-gradient(90deg, #20537c, #15253a)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      
                    }}
                  >
                  Next
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      marginTop: '20px',
                      padding: '10px 20px',
                      background: 'linear-gradient(90deg, #20537c, #15253a)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      
                    }}
                  >
                  Submit Test
                  </button>


          </div>

        </>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <h3>Test Submitted</h3>
          <p><strong>Score:</strong> {score} / {questions.length}</p>
          <p><strong>Percentage:</strong> {(score / questions.length * 100).toFixed(2)}%</p>

          <h3 style={{ marginTop: '30px' }}>Review Answers</h3>
          {questions.map((q, index) => {
            const selectedIndex = answers[index];
            const selectedAns = selectedIndex !== null ? q.options[selectedIndex] : "No Answer";
            const isCorrect = selectedAns === q.ans;

            return (
              <div key={index} style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '15px',
                borderLeft: isCorrect ? '5px solid green' : '5px solid red',
                backgroundColor: isCorrect ? '#e6ffed' : '#ffe6e6'
              }}>
                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                <p>
                  <strong>Your Answer:</strong> {selectedAns} <br />
                  {!isCorrect && <strong>Correct Answer:</strong>} {!isCorrect && <span>{q.ans}</span>}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CBTComponent;
