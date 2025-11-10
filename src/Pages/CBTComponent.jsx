import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useCbtstore } from '../Store/cbtStore';
import { useAuthStore } from "../Store/authStore";


const CBTComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examdata, setExamdate] = useState({});
  const { isAuthenticated,user,login, isLoading} = useAuthStore();
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
const userData = location.state ||{username:null, avatar:null, exam:null, year:null, subjects:null, duration:null};
  const {  exam, year, subject, duration } = userData;
  const { getQuestion, recordAttempt,error } = useCbtstore();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestion(exam, year, subject);
        if (res && res.questions && Array.isArray(res.questions)) {
          setFetchedQuestions(res.questions);
          setAnswers(Array(res.questions.length).fill(null));
          setExamdate(res);
          const totalSeconds =
            typeof userData.duration === 'number' ? userData.duration * 60 : 60 * 60;
          setTimeLeft(totalSeconds);
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

  const handleOptionClick = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const goToQuestion = (index) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    if(!isAuthenticated){
      
      setShowUserModal(true);
    
      return;
    }
    // Check if user info is missing
   
    calculateScore();
  };

  const calculateScore = () => {
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
    setShowPermissionModal(true);
  };

  const handleRecordAttempt = async () => {
    const date = new Date().toISOString();
    let user_id=user._id
    let username =user.name
    let avatar = user. profilePic
    try {
      await recordAttempt(
        user_id ,
        username ,
        avatar ,
        exam,
        subject,
        year,
        score,
        (score / fetchedQuestions.length * 100).toFixed(2),
        sharePermission,
        date,
        duration
      );
      setShowPermissionModal(false);
    } catch (err) {
      console.error("Error recording attempt:", err);
    }
  };

  const handleTempUserSubmit = async () => {
     if (!tempUser.email || !tempUser.password) {
       alert("Please enter your Detail.");
       return;
     }
     await login(tempUser.email, tempUser.password);
     setTimeout(() => {
       if (!useAuthStore.getState().error && useAuthStore.getState().isAuthenticated) {
         setShowUserModal(false);
         Enroll();
         setTempUser({ email: "", password: "" });
       }
     }, 300);
    setShowUserModal(false);
    calculateScore();
  };

  if (fetchedQuestions.length === 0) return <h3 className='py-20'>{error}</h3>;
  const currentQuestion = fetchedQuestions[currentIndex];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: 'oklch(44.6% 0.03 256.802)' ,paddingTop:'100px',marginBottom:'50px'}}>
      {/* Timer */}
      <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px', textAlign: 'right', color: '#0C6F89' }}>
        ⏱ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
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
          <h3 style={{ color: '#0C6F89' }}>Question {currentIndex + 1} of {fetchedQuestions.length}</h3>
          <p style={{ fontWeight: 'bold' }}>{currentQuestion.question}</p>

          {currentQuestion.image && (
            <img src={currentQuestion.image} alt="question" style={{ maxWidth: '200px', margin: '10px 0', borderRadius: '8px' }} />
          )}

          {/* Difficulty */}
          <p style={{
            fontSize: "14px",
            fontWeight: "500",
            color:
              currentQuestion.difficulty === "hard"
                ? "red"
                : currentQuestion.difficulty === "medium"
                ? "orange"
                : "green",
          }}>
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
                  border: '1px solid #cce3d4',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: answers[currentIndex] === index ? '#dff5e0' : '#fff',
                  transition: '0.2s'
                }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => goToQuestion(currentIndex + 1)} style={btnStyle} disabled={currentIndex + 1 >= fetchedQuestions.length}>
              Next
            </button>
            <button onClick={handleSubmit} style={btnStyle}>Submit Test</button>
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

      {/* User Info Modal */}
     {showUserModal && (
        <div style={modalOverlay}>
          <div style={modalContent} className="relative">
            <button className="absolute top-2 right-2 border-1 p-1 text-1xl  rounded-full w-8 h-8   text-[red]" style={{fontWeight:700, cursor:'pointer'}}
            onClick={()=>{
              setShowUserModal(false)
            }}
            >X</button>
            <h3 style={{ color: '#0C6F89' }}>Login to continue</h3>
              {error && (
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
