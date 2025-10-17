import React from 'react'
import CourseContent from '../Components/CourseContent/CourseContent';
const sections = [
  {
    title: "Introduction to React",
    lectures: [
      { title: "Welcome & Setup", duration: "4:20", type: "video" },
      { title: "Project Overview", duration: "3:15", type: "video" },
    ],
  },
  {
    title: "React Components",
    lectures: [
      { title: "Functional Components", duration: "6:00", type: "video" },
      { title: "Props and State", duration: "7:45", type: "video" },
    ],
  },
];

function TakeCourse() {
  return (
    <div>
        <CourseContent sections={sections} />

    </div>
  )
}

export default TakeCourse