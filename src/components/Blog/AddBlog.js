import React, { useState } from "react";
import "./styles/AddBlog.css";
const AddBlog = ({ setblog }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
   

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    // Handle file input separately
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name === "title") {
      if (value.length < 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "Title must be at least 5 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "",
        }));
      }
    } else if (name === "description") {
      if (value.length < 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "Description must be at least 5 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "",
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, media } = formData;
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userDetails.userId);
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("media", media);
    formdata.append("id", userDetails.userId);
    if (errors.title || errors.description) {
      return; 
    }
    try {
      const response = await fetch(process.env.REACT_APP_API+"api/blog/addBlog", {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        const responseData = await response.json();
        setblog(true);
      } else {
        const responseData = await response.json();

        window.alert(responseData.message);
      }
      
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setFormData({
      title: "",
      description: "",
      media: null,
    });
  };

  return (
    <div className="add-blog-form">
      <h2>Add Blog Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="media">Upload Media:</label>
          <input
          required
            type="file"
            id="media"
            name="media"
            accept="image/*, video/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
