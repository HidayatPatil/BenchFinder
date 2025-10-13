import React, { useState } from "react";
import "../styles/components/Add.css";
import { Link } from "react-router-dom";

const Add = () => {
  const [benchData, setBenchData] = useState({
    name: "",
    location: "3700 Willingdon Avenue, Burnaby, BC",
    rating: 0,
    tags: [],
    photos: [],
    cleanliness: "",
    view: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBenchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setBenchData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleTagClick = (tag) => {
    setBenchData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving bench:", benchData);
  };

  return (
    <div className="add-container">
      <header>
        <Link to="/">
          <button className="close-button">×</button>
        </Link>
        <h1>Add</h1>
      </header>

      <form>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name your bench"
            value={benchData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Current Location</label>
          <input
            type="text"
            name="location"
            value={benchData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Rating</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star ${benchData.rating >= star ? "active" : ""}`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Tags</label>
          <div className="tags-container">
            {["trees", "trail", "rail"].map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag ${
                  benchData.tags.includes(tag) ? "active" : ""
                }`}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Photos</label>
          <div className="photos-container">
            <button type="button" className="add-photo">
              +
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Cleanliness</label>
          <select
            name="cleanliness"
            value={benchData.cleanliness}
            onChange={handleInputChange}
          >
            <option value="">Select bench condition</option>
            <option value="clean">Clean</option>
            <option value="moderate">Moderate</option>
            <option value="dirty">Dirty</option>
          </select>
        </div>

        <div className="input-group">
          <label>View</label>
          <select
            name="view"
            value={benchData.view}
            onChange={handleInputChange}
          >
            <option value="">Select view rating</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <button type="button" className="save-button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
