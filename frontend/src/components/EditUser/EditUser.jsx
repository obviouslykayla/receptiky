import React, { useState } from 'react';
import './EditUser.css';

const EditUser = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editUser = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('Hesla se neshodují');
      return;
    }

    try {
      if (formData.newPassword.trim() === '') {
        setErrorMessage('Nové heslo nesmí být prázdné');
        return;
      }

      const response = await fetch('http://localhost:4000/edituser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ newPassword: formData.newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Heslo bylo změněno.');
      } else {
        alert('Nepodařilo se změnit heslo: ' + data.errors);
      }
    } catch (error) {
      console.error('Chyba při změně hesla:', error);
      alert('Stala se chyba při změně hesla. Zkuste to znovu');
    }
  };

  return (
    <div className="edit-user">
      <h1>Změna hesla</h1>
      <div className="edit-user-fields">
        <input
          name="newPassword"
          onChange={changeHandler}
          value={formData.newPassword}
          type="password"
          placeholder="Nové heslo"
        />
        <input
          name="confirmPassword"
          onChange={changeHandler}
          value={formData.confirmPassword}
          type="password"
          placeholder="Potvrďte nové heslo"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <button onClick={editUser}>Změnit heslo</button>
    </div>
  );
};

export default EditUser;
