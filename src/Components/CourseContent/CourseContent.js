import { useState } from "react";
import { ChevronDown, ChevronUp, Video, FileText, Image as ImageIcon, HelpCircle } from "lucide-react";

const CourseContent = ({ course, onSelectLesson }) => {
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>
      {course?.sections?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border rounded mb-3">
          <button
            onClick={() => toggleSection(sectionIndex)}
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200"
          >
            <span className="text-lg font-semibold">{section.title}</span>
            {openSectionIndex === sectionIndex ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openSectionIndex === sectionIndex && (
            <ul className="bg-white px-4 divide-y">
              {section.lessons?.map((lesson, i) => (
                <li
                  key={lesson._id}
                  onClick={() => onSelectLesson(lesson)}
                  className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2 text-gray-800">
                    {lesson.type === "video" && <Video size={18} />}
                    {lesson.type === "pdf" && <FileText size={18} />}
                    {lesson.type === "image" && <ImageIcon size={18} />}
                    {lesson.type === "quiz" && <HelpCircle size={18} />}
                    <span>{lesson.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
