import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import $ from "jquery";
import axios from "axios";

function ChangePsw() {
  const adminID = sessionStorage.getItem("adminID");
  const navigate = useNavigate();
  const [change, setChange] = useState({
    Password: "",
    ConfirmPassword: "",
    OTP: "",
  });

  const handlePassword = (e) => {
    setChange({ ...change, [e.target.name]: e.target.value });
  };

  const handleUpdatePass = () => {
    const spinner =
      '<span class="spinner-border spinner-border-sm"></span> Loading.';
    const btns = $("#submitButton");

    btns.html(spinner);
    btns.attr("disabled", true);

    if (change.Password !== change.ConfirmPassword) {
      toast.error("Passwords do not match", { autoClose: 1000 });
      btns.html("submit");
      btns.attr("disabled", false);
    } else if (
      change.Password === "" ||
      change.ConfirmPassword === "" ||
      change.OTP === ""
    ) {
      toast.error("Please Fill All Fields", { autoClose: 1000 });
      btns.html("submit");
      btns.attr("disabled", false);
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}admin/updatePassword`, {
          ...change,
          email: adminID,
        })
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.message, { autoClose: 1000 });
          navigate("/");
        })
        .catch((error) => {
          // console.log(error);
          btns.html("submit");
          btns.attr("disabled", false);
          toast.error(error.response.data.message, { autoClose: 1000 });
        });
    }
  };

  useEffect(() => {
    document.title = "isleep: Change Password";
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
                  <p className="fs-5 mb-0">Change Password</p>
                </div>
                <div className="card-body">
                  <form>
                    <div class="form-group">
                      <strong>Password</strong>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon21">
                          <i class="fa fa-key"></i>
                        </span>
                        <input
                          type="password"
                          name="Password"
                          value={change.Password}
                          onChange={handlePassword}
                          class="form-control key"
                          placeholder="password"
                          aria-label="key"
                          aria-describedby="basic-addon21"
                        />
                      </div>
                    </div>
                    <div class="form-group mt-3">
                      <strong>Password</strong>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon21">
                          <i class="fa fa-key"></i>
                        </span>
                        <input
                          type="password"
                          name="ConfirmPassword"
                          value={change.ConfirmPassword}
                          onChange={handlePassword}
                          class="form-control key"
                          placeholder="Confirm Password"
                          aria-label="key"
                          aria-describedby="basic-addon21"
                        />
                      </div>
                    </div>
                    <div class="form-group mt-3">
                      <strong>Verify OTP</strong>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon21">
                          <i class="fa fa-key"></i>
                        </span>
                        <input
                          type="number"
                          name="OTP"
                          value={change.OTP}
                          onChange={handlePassword}
                          class="form-control key"
                          placeholder="OTP"
                          aria-label="key"
                          aria-describedby="basic-addon21"
                        />
                      </div>
                    </div>
                    <div className="my-3">
                      <button
                        type="button"
                        onClick={handleUpdatePass}
                        className="btn btn-primary w-100 px-3 py-2 mb-2"
                      >
                        Change Password
                      </button>
                      <span>
                        Already have an account? <Link to={"/"}>Login</Link>
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

export default ChangePsw;
