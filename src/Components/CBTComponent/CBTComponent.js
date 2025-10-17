import React, { useState, useEffect } from 'react';
import './CBTComponent.css';
import { useCbtstore } from '../../store/cbtStore';

const CBTComponent = ({ userData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examdata, setExamdate] = useState({});
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
const [sharePermission, setSharePermission] = useState(true); // default is true



  const {user_id, username, avatar, exam, year, subjects, duration } = userData;
  
const { getQuestion,  recordAttempt } = useCbtstore();


  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestion(exam, year, subjects[0]);

        console.log("Fetched Questions:", res);

        if (res && res.questions && Array.isArray(res.questions)) {
          setFetchedQuestions(res.questions);
          setAnswers(Array(res.questions.length).fill(null));
          setExamdate(res);

          const totalSeconds = typeof userData.duration === 'number' ? userData.duration * 60 : 60 * 60;
          setTimeLeft(totalSeconds);
        } else {
          console.error("Questions not found in response", res);
        }
      } catch (err) {
        console.error("Error getting questions:", err);
      }
    };

    fetchQuestions();
  }, [exam, year, subjects]);

  // Timer
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

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
    if (
      answerIndex !== null &&
      fetchedQuestions[i]?.options[answerIndex] === fetchedQuestions[i]?.ans
    ) {
      correct += 1;
    }
  });
  setScore(correct);
  setSubmitted(true);
  setShowPermissionModal(true); // show modal to ask for permission
};
const handleRecordAttempt = async () => {
  const percentage = ((score / fetchedQuestions.length) * 100).toFixed(2);
  const date = new Date().toISOString();

  try {
    await recordAttempt(
      user_id,
      username,
      avatar,
      exam,
      subjects[0],
      year,
      score,
      (score / fetchedQuestions.length * 100).toFixed(2),
      sharePermission, // ✅ from state
      date,
      duration

    );
    console.log("Attempt recorded successfully.");
    setShowPermissionModal(false); // close modal
  } catch (err) {
    console.error("Error recording attempt:", err);
  }
};



  if (fetchedQuestions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = fetchedQuestions[currentIndex];

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', position: 'relative' }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px', textAlign: 'right' }}>
        Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {fetchedQuestions.map((_, index) => (
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
          <h3>Question {currentIndex + 1} of {fetchedQuestions.length}</h3>
          <p style={{ fontWeight: 'bold' }}>{currentQuestion.question}</p>
          {
            !currentQuestion.image ? null : (
              <img src={currentQuestion.image} alt="question related" style={{ maxWidth: '100%',maxWidth:'200px', margin: '10px 0' }} />
            )
          }
             {/* 
              ✅ Show difficulty 
             */}
          <p
            style={{
              fontSize: "14px",
              color:
                currentQuestion.difficulty === "hard"
                  ? "red"
                  : currentQuestion.difficulty === "medium"
                  ? "orange"
                  : "green",
              fontWeight: "500",
            }}
          >
            Difficulty: {currentQuestion.difficulty || "N/A"}
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentQuestion.options.map((option, index) => (
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => goToQuestion(currentIndex + 1)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: 'linear-gradient(90deg, #20537c, #15253a)',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              disabled={currentIndex + 1 >= fetchedQuestions.length}
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
          <p><strong>Score:</strong> {score} / {fetchedQuestions.length}</p>
          <p><strong>Percentage:</strong> {(score / fetchedQuestions.length * 100).toFixed(2)}%</p>

          <h3 style={{ marginTop: '30px' }}>Review Answers</h3>
          {fetchedQuestions.map((q, index) => {
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

      {showPermissionModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h3>Share Your Score?</h3>
            <p>Would you like to share your score on the leaderboard?</p>
            <label style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="checkbox"
                checked={sharePermission}
                onChange={(e) => setSharePermission(e.target.checked)}
              />{" "}
              Yes, I want to share my score
            </label>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handleRecordAttempt}
                style={{
                  marginRight: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#20537c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                OK
              </button>
             
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CBTComponent;
