// src/pages/Profile/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { Alert, Spinner } from "react-bootstrap";

const EditProfile = () => {
  const { 
    user, 
    fetchInterests, 
    savedInterests, 
    updateprofile, 
    isLoading, 
    message, 
    
  } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    profilePic: user?.profilePic || "",
    academicLevel: user?.academicLevel || "Beginner",
    interests: user?.interests || [],
  });

  const [preview, setPreview] = useState(user?.profilePic || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [massagetype, setMessagetype] = useState({ text: "", type: "" });

  useEffect(() => {
    if (fetchInterests) fetchInterests();
  }, [fetchInterests]);

  useEffect(() => {
    if (savedInterests?.length) setAvailableInterests(savedInterests);
  }, [savedInterests]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestToggle = (interestName) => {
    let updated = [...formData.interests];
    if (updated.includes(interestName)) {
      updated = updated.filter((item) => item !== interestName);
    } else {
      if (updated.length >= 5) {
        setMessagetype({ text: "You can select up to 5 interests only.", type: "danger" });
        return;
      }
      updated.push(interestName);
    }
    setFormData({ ...formData, interests: updated });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessagetype({ text: "Name is required.", type: "danger" });
      return false;
    }
    if (!formData.academicLevel) {
      setMessagetype({ text: "Select your academic level.", type: "danger" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("id", user?._id);
      data.append("name", formData.name);
      data.append("academicLevel", formData.academicLevel);
      data.append("interests", JSON.stringify(formData.interests));
      if (selectedFile) data.append("profilePic", selectedFile);

      await updateprofile(data, token); // the store handles the message update internally
       setMessagetype({
        text: message || "update saved.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setMessagetype({
        text: err.response?.data?.message || "Something went wrong.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Edit Profile</h3>

      {message?.text && <Alert variant={massagetype.type}>{massagetype.text}</Alert>}

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <div className="mb-3 text-center">
          <label className="form-label d-block">Profile Picture</label>
          <div
            className="position-relative d-inline-block"
            style={{ cursor: "pointer" }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              src={preview || "/default-avatar.png"}
              alt="Profile Preview"
              style={{
                objectFit: "cover",
                height: "100px",
                width: "100px",
                objectPosition: "center",
                borderRadius: "50%",
                maxWidth: "100%",
              }}
            />
            <small className="d-block mt-2 text-muted">Click to change</small>
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="d-none"
            onChange={handleFileChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email (Read-only)</label>
          <input type="email" className="form-control" value={user?.email} disabled />
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        {/* Academic Level */}
        <div className="mb-3">
          <label className="form-label">Academic Level</label>
          <select
            className="form-select"
            name="academicLevel"
            value={formData.academicLevel}
            onChange={handleChange}
          >
            <option value="Primary">Primary</option>
            <option value="junior Secondary">Junior Secondary</option>
            <option value="senior Secondary">Senior Secondary</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Beginner">Beginner</option>
          </select>
        </div>

        {/* Interests */}
        <div className="mb-3">
          <label className="form-label d-block">Interests</label>
          <div className="d-flex flex-wrap gap-2">
            {availableInterests?.map((interest) => (
              <button
                key={interest._id || interest.name || interest}
                type="button"
                className={`btn btn-sm ${
                  formData.interests.includes(interest.name ? interest.name : interest)
                    ? "btn-success"
                    : "btn-outline-secondary"
                }`}
                onClick={() => handleInterestToggle(interest.name ? interest.name : interest)}
              >
                {interest.name ? interest.name : interest}
              </button>
            ))}
          </div>
          <small className="text-muted d-block mt-2">Select up to 5 interests.</small>
        </div>

        {/* Submit */}
        <button type="submit" className="btn  bg-[#15253a] w-100 mt-3" disabled={isLoading} style={{ backgroundColor: '#15253a', color: '#fff' }}>
          {isLoading ? <Spinner size="sm" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
