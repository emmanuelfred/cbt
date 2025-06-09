import React, { useState } from 'react';
import avater1 from '../../Assets/avater/avater1.jpg';
import avater2 from '../../Assets/avater/avater2.jpg';
import avater3 from '../../Assets/avater/avater3.jpg';
import placeholder from '../../Assets/avater/placeholder-1-1.png';
import './TakeCBT.css';

const avaters = [avater1, avater2, avater3];

const exams = [
  {
    exams: 'WACE',
    avaible: [
      { year: '2000', subjects: ['english', 'math', 'literature', 'Goverment'] },
      { year: '2005', subjects: ['english', 'math', 'literature', 'Goverment', 'physic', 'chemistry'] },
      { year: '2008', subjects: ['english', 'math', 'literature', 'Goverment'] },
      { year: '2020', subjects: ['english', 'math', 'literature', 'Goverment'] }
    ],
    time: '2hr',
  },
  {
    exams: 'NECO',
    avaible: [
      { year: '2000', subjects: ['english', 'math', 'literature', 'Goverment'] },
      { year: '2005', subjects: ['english', 'math', 'literature', 'Goverment', 'physic', 'chemistry'] },
      { year: '2008', subjects: ['english', 'math', 'literature', 'Goverment'] },
      { year: '2020', subjects: ['english', 'math', 'literature', 'Goverment'] }
    ],
    time: '2hr',
  },
  {
    exams: 'JAMB',
    avaible: [
      { year: '2000', subjects: ['english', 'math', 'literature', 'Goverment'] },
      { year: '2005', subjects: ['english', 'math', 'literature', 'Goverment', 'physic', 'chemistry'] },
      { year: '2008', subjects: ['english', 'math', 'literature', 'Goverment'] },
      { year: '2020', subjects: ['english', 'math', 'literature', 'Goverment'] }
    ],
    time: '2hr',
  },
  {
    exams: 'Common Entrance',
    avaible: [
      { year: '2020', subjects: ['english', 'math', 'vabal reasoning'] },
      { year: '2025', subjects: ['english', 'math', 'vabal reasoning'] },
      { year: '2018', subjects: ['english', 'math', 'vabal reasoning'] },
      { year: '2016', subjects: ['english', 'math', 'vabal reasoning'] }
    ],
    time: '1hr',
  }
];

function TakeCBT() {
  const [selectedAvatar, setSelectedAvatar] = useState(placeholder);
  const [username, setUsername] = useState('John Smith');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [duration, setDuration] = useState('');

  const handleExamChange = (e) => {
    const examName = e.target.value;
    setSelectedExam(examName);
    setSelectedYear('');
    setSubjects([]);
    setSelectedSubjects([]);

    const exam = exams.find(ex => ex.exams === examName);
    if (exam) {
      setDuration(exam.time);
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setSelectedSubjects([]);

    const exam = exams.find(ex => ex.exams === selectedExam);
    if (exam) {
      const yearData = exam.avaible.find(yr => yr.year === year);
      setSubjects(yearData ? yearData.subjects : []);
    }
  };

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className='TakeCBT ' >
      <div className='row'>
        <div className='user_info col-md-4'>
          <div className='avater'>
            <img src={selectedAvatar} alt='Avatar' />
            <div className="avatar-options">
              {avaters.map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt={`avatar-${i}`}
                  onClick={() => setSelectedAvatar(av)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    margin: 5,
                    cursor: 'pointer',
                    border: av === selectedAvatar ? '2px solid #20537c' : '1px solid gray'
                  }}
                />
              ))}
            </div>
          </div>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='form-control mt-2'
          />
        </div>

        <div className='exam_info col-md-7'>
          <div className='form-group'>
            <label>Select Exam</label>
            <select value={selectedExam} onChange={handleExamChange} className='form-control'>
              <option value=''>-- Select Exam --</option>
              {exams.map((exam, idx) => (
                <option key={idx} value={exam.exams}>{exam.exams}</option>
              ))}
            </select>
          </div>

          {selectedExam && (
            <div className='form-group mt-2'>
              <label>Select Year</label>
              <select value={selectedYear} onChange={handleYearChange} className='form-control'>
                <option value=''>-- Select Year --</option>
                {exams.find(ex => ex.exams === selectedExam).avaible.map((yearObj, idx) => (
                  <option key={idx} value={yearObj.year}>{yearObj.year}</option>
                ))}
              </select>
            </div>
          )}

          {subjects.length > 0 && (
            <div className='mt-3'>
              <h5>Pick Subjects:</h5>
              {subjects.map((subj, idx) => (
                <div key={idx}>
                  <label>
                    <input
                      type="checkbox"
                      value={subj}
                      checked={selectedSubjects.includes(subj)}
                      onChange={() => handleSubjectToggle(subj)}
                    />
                    {' '}{subj}
                  </label>
                </div>
              ))}
              <p><strong>Duration:</strong> {duration}</p>

                <div className='btn-container'>
                <button
               
                disabled={selectedSubjects.length === 0}
              >
                Start CBT
              </button>

                </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TakeCBT;
