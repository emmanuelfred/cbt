// src/pages/CBTComponent.jsx (UPDATED for new structure)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCbtstore } from '../Store/cbtStore';
import { useAuthStore } from "../Store/authStore";

const CBTComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examdata, setExamdate] = useState({});
  const { isAuthenticated, user, login, isLoading } = useAuthStore();
  const auth_error = useAuthStore((s) => s.error);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [sharePermission, setSharePermission] = useState(true);
  const [tempUser, setTempUser] = useState({ email: "", password: "" });
  
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state || {
    username: null,
    avatar: null,
    exam: null,
    year: null,
    subject: null,
    duration: null
  };
  
  const { exam, year, subject, duration } = userData;
  const { getQuestion, recordAttempt, error } = useCbtstore();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!exam || !year || !subject) {
        console.error("Missing exam data");
        return;
      }

      try {
        const res = await getQuestion(exam, year, subject);
        
        if (res && res.questions && Array.isArray(res.questions)) {
          setFetchedQuestions(res.questions);
          setAnswers(Array(res.questions.length).fill(null));
          setExamdate(res);
          
          const totalSeconds = typeof duration === 'number' ? duration * 60 : 60 * 60;
          setTimeLeft(totalSeconds);
        } else {
          console.error("No questions in response");
        }
      } catch (err) {
        console.error("Error getting questions:", err);
      }
    };
    
    fetchQuestions();
  }, [exam, year, subject]);

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

  const handleOptionClick = (optionLabel) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = optionLabel;
    setAnswers(updatedAnswers);
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < fetchedQuestions.length) {
      setCurrentIndex(index);
    }
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setShowUserModal(true);
      return;
    }
    calculateScore();
  };

  const calculateScore = () => {
    let correct = 0;
    
    answers.forEach((selectedAnswer, i) => {
      const question = fetchedQuestions[i];
      if (!question) return;

      // Handle new option structure (objects with label and content)
      const correctAnswer = question.answer || question.ans;
      
      if (selectedAnswer && correctAnswer) {
        if (selectedAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
          correct += 1;
        }
      }
    });
    
    setScore(correct);
    setSubmitted(true);
    setShowPermissionModal(true);
  };

  const handleRecordAttempt = async () => {
    const date = new Date().toISOString();
    const user_id = user._id;
    const username = user.name;
    const avatar = user.profilePic;
    
    try {
      // Calculate time taken
      const timeTaken = duration - Math.floor(timeLeft / 60); // minutes used
      
      // Prepare answers array for storage
      const answersData = fetchedQuestions.map((q, index) => ({
        questionId: q._id,
        selectedAnswer: answers[index] || null,
        correctAnswer: q.answer || q.ans,
        isCorrect: answers[index]?.toUpperCase() === (q.answer || q.ans)?.toUpperCase()
      }));

      // Send complete data with all required fields
      await recordAttempt(
        user_id,
        username,
        avatar,
        exam,                        // exam name
        subject,
        year,
        score,                       // correct answers count
        (score / fetchedQuestions.length * 100).toFixed(2), // percentage
        sharePermission,
        date,
        duration,                    // total time allowed
        fetchedQuestions.length,     // ← NEW: total questions
        answersData                  // ← NEW: answers array
      );
      
      setShowPermissionModal(false);
      
      // Show success message
      alert("✅ Your score has been saved!");
      
    } catch (err) {
      console.error("Error recording attempt:", err);
      alert("Failed to save your score. Please try again.");
    }
  };

  const handleTempUserSubmit = async () => {
    if (!tempUser.email || !tempUser.password) {
      alert("Please enter your details.");
      return;
    }
    
    await login(tempUser.email, tempUser.password);
    
    setTimeout(() => {
      if (!useAuthStore.getState().error && useAuthStore.getState().isAuthenticated) {
        setShowUserModal(false);
        calculateScore();
        setTempUser({ email: "", password: "" });
      }
    }, 300);
  };

  // Helper function to get option content
  const getOptionContent = (option) => {
    if (typeof option === 'object') {
      return option.content || option;
    }
    return option;
  };

  // Helper function to get option label
  const getOptionLabel = (option, index) => {
    if (typeof option === 'object' && option.label) {
      return option.label;
    }
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  if (fetchedQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {error ? (
            <>
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-[#0C6F89] text-white rounded-lg hover:bg-[#0a5d73]"
              >
                Go Back
              </button>
            </>
          ) : (
            <>
              <div className="spinner-border mb-3" style={{ width: "3rem", height: "3rem" }}></div>
              <p className="text-gray-600">Loading questions...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = fetchedQuestions[currentIndex];

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
      color: 'oklch(44.6% 0.03 256.802)',
      paddingTop: '100px',
      marginBottom: '50px'
    }}>
      {/* Timer */}
      <div style={{
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '10px',
        textAlign: 'right',
        color: timeLeft < 300 ? '#dc2626' : '#0C6F89'
      }}>
        ⏱ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        {timeLeft < 300 && (
          <span className="ml-2 text-sm">⚠️ Hurry up!</span>
        )}
      </div>

      {/* Question Numbers */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {fetchedQuestions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToQuestion(index)}
            style={{
              backgroundColor:
                index === currentIndex ? '#0C6F89' :
                answers[index] !== null ? '#02894b' : '#eaf4ed',
              color: index === currentIndex || answers[index] !== null ? '#fff' : '#0C6F89',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.2s ease'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {!submitted ? (
        <>
          <h3 style={{ color: '#0C6F89' }}>
            Question {currentIndex + 1} of {fetchedQuestions.length}
          </h3>
          
          {/* Question Text */}
          <div
            style={{ fontWeight: 'bold', marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />

          {/* Question Image */}
          {currentQuestion.questionImage && (
            <img
              src={currentQuestion.questionImage}
              alt="question"
              style={{ maxWidth: '300px', margin: '10px 0', borderRadius: '8px' }}
            />
          )}

          {/* Difficulty Badge */}
          <p style={{
            fontSize: "14px",
            fontWeight: "500",
            color:
              currentQuestion.difficulty === "hard"
                ? "red"
                : currentQuestion.difficulty === "medium"
                ? "orange"
                : "green",
            marginBottom: "15px"
          }}>
            Difficulty: {currentQuestion.difficulty || "N/A"}
          </p>

          {/* Options */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentQuestion.options.map((option, index) => {
              const optionLabel = getOptionLabel(option, index);
              const optionContent = getOptionContent(option);
              const isSelected = answers[currentIndex] === optionLabel;
              const isImage = typeof option === 'object' && option.type === 'image';

              return (
                <li
                  key={index}
                  onClick={() => handleOptionClick(optionLabel)}
                  style={{
                    marginBottom: '10px',
                    padding: '10px',
                    border: '1px solid #cce3d4',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#dff5e0' : '#fff',
                    transition: '0.2s',
                    borderLeft: isSelected ? '4px solid #02894b' : '1px solid #cce3d4'
                  }}
                >
                  <strong>{optionLabel}.</strong>{' '}
                  {isImage ? (
                    <img
                      src={optionContent}
                      alt={`Option ${optionLabel}`}
                      style={{ maxWidth: '200px', marginTop: '5px', borderRadius: '5px' }}
                    />
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: optionContent }} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => goToQuestion(currentIndex - 1)}
              style={{
                ...btnStyle,
                opacity: currentIndex === 0 ? 0.5 : 1,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            
            <button
              onClick={() => goToQuestion(currentIndex + 1)}
              style={{
                ...btnStyle,
                opacity: currentIndex + 1 >= fetchedQuestions.length ? 0.5 : 1,
                cursor: currentIndex + 1 >= fetchedQuestions.length ? 'not-allowed' : 'pointer'
              }}
              disabled={currentIndex + 1 >= fetchedQuestions.length}
            >
              Next
            </button>
            
            <button onClick={handleSubmit} style={{...btnStyle, background: 'linear-gradient(90deg, #dc2626, #991b1b)'}}>
              Submit Test
            </button>
          </div>
        </>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#0C6F89' }}>Test Submitted</h3>
          <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <p><strong>Score:</strong> {score} / {fetchedQuestions.length}</p>
            <p><strong>Percentage:</strong> {(score / fetchedQuestions.length * 100).toFixed(2)}%</p>
            <p><strong>Grade:</strong> {
              (score / fetchedQuestions.length * 100) >= 70 ? '🎉 Excellent' :
              (score / fetchedQuestions.length * 100) >= 50 ? '✅ Pass' :
              '❌ Failed'
            }</p>
          </div>

          <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Review Answers</h3>
          {fetchedQuestions.map((q, index) => {
            const selectedAnswer = answers[index];
            const correctAnswer = q.answer || q.ans;
            const isCorrect = selectedAnswer?.toUpperCase() === correctAnswer?.toUpperCase();

            return (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  marginBottom: '15px',
                  borderLeft: isCorrect ? '5px solid green' : '5px solid red',
                  backgroundColor: isCorrect ? '#e6ffed' : '#ffe6e6',
                  borderRadius: '5px'
                }}
              >
                <p><strong>Q{index + 1}:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: q.question }} />
                
                {q.questionImage && (
                  <img
                    src={q.questionImage}
                    alt="question"
                    style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '5px' }}
                  />
                )}
                
                <div style={{ marginTop: '10px' }}>
                  <p>
                    <strong>Your Answer:</strong>{' '}
                    <span style={{ color: isCorrect ? 'green' : 'red' }}>
                      {selectedAnswer || "No Answer"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong>{' '}
                      <span style={{ color: 'green' }}>{correctAnswer}</span>
                    </p>
                  )}
                </div>

                {q.explanation && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#f0f9ff',
                    borderRadius: '5px'
                  }}>
                    <strong>Explanation:</strong>
                    <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Share Permission Modal */}
      {showPermissionModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3 style={{ color: '#0C6F89' }}>Share Your Score?</h3>
            <p>Would you like to share your score on the leaderboard?</p>
            <label style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="checkbox"
                checked={sharePermission}
                onChange={(e) => setSharePermission(e.target.checked)}
              />{" "}
              Yes, I want to share my score
            </label>
            <button onClick={handleRecordAttempt} style={btnStyle}>OK</button>
          </div>
        </div>
      )}

      {/* User Login Modal */}
      {showUserModal && (
        <div style={modalOverlay}>
          <div style={modalContent} className="relative">
            <button
              className="absolute top-2 right-2 border-1 p-1 text-1xl rounded-full w-8 h-8 text-[red]"
              style={{ fontWeight: 700, cursor: 'pointer' }}
              onClick={() => setShowUserModal(false)}
            >
              X
            </button>
            <h3 style={{ color: '#0C6F89' }}>Login to continue</h3>
            {auth_error && (
              <div className="text-red-600 text-sm text-center">{auth_error}</div>
            )}

            <input
              type="email"
              placeholder="Enter your Email"
              value={tempUser.email}
              onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Enter Your Password"
              value={tempUser.password}
              onChange={(e) => setTempUser({ ...tempUser, password: e.target.value })}
              style={inputStyle}
            />

            <button onClick={handleTempUserSubmit} style={btnStyle}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const btnStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  background: 'linear-gradient(90deg, #0C6F89, #02894b)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContent = {
  background: 'white',
  padding: '30px',
  borderRadius: '10px',
  maxWidth: '400px',
  width: '90%',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
};

export default CBTComponent;