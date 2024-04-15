import React, { useState } from 'react';
import './EditUser.css';

const EditUser = () => {
  const [formData, setFormData] = useState({
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editUser = async () => {
    try {
      const response = await fetch('http://localhost:4000/edituser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ newPassword: formData.password }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Password updated successfully');
      } else {
        alert('Failed to update password: ' + data.errors);
      }
    } catch (error) {
      console.error('Error editing user:', error);
      alert('An error occurred while updating password. Please try again later.');
    }
  };

  return (
    <div className="edit-user">
      <h1>Edit Password</h1>
      <div className="edit-user-fields">
        <input name="password" onChange={changeHandler} value={formData.password} type="password" placeholder="New Password" />
      </div>
      <button onClick={editUser}>Save Changes</button>
    </div>
  );
};

export default EditUser;
