import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import "select2/dist/css/select2.min.css";
import $ from "jquery";
import Select2 from "select2";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddUser() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [sexData, setSexData] = useState();
  const [data, setData] = useState();
  const [role, setRole] = useState([]);

  const handleChange = (date) => {
    setSelectedDate(date);
  };
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year}`;

    return formattedDate;
  };
  // User Role Name
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userrole`)
      .then((res) => {
        // console.log(res.data.data);
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [row, setRow] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    SexType: "",
    DOB: { selectedDate },
    PhoneNumber: "",
    E_mail: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    County: "",
    ZipCode: "",
    Country: "",
    SystemLogin: "",
    LinkedAccount: "",
    CreatePassword: "",
  });
  // Sex Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=sex`)
      .then((res) => {
        setSexData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Add More Role
  const addmoreRole = () => {
    setRole([...role, { service: role }]);
  };
  const handleChangePost = (e) => {
    const { name, value } = e.target;
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "FirstName" || name === "MiddleName" || name === "LastName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setRow({
          ...row,
          [name]: capitalizeFirstLetter(value),
        });
      } else {
        toast.warning("Accept Only Alphabet ", { autoClose: 1000 });
      }
    } else if (name === "NPINumber") {
      if (/^[0-9]+$/.test(value) || value === "") {
        setRow({ ...row, [name]: value });
      } else {
        toast.warning("Accept Only Number", { autoClose: 1000 });
      }
    } else {
      setRow({ ...row, [name]: value });
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "E_mail") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "") {
        toast.warning("Please enter a valid email address.", {
          autoClose: 1000,
        });
      } else {
        setRow({
          ...row,
          [name]: value,
        });
      }
    }
  };
  const handleRole = (e, index) => {
    const NewRole = [...role];
    NewRole[index].service = e.target.value;
    setRole(NewRole);
  };
  const handleLinkAccountKeyPress = async (e) => {
    const linkAccountValue = e.target.value;

    if (linkAccountValue.trim() !== "") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}users/getProvider?LinkedProviderId=${linkAccountValue}`
        );
        const searchData = response.data.data;
        const filteredDataUser = searchData?.ProviderAddresses?.filter(
          (user) => {
            return user?.Primary === true;
          }
        );
        const objMain = {
          FirstName: searchData?.FirstName,
          MiddleName: searchData?.MiddleName,
          LastName: searchData?.LastName,
          SexType: searchData?.SexType,
          DOB: searchData?.DOB,
          PhoneNumber: filteredDataUser[0]?.PhoneNumber,
          E_mail: filteredDataUser[0]?.Email,
          AddressLine1: filteredDataUser[0]?.AddressLine1,
          AddressLine2: filteredDataUser[0]?.AddressLine2,
          City: filteredDataUser[0]?.City,
          State: filteredDataUser[0]?.State,
          County: filteredDataUser[0]?.County,
          ZipCode: filteredDataUser[0]?.ZipCode,
          Country: filteredDataUser[0]?.Country,
          SexType: searchData?.SexTypeId,
        };
        setRow((prevRow) => ({ ...prevRow, ...objMain }));
        setSelectedDate(new Date(searchData.DOB));
      } catch (error) {
        console.error("Error fetching linked account data:", error);
      }
    }
  };
  
  const handleUpdate = (e) => {
    e.preventDefault();
    const newUserData = role.map((item, i) => {
      return { ...item };
    });
    if (
      row.FirstName === "" ||
      row.DOB === "" ||
      row.SystemLogin === "" ||
      row.ZipCode === "" ||
      row.State === "" ||
      row.County === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the required details.",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to update the user information.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${process.env.REACT_APP_BASE_URL}users`, {
              newUserData,
              ...row,
              DOB: formatDate(selectedDate),
            })
            .then((res) => {
              Swal.fire({
                title: "Success!",
                text: res.data.message,
                icon: "success",
              });
              setRow({
                FirstName: "",
                MiddleName: "",
                LastName: "",
                SexType: "",
                DOB: { selectedDate },
                PhoneNumber: "",
                E_mail: "",
                AddressLine1: "",
                AddressLine2: "",
                City: "",
                State: "",
                County: "",
                ZipCode: "",
                Country: "",
                SystemLogin: "",
                LinkedAccount: "",
                CreatePassword: "",
              });
              setRole([{ service: "" }]);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "User information update has been cancelled.",
            icon: "error",
          });
        }
      });
    }
  };
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...role];
    list[index][name] = value;
    setRole(list);
  };
  const handleDelete = (i) => {
    if (i !== 0) {
      const newArr = role.filter((item, index) => index !== i);
      setRole(newArr);
    }
  };

  return (
    <div id="layout" className="">
      <Preloader />
      <div id="wrapper">
        <TopBar />
        <SideBar />
        <div id="main-content">
          <div className="container-fluid">
            <div className="block-header py-lg-4 py-3">
              <div className="row g-3">
                <div className="col-md-6 col-sm-12">
                  <h2 className="m-0 fs-5">
                    <ToggleNavBar />
                    Add User Account
                  </h2>
                  <ul className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">sLEAP</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
                <div className="col-md-6 col-sm-12 text-md-end">
                  <div className="d-inline-flex text-start">
                    <div className="me-2">
                      <h6 className="mb-0">
                        <i className="fa fa-user"></i> 405
                      </h6>
                      <small>Users</small>
                    </div>
                    <span id="bh_visitors"></span>
                  </div>
                  <div className="d-inline-flex text-start ms-lg-3 me-lg-3 ms-1 me-1">
                    <div className="me-2">
                      <h6 className="mb-0">
                        <i className="fa fa-globe"></i> 83
                      </h6>
                      <small>Providers</small>
                    </div>
                    <span id="bh_visits"></span>
                  </div>
                  <div className="d-inline-flex text-start">
                    <div className="me-2">
                      <h6 className="mb-0">
                        <i className="fa fa-comments"></i> 7
                      </h6>
                      <small>New Request</small>
                    </div>
                    <span id="bh_chats"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-2 clearfix row-deck">
              <div className="col-12">
                <form className="form-box" id="basic-form" onSubmit={handleUpdate}>
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h6 className="card-title">Demographic information</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 ">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            First Name<span className="AsteriskSymbol">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="FirstName"
                            value={row.FirstName}
                            onChange={handleChangePost}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Middle Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="MiddleName"
                            value={row.MiddleName}
                            onChange={handleChangePost}
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="LastName"
                            value={row.LastName}
                            onChange={handleChangePost}
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Choose Gender</label>
                          <select
                            className="form-select"
                            name="SexType"
                            value={row.SexType}
                            onChange={handleChangePost}
                          >
                            <option>Select</option>
                            {sexData?.map((item, iT) => {
                              return (
                                <option key={iT} value={item?.id}>
                                  {item?.Type}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            Date of Birth
                            <span className="AsteriskSymbol">*</span>
                          </label>
                          <div class="input-group">
                            <span class="input-group-text" id="basic-addon11">
                              <i class="fa fa-calendar"></i>
                            </span>
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleChange}
                              dateFormat="MM-dd-yyyy"
                              placeholderText="MM-DD-YYYY"
                              maxDate={new Date()}
                              yearDropdown
                              showYearDropdown
                              scrollableYearDropdown
                              class="form-control date"
                              aria-label="date"
                              aria-describedby="basic-addon11"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Phone Number<span className="AsteriskSymbol">*</span></label>
                          <div class="input-group">
                            <span class="input-group-text" id="basic-addon16">
                              <i class="fa fa-phone"></i>
                            </span>
                            <input
                            required
                              type="number"
                              name="PhoneNumber"
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                              onInput={(e) => {
                                if (e.target.value.length > 10) {
                                  e.target.value = e.target.value.slice(0, 10);
                                }
                              }}
                              onChange={handleChangePost}
                              max={9999999999}
                              min={10000000}
                              value={row.PhoneNumber}
                              class="form-control phone-number"
                              placeholder="Phone Number"
                              aria-label="phone-number"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">E-mail<span className="AsteriskSymbol">*</span></label>
                          <div class="input-group">
                            <span class="input-group-text" id="basic-addon20">
                              <i class="fa fa-envelope-o"></i>
                            </span>
                            <input
                              class="form-control email"
                              placeholder="Ex: example@example.com"
                              required
                              aria-label="email"
                              aria-describedby="basic-addon20"
                              type="email"
                              name="E_mail"
                              defaultValue={row.E_mail}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="card-title">Contact information</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 ">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Address Line 1</label>
                          <input
                            type="text"
                            className="form-control"
                            name="AddressLine1"
                            value={row.AddressLine1}
                            onChange={handleChangePost}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Address Line 2</label>
                          <input
                            className="form-control"
                            type="text"
                            name="AddressLine2"
                            value={row.AddressLine2}
                            onChange={handleChangePost}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            name="City"
                            value={row.City}
                            onChange={handleChangePost}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            name="State"
                            onChange={handleChangePost}
                            value={row.State}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">County</label>
                          <input
                            type="text"
                            name="County"
                            value={row.County}
                            onChange={handleChangePost}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Zip Code</label>
                          <input
                            type="number"
                            name="ZipCode"
                            value={row.ZipCode}
                            onChange={handleChangePost}
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                            max={99999999}
                            min={10000}
                            onInput={(e) => {
                              if (e.target.value.length > 8) {
                                e.target.value = e.target.value.slice(0, 8);
                              }
                            }}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Country</label>
                          <input
                            type="text"
                            name="Country"
                            value={row.Country}
                            onChange={handleChangePost}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header ">
                      <h6 className="card-title">User Security</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 ">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">System Login</label>
                          <input
                            type="text"
                            className="form-control"
                            name="SystemLogin"
                            value={row.SystemLogin}
                            onChange={handleChangePost}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Linked Account</label>
                          <input
                            className="form-control"
                            type="text"
                            name="LinkedAccount"
                            value={row.LinkedAccount}
                            onChange={handleChangePost}
                            onKeyUp={handleLinkAccountKeyPress}
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Create Password</label>
                          <input
                            type="text"
                            name="CreatePassword"
                            value={row.CreatePassword}
                            onChange={handleChangePost}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="card-title">User Role</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 ">
                      {role.map((singleService, index) => (
                        <div className="col-sm-5 col-md-5 col-lg-4 d-flex" key={index}>
                          <label className="form-label mt-1">Role:</label>
                          &nbsp; <select
                            className="form-select"
                            value={singleService.service}
                            onChange={(e) => handleServiceChange(e, index)}
                            required
                            name="service"
                          >
                            <option>Select</option>
                            {data?.map((item, idrfg) => {
                              return (
                                <option key={idrfg} value={item.id}>
                                  {item.UserRoleName}
                                </option>
                              );
                            })}
                          </select>
                          <span>
                            <button
                              type="button"
                              onClick={() => handleDelete(index)}
                              className="closemoreAddress tw-mt-[1px]"
                            >
                            X
                            </button>
                            </span>
                        </div>
                      ))}                      
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4 text-end">
                    <button
                      type="button"
                      className="btn add-more-btn d-inline "
                      onClick={addmoreRole}
                    >
                      Add More Role
                    </button>
                    <button
                      type="submit"
                      className="btn submit-btn d-inline ms-3 "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
