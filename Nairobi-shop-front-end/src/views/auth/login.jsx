import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { emailIsValid } from "../../utils/helper";
import authServices from "../../services/authService";
import { useDispatch } from "react-redux";
import Register from "./register";

function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    recoverCode: "",
    newPassword: "",
    confirmPassword: "",
    recoverCodeSent: false,
    passwordReset: false,
    panel: "user",
  });
  const [submitting, setSubmitting] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [recoverCodeSent, setRecoverCodeSent] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    const { email } = state;
    if (!email) {
      toast.error("Email address is required.", ToastObjects);
      return;
    }
    if (!emailIsValid(email)) {
      toast.error("Email address is invalid.", ToastObjects);
      return;
    }

    try {
      const res = await authServices.forgotPassword({ email });
      // Handle the response as needed
      setRecoverCodeSent(true);
      toast.success(
        "Recovery email has been sent to your email.",
        ToastObjects
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong", ToastObjects);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const { code, newPassword, confirmPassword } = state;
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", ToastObjects);
      return;
    }

    try {
      const res = await authServices.resetPassword({ code, newPassword });
      // Handle the response as needed
      setPasswordReset(true);
    } catch (error) {
      toast.error(error.message || "Something went wrong", ToastObjects);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (!email) {
      toast.error("Email address is required.", ToastObjects);
      return;
    }
    if (!password) {
      toast.error("Password is required.", ToastObjects);
      return;
    }
    if (!emailIsValid(email)) {
      toast.error("Email address is invalid.", ToastObjects);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must have at least 6 characters.", ToastObjects);
      return;
    }

    try {
      let res = await authServices.loginUser({ ...state }, dispatch);
      if (res && res.status) {
        window.location.href = "/";
        toast.success("User successfully logged in", ToastObjects);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", ToastObjects);
    }
  };

  return (
    <div>
      <div className="modal fade login-modal-main" id="bd-example-modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="loginmodal-right">
{/* Tab panes */}
<div className="tab-content">
<div className="tab-pane active" id="login" role="tabpanel">
{forgotPassword ? (
// Forgot Password Form
<form noValidate onSubmit={handleRecoverPassword}>
<h5 className="heading-design-h5">Recover Password</h5>
<fieldset className="form-group">
<label>Enter Email Address</label>
<input
                         type="email"
                         className="form-control"
                         name="email"
                         value={state.email}
                         onChange={handleChange}
                         placeholder="Enter Email Address"
                       />
</fieldset>
<fieldset className="form-group">
<button
                         type="submit"
                         className="btn btn-lg btn-secondary btn-block"
                       >
Recover password
</button>
</fieldset>
</form>
) : (
<form noValidate onSubmit={handleSubmit}>
<h5 className="heading-design-h5">
Login to your account
</h5>
<fieldset className="form-group">
<label>Enter Email Address</label>
<input
                         type="email"
                         className="form-control"
                         name="email"
                         value={state.email}
                         onChange={handleChange}
                         placeholder="Enter Email Address"
                       />
</fieldset>
<fieldset className="form-group">
<label>Enter Password</label>
<input
                         type="password"
                         className="form-control"
                         name="password"
                         placeholder="******"
                         onChange={handleChange}
                         value={state.password}
                       />
</fieldset>
<fieldset className="form-group">
<button
                         type="submit"
                         className="btn btn-lg btn-secondary btn-block"
                       >
Login to your account
</button>
</fieldset>
<p className="forgot">
<p
                         onClick={handleForgotPassword}
                         className="link"
                       >
Forgot Password?
</p>
</p>
</form>
)}
</div>
<div className="tab-pane" id="register" role="tabpanel">
<Register />
</div>
</div>
<div className="clearfix" />
<div className="text-center login-footer-tab">
<ul className="nav nav-tabs" role="tablist">

<li className="nav-item">
<a
className={`nav-link ${ !forgotPassword && !recoverCodeSent ? "active" : "" }`}data-toggle="tab"
href="#login"
role="tab"
>
<i className="mdi mdi-lock" /> LOGIN
</a>
</li>
<li className="nav-item">
<a
className={`nav-link ${ forgotPassword || recoverCodeSent ? "active" : "" }`}
data-toggle="tab"href="#register"
role="tab"
>
<i className="mdi mdi-pencil" /> REGISTER
</a>
</li>
</ul>
</div>
<div className="clearfix" />
</div>
</div>
</div>
</div>
</div>
</div>
);
}

export default Login;
