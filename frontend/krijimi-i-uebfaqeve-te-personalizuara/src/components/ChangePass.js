import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { changePassword } from "../api/users";
import "./ChangePass.css";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [error, setErrorMessage] = useState('');
  const [success, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
  
    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccessMessage('Password changed successfully!');
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to change password');
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    navigate('/profile');
  };

  return (
    <div className="change-password-page">
    {error && <div className="alerrt alerrt-danger">{error}</div>}
    {success && <div className="alerrt alerrt-success">{success}</div>}
    <form className="change-password-form" onSubmit={handleSubmit}>
      <h1>Change Password</h1>
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">Submit</button>
        <button type="button" className="btn-reset" onClick={handleReset}>Cancel</button>
      </div>
    </form>
  </div>  
  );
};

export default ChangePasswordPage;
