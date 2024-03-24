import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import $ from "jquery";
import axios from "axios";

function Mfa() {
  // const [rememberMe, setRememberMe] = useState(JSON.parse(localStorage.getItem("rememberMe")));
  // const emailLocal = rememberMe.email;
  const email = sessionStorage.getItem("email");
  console.log(email);
  const [values, setValues] = useState({ mfa: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleResendMfa = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}admin/sendOtp`, {
        email: email,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const CheckMFA = async (e) => {
    e.preventDefault();
    try {
      const spinner =
        '<span class="spinner-border spinner-border-sm"></span> Loading.';
      const btns = $("#submitButton");
      btns.html(spinner);
      btns.attr("disabled", true);

      if (!values.mfa) {
        toast.warning("Please fill mfa code.");
        btns.html("submit");
        btns.attr("disabled", false);
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}admin/verifymfa`,
          { MFA: values.mfa, email: email }
        );
        if (res.status === 200) {
          toast.success(res.data.message, { autoClose: 1000 });
          navigate(
            "/dashboard",
            sessionStorage.setItem("token", JSON.stringify(res?.data?.token)),
            localStorage.setItem("menuItems", "dashboard"),
            localStorage.setItem("menuType", "singleMenuBtn")
          );
        }
      }
    } catch (err) {
      toast.error(err.response.data.message, { autoClose: 1000 });
      const btns = $("#submitButton");
      btns.html("submit");
      btns.attr("disabled", false);
    }
  };

  useEffect(() => {
    document.title = "iSleep: Verify MFA";
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
                  <p className="fs-5 mb-0">
                    Multi-Factor Authentication (MFA) verification
                  </p>
                </div>
                <div className="card-body">
                  <p>
                    Please enter your MFA code received in your registered mail.
                  </p>
                  <form action="index.html">
                    <div class="form-group mb-3">
                      <strong>Enter MFA Code</strong>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon20">
                          <i class="fa fa-key"></i>
                        </span>
                        <input
                          type="number"
                          name="mfa"
                          value={values.mfa}
                          onChange={handleChange}
                          class="form-control email"
                          placeholder="000000"
                          aria-label="email"
                          aria-describedby="basic-addon20"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 px-3 py-2"
                      onClick={CheckMFA}
                    >
                      Verify MFA
                    </button>
                    <div className="text-center mt-3">
                      <span className="helper-text">
                        Resend MFA Code?{" "}
                        <Link
                          onClick={handleResendMfa}
                          className="text-underline"
                        >
                          Click Here
                        </Link>
                      </span>
                      <br />
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

export default Mfa;
