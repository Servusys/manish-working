import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import $ from "jquery";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "sleap: Login";
    // Check localStorage for rememberMe data
    const rememberMeData = localStorage.getItem("rememberMe");
    if (rememberMeData) {
      const { email, remember } = JSON.parse(rememberMeData);
      setValues((prevValues) => ({ ...prevValues, email }));
      setRememberMe(remember);
    }
  }, []);

  const handleLoginData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const spinner =
        '<span class="spinner-border spinner-border-sm"></span> Loading.';
      const btns = $("#submitButton");
      btns.html(spinner);
      btns.attr("disabled", true);

      if (values.email === "" || values.password === "") {
        toast.warning("Please fill all fields.");
        btns.html("Submit");
        btns.attr("disabled", false);
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}admin/login`,
          values
        );
        if (res.status === 200) {
          toast.success(res.data.message, { autoClose: 1000 });
          navigate("/mfa", sessionStorage.setItem("email", values.email));
          if (rememberMe) {
            localStorage.setItem(
              "rememberMe",
              JSON.stringify({ email: values.email, remember: rememberMe })
            );
          } else {
            localStorage.removeItem("rememberMe");
          }
          navigate("/mfa");
        }
      }
    } catch (err) {
      toast.error(err.response.data, { autoClose: 1000 });
      const btns = $("#submitButton");
      btns.html("Submit");
      btns.attr("disabled", false);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLoginChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div id="layout" className="theme-cyan">
        <div id="wrapper">
          <div className="d-flex h100vh align-items-center auth-main w-100">
            <div className="auth-box">
              <div className="top mb-2">
                <div
                  className="logo"
                  style={{ padding: "0 8px", background: "#fff" }}
                >
                  <img src="logo.png" alt="iSleep" className="img-fluid" />
                </div>
              </div>
              <div className="card shadow p-lg-4">
                <div className="card-header">
                  <p className="fs-5 mb-0">Login to your account</p>
                </div>
                <div className="card-body">
                  <form action="index.html">
                    <div className="form-group">
                      <strong>Login ID</strong>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon20">
                          <i className="fa fa-envelope-o"></i>
                        </span>
                        <input
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleLoginChange}
                          className="form-control email"
                          placeholder="example@example"
                          aria-label="email"
                          aria-describedby="basic-addon20"
                        />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <strong>Password</strong>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon21">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                          name="password"
                          value={values.password}
                          onChange={handleLoginChange}
                          className="form-control key"
                          placeholder="Password"
                          aria-label="key"
                          aria-describedby="basic-addon21"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility} // Toggle password visibility on click
                        >
                          {showPassword ? (
                            <i className="fa fa-eye-slash"></i>
                          ) : (
                            <i className="fa fa-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="form-check my-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        id="rememberMeCheckbox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberMeCheckbox"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="submit"
                      id="submitButton"
                      onClick={(e) => handleLoginData(e)}
                      className="btn btn-primary w-100 px-3 py-2"
                    >
                      LOGIN
                    </button>
                  </form>
                  <div className="mt-3 pt-3 border-top">
                    <p className="mb-1">
                      <Link to={"forgot-password"}>
                        <i className="fa fa-lock me-2"></i>Forgot password?
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
