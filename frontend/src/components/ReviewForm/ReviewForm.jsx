import React, { useState } from 'react'
import "./ReviewForm.css"

const ReviewForm = () => {
    return(<></>)
    /*const [formData, setFormData] = useState({ user: '', rating: '', comment: '' });

    const changeHandler = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const submitHandler = async e => {
      e.preventDefault();
      try {
        await fetch('/reviews',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({title, content, rating}),
        });
        alert('Review submitted successfully!');
        setFormData({ user: '', rating: 0, comment: '' });
      } catch (err) {
        console.error('Error submitting review:', err);
        alert('Failed to submit review. Please try again later.');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="use" value={formData.use} onChange={handleChange} placeholder="Your Name" required />
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} min={1} max={5} placeholder="Rating (1-5)" required />
        <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Your Review" required />
        <button type="submit">Submit Review</button>
      </form>
    );*/
}

export default ReviewForm
