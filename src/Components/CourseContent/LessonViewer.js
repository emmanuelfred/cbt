const LessonViewer = ({ lesson }) => {
  if (!lesson) {
    return <div className="text-center text-gray-500">Select a lesson to start learning</div>;
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">{lesson.title}</h3>

      {lesson.type === "video" && (
        <video controls className="w-full rounded">
          <source src={lesson.contentUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {lesson.type === "pdf" && (
        <iframe
          src={lesson.contentUrl}
          title="PDF Viewer"
          className="w-full h-[500px] border rounded"
        ></iframe>
      )}

      {lesson.type === "image" && (
        <img
          src={lesson.contentUrl}
          alt={lesson.title}
          className="w-full max-w-lg rounded"
        />
      )}

      {lesson.type === "quiz" && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <p>This is a quiz. (Render quiz UI here.)</p>
          {/* You can map quiz.questions here */}
        </div>
      )}
    </div>
  );
};

export default LessonViewer;
