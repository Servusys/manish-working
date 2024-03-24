import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPsw() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Check if the value matches the email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "") {
        toast.warning("Please enter a valid email address.", {
          autoClose: 1000,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === "") {
      toast.error("Please enter required field.", { autoClose: 1000 });
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}admin/sendotp`, {
          ...values,
        })
        .then((res) => {
          toast.success(res.data.message, { autoClose: 1000 });
          navigate("/change-password");
          setValues({ email: "" });
          sessionStorage.setItem("adminID", values.email);
        })
        .catch((error) => {
          toast.error(error.response.data.message, { autoClose: 1000 });
        });
    }
  };

  useEffect(() => {
    document.title = "isleep: Forgot Password";
  }, []);

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
                  <p className="fs-5 mb-0">Forgot password</p>
                </div>
                <div className="card-body">
                  <p>
                    Please enter your email address below to receive
                    instructions for resetting password.
                  </p>
                  <form action="index.html">
                    <div class="form-group mb-3">
                      <strong>Email Address</strong>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon20">
                          <i class="fa fa-envelope-o"></i>
                        </span>
                        <input
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="form-control email"
                          placeholder="example@example.com"
                          aria-label="email"
                          aria-describedby="basic-addon20"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-primary w-100 px-3 py-2"
                    >
                      RESET PASSWORD
                    </button>
                    <div className="text-center mt-3">
                      <span className="helper-text">
                        Know your password? <Link to={"/"}>Login</Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPsw;
