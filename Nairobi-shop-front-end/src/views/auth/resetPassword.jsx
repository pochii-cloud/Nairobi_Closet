import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { validateForm } from "../../utils/helper";
import { useParams } from "react-router-dom";
import authService from "../../services/authService";
import "./ResetPassword.css"; // Import the CSS file for styling

const ResetPassword = () => {
  const { userId, token } = useParams(); // Extract the userId and token from the URL parameters

  const [state, setState] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { newPassword, confirmPassword } = state;
  
    const err = {
      newPassword: newPassword ? "" : "New Password field is required",
      confirmPassword: confirmPassword ? "" : "Confirm Password field is required"
    };
  
    if (!newPassword || !confirmPassword) {
      setErrors({ ...err });
      return;
    }
  
    if (newPassword.length < 6) {
      err.newPassword = "New Password must be at least 6 characters.";
      setErrors({ ...err });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      err.confirmPassword = "Passwords do not match.";
      setErrors({ ...err });
      return;
    }
  
    try {
      const response = await authService.resetPassword(
        {
          password: newPassword,
          confirmPassword: confirmPassword
        },
        userId,
        token
      );

      
  
      toast.success("Password successfully reset", ToastObjects);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong",
        ToastObjects
      );
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h5 className="heading-design-h5">Reset Password</h5>
        <form noValidate onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handleChange}
            />
            {errors.newPassword && (
              <div className="text-danger">{errors.newPassword}</div>
            )}
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </fieldset>
          <fieldset className="form-group">
            <button type="submit" className="btn btn-lg btn-secondary btn-block">
              Reset Password
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
