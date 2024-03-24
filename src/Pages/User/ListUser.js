import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import DataTable from "datatables.net-dt";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function ListUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState();
  const [sexData, setSexData] = useState();
  const [Demographic, setDemographic] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Sex_Type: "",
    SexTypeId: "",
    DOB: "",
    PhoneNumber: "",
    E_Mail: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    County: "",
    ZipCode: "",
    Country: "",
    SystemLogin: "",
    roleData: [],
    LinkedAccount: "",
  });
  const [roleData, setRoleData] = useState();
  const [roleD, setRoleD] = useState();
  const [role, setRole] = useState([]);

  // User Role Name
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userrole`)
      .then((res) => {
        // console.log(res.data.data);
        setRoleD(res?.data?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const addmoreRole = () => {
    setRole([...role, { service: role }]);
  };

  const closeModalBox = () => {
    setDemographic({
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Sex_Type: "",
      SexTypeId: "",
      DOB: "",
      PhoneNumber: "",
      E_Mail: "",
      AddressLine1: "",
      AddressLine2: "",
      City: "",
      State: "",
      County: "",
      ZipCode: "",
      Country: "",
      SystemLogin: "",
      roleData: [],
      LinkedAccount: "",
    })
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
        .then(function (res) {
          console.log(res?.data?.data);
          setData(res?.data?.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      new DataTable("#userList", {});
    }
  }, [loading]);

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

  const handleEditClick = async (id) => {
    try {
      setOpenModal(false);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}users?stage=byId&id=${id}`
      );
      // console.log("DEMODATA", response.data);
      const userAccountData = response?.data?.message;
      setDemographic(userAccountData);
      setRoleData(userAccountData.userRoles);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "FirstName" || name === "MiddleName" || name === "LastName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setDemographic({
          ...Demographic,
          [name]: capitalizeFirstLetter(value),
        });
      }
    } else if (
      name === "City" ||
      name === "County" ||
      name === "Country" ||
      name === "State"
    ) {
      if (/^[A-Za-z\s]+$/u.test(value) || value === "") {
        setDemographic({ ...Demographic, [name]: value });
      }
    } else if (name === "E_mail") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === "") {
        setDemographic({ ...Demographic, [name]: value });
      }
    } else if (name === "PhoneNumber" || name === "ZipCode") {
      if (/^[0-9]+$/.test(value) || value === "") {
        setDemographic({ ...Demographic, [name]: value });
      }
    } else if (name === "DOB") {
      setStartDate((date) => {
        const formattedDate = date.toISOString();
        setStartDate(date);
        setDemographic({ ...Demographic, DOB: formattedDate });
      });
      setDemographic({ ...Demographic, [name]: value });
    } else {
      setDemographic({ ...Demographic, [name]: value });
    }
  };

  const handleServiceChange = (e, index) => {
    const { value } = e.target;

    setDemographic((prevDemographic) => {
      return {
        ...prevDemographic,
        userRoles: prevDemographic.userRoles.map((item, i) => {
          if (i === index) {
            return data.find((d) => d.id == value);
          }
          return item;
        }),
      };
    });
  };

  const handleServiceRole = (e, index) => {
    const { name, value } = e.target;
    const list = [...role];
    list[index][name] = value;
    setRole(list);
  };

  const handleFinalUpdate = () => {
    if (
      Demographic?.FirstName === "" ||
      Demographic?.DOB === "" ||
      Demographic?.SystemLogin === "" ||
      Demographic?.ZipCode === "" ||
      Demographic?.AddressLine1 === "" ||
      Demographic?.PhoneNumber === "" ||
      Demographic?.E_Mail === ""
    ) {
      alert("Please fill the Details");
    } else {
      const newUserData = role.map((item, i) => {
        return { ...item };
      });
      axios
        .put(`${process.env.REACT_APP_BASE_URL}users?task=updateUser`, {
          ...Demographic,
          newUserData,
        })
        .then((res) => {
          toast.success(res.data.message);
          setOpenModal(false);
          setRole([{ service: "" }]);
          axios
            .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
            .then((res) => {
              setData(res?.data?.data);
            })
            .catch((error) => {
            });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  const handleDelete = (i) => {
    // if (i !== 0) {
      const newArr = role.filter((item, index) => index !== i);
      setRole(newArr);
    // }
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
                    Edit User Account
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
              <div className="col-lg-12 col-md-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>System Login</th>
                          <th>Linked A/C</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length &&
                          data?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {(item?.FirstName || "NA") +
                                  " " +
                                  item?.MiddleName +
                                  " " +
                                  item?.LastName}
                              </td>
                              <td>{item?.E_Mail}</td>
                              <td>{item?.PhoneNumber}</td>
                              <td>{item?.SystemLogin}</td>
                              <td>{item?.ProviderId}</td>
                              <td>
                              {item.Active === true ? (
                                <span className="badge bg-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge bg-danger">
                                  In-Active
                                </span>
                              )}
                            </td>
                              <td className="table-actions">
                                <a
                                  href="#"
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => handleEditClick(item.id)}
                                >
                                  <i className="fa fa-pencil"></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                openModal === true
                  ? "custom_modal open openModal"
                  : "custom_modal"
              }
            >
              <div class="custom_content-wrapper tw-w-[90%]">
                <button class="custom_close" onClick={closeModalBox}></button>
                <header class="custom_modal-header">
                  <h2>Edit User Account</h2>
                </header>
                <form className="form-box" id="basic-form" method="post">
                  <div className="card">
                    <div className="card-header ">
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
                            value={Demographic?.FirstName}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Middle Name</label>
                          <input
                            type="email"
                            className="form-control"
                            name="MiddleName"
                            value={Demographic?.MiddleName}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="LastName"
                            value={Demographic?.LastName}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Choose Gender</label>
                          <select
                            className="form-select"
                            name="SexTypeId"
                            onChange={(e) => handleChange(e)}
                          >
                            <option>Select</option>
                            {sexData?.map((item, iT) => {
                              return (
                                <option
                                  key={iT}
                                  value={item.id}
                                  selected={
                                    item.id == Demographic.SexTypeId
                                      ? true
                                      : false
                                  }
                                >
                                  {item.Type}
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
                              defaultValue={Demographic.DOB}
                              selected={
                                Demographic?.DOB
                                  ? new Date(Demographic?.DOB)
                                  : null
                              }
                              onChange={(date) => {
                                const formattedDate = date.toISOString();
                                setStartDate(date);
                                setDemographic({
                                  ...Demographic,
                                  DOB: formattedDate,
                                });
                              }}
                              dateFormat="MM-dd-yyyy"
                              placeholderText="MM-DD-YYYY"
                              maxDate={new Date()}
                              yearDropdown
                              showYearDropdown
                              scrollableYearDropdown
                              class="form-control date"
                              aria-label="date"
                              aria-describedby="basic-addon11"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Phone Number</label>
                          <div class="input-group">
                            <span class="input-group-text" id="basic-addon16">
                              <i class="fa fa-phone"></i>
                            </span>
                            <input
                              type="number"
                              name="PhoneNumber"
                              value={Demographic?.PhoneNumber}
                              onChange={(e) => handleChange(e)}
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                              onInput={(e) => {
                                if (e.target.value.length > 10) {
                                  e.target.value = e.target.value.slice(0, 10);
                                }
                              }}
                              max={9999999999}
                              min={10000000}
                              class="form-control phone-number"
                              placeholder="Phone Number"
                              aria-label="phone-number"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">E-mail</label>
                          <div class="input-group">
                            <span class="input-group-text" id="basic-addon20">
                              <i class="fa fa-envelope-o"></i>
                            </span>
                            <input
                              class="form-control email"
                              placeholder="Ex: example@example.com"
                              aria-label="email"
                              aria-describedby="basic-addon20"
                              type="email"
                              name="E_Mail"
                              value={Demographic?.E_Mail}
                              onChange={(e) => handleChange(e)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h6 className="card-title">Contact information</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 ">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Address Line1</label>
                          <input
                            type="text"
                            className="form-control"
                            name="AddressLine1"
                            value={Demographic?.AddressLine1}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Address Line2</label>
                          <input
                            className="form-control"
                            type="text"
                            name="AddressLine2"
                            value={Demographic?.AddressLine2}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            name="City"
                            value={Demographic?.City}
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            name="State"
                            value={Demographic?.State}
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">County</label>
                          <input
                            type="text"
                            name="County"
                            value={Demographic?.County}
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Zip Code</label>
                          <input
                            type="number"
                            name="ZipCode"
                            value={Demographic?.ZipCode}
                            onChange={(e) => handleChange(e)}
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
                            value={Demographic?.Country}
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header d-flex align-items-center justify-content-between">
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
                            value={Demographic?.SystemLogin}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Linked Account</label>
                          <input
                            className="form-control"
                            type="text"
                            name="LinkedAccount"
                            value={Demographic?.ProviderId}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3"></div>
                        <div className="col-sm-6 col-md-4 col-lg-3"></div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            Security Question 1
                          </label>
                          <input
                            type="text"
                            value={
                              Demographic?.QuestionTypes?.[0]?.Type || "NA"
                            }
                            disabled
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            Security Question 2
                          </label>
                          <input
                            type="text"
                            value={
                              Demographic?.QuestionTypes?.[1]?.Type || "NA"
                            }
                            disabled
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            Security Question 3
                          </label>
                          <input
                            type="text"
                            value={
                              Demographic?.QuestionTypes?.[2]?.Type || "NA"
                            }
                            disabled
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3"></div>

                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Answer 1</label>
                          <input
                            type="text"
                            value={
                              Demographic?.QuestionTypes?.[0]?.userQuestion
                                ?.Answer || "NA"
                            }
                            disabled
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Answer 2</label>
                          <input
                            type="text"
                            value={
                              Demographic?.QuestionTypes?.[1]?.userQuestion
                                ?.Answer || "NA"
                            }
                            disabled
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Answer 3</label>
                          <input
                            type="text"
                            value={
                              Demographic?.QuestionTypes?.[2]?.userQuestion
                                ?.Answer || "NA"
                            }
                            disabled
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h6 className="card-title">User Role</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 ">
                        {roleData?.map((items, ixvdd) => {
                          return (
                            <div
                              className="col-sm-6 col-md-4 col-lg-3"
                              key={ixvdd}
                            >
                              <label className="form-label">Role</label>
                              <select
                                className="form-select select2"
                                onChange={(e) => handleServiceChange(e, ixvdd)}
                                required
                                name="service"
                              >
                                <option>Select</option>
                                {roleD?.map((item, idrfg) => {
                                  return (
                                    <option
                                    key={item.UserRoleName + idrfg}
                                    value={item.id}
                                      selected={
                                        item.id == roleData[ixvdd]?.id
                                          ? true
                                          : false
                                      }
                                    >
                                      {item.UserRoleName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          );
                        })}
                      </div>

                      <div className="tw-border-b tw-border-gray-400 mt-3"></div>

                      <div className="row g-3 mt-1">
                      {role.map((singleService, index) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 d-flex" key={index}>
                        <label className="form-label mt-1">Role:</label>
                        &nbsp; <select
                            className="form-select"
                            value={singleService.service}
                            onChange={(e) => handleServiceRole(e, index)}
                            required
                            name="service"
                          >
                            <option>Select</option>
                            {roleD?.map((item, idrfg) => {
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
                </form>
                <footer class="custom_modal-footer">
                  <button
                    type="button"
                    className="btn add-more-btn d-inline "
                    onClick={addmoreRole}
                  >
                    Add More Role
                  </button>
                  <button class="action bg-success" type="submit" onClick={handleFinalUpdate}>
                    Accept
                  </button>
                  <button class="action bg-danger" onClick={closeModalBox}>
                    Decline
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUser;
