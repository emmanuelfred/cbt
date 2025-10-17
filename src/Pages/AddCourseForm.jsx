import { useState } from "react";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    course_title: "",
    course_id: "",
    instructor: "",
    short_description: "",
    description: "",
    course_price: "",
    course_length: "",
    course_material_types: "",
    course_material_count: 0,
    downloadable_material_count: 0,
    enrollment_count: 0,
    active_student: 0,
    awarded_student: 0,
    sections: 0,
    tags: "",
    is_published: false
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append regular fields
    for (const key in formData) {
      if (key === "course_price" || key.includes("count") || key.includes("student") || key === "sections") {
        data.append(key, Number(formData[key]));
      } else if (key === "course_material_types" || key === "tags") {
        const list = formData[key].split(",").map(item => item.trim());
        data.append(key, JSON.stringify(list)); // let backend parse JSON
      } else {
        data.append(key, formData[key]);
      }
    }

    // Append the thumbnail file
    if (thumbnail) {
      data.append("course_thumbnail", thumbnail);
    }

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        body: data
      });

      const result = await res.json();
      alert("Course added successfully");
      console.log(result);
    } catch (err) {
      console.error(err);
      alert("Error uploading course");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4" style={{marginTop:100, marginBottom:100}}>
      <h1 className="text-xl font-bold mb-4">Add Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Thumbnail</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
        </div>

        {[
          { label: "Title", name: "course_title" },
          { label: "Course ID", name: "course_id" },
          { label: "Instructor", name: "instructor" },
          { label: "Short Description", name: "short_description" },
          { label: "Description", name: "description" },
          { label: "Price", name: "course_price", type: "number" },
          { label: "Length", name: "course_length" },
          { label: "Material Types (comma-separated)", name: "course_material_types" },
          { label: "Material Count", name: "course_material_count", type: "number" },
          { label: "Downloadable Material Count", name: "downloadable_material_count", type: "number" },
          { label: "Enrollment Count", name: "enrollment_count", type: "number" },
          { label: "Active Students", name: "active_student", type: "number" },
          { label: "Awarded Students", name: "awarded_student", type: "number" },
          { label: "Sections", name: "sections", type: "number" },
          { label: "Tags (comma-separated)", name: "tags" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        ))}

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
            />
            <span>Published</span>
          </label>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
