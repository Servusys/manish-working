import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import axios from "axios";

function CreateSubscription() {
  const [templates, setTemplates] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [category, setCategory] = useState("user");
  const [addressess, setAddressess] = useState([
    {
      SubscriptionTemplate: "",
      GroupAccount: "",
      type: category,
    },
  ]);

  const [address, setAddress] = useState({
    SubscriptionTemplate: "",
    GroupAccount: "",
    type: category,
  });

  const [row, setRow] = useState({
    SubscriptionName: "",
    DefaultEmail: "",
    Description: "",
    EmailMessage: "",
    Daily: "",
    Weekly: "",
    Monthly: "",
    Quarterly: "",
    BiAnnually: "",
    Annually: "",
    schedule: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userRole/template`)
      .then((res) => {
        console.log(res.data.data);
        setTemplates(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleExpand = (e) => {
    e.preventDefault()
    const newAddress = {
      SubscriptionTemplate: "",
      GroupAccount: "",
      type: category,
    };
    setAddressess((prev) => [...prev, newAddress]);
  };

  const handleDelete = (i) => {
    const list = [...addressess];
    list.splice(i, 1);
    setAddressess(list);
  };

  const handleChangePost = (e) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "SubscriptionName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setRow({
          ...row,
          [name]: capitalizeFirstLetter(value),
        });
      }
    } else {
      setRow({ ...row, [name]: value });
    }
  };

  const handleAddress = (e, i, cate) => {
    const { name, value } = e.target;
    if (name == "GroupAccount") {
      addressess[i] = {
        ...addressess[i],
        GroupAccount: value,
        type: cate,
      };
    } else {
      addressess[i] = {
        ...addressess[i],
        [name]: value,
      };
    }
    setAddressess([...addressess]);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "DefaultEmail") {
      // Check if the value matches the email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "") {
        alert("Please enter a valid email address.");
      }
    }
  };

  const handleSubscription = (e) => {
    e.preventDefault()
    const newData = addressess?.map((item, i) => ({
      ...item,
    }));
    console.log("first", { newData, ...row });
    if (row.SubscriptionName.trim() === "" || row.DefaultEmail.trim() === "") {
      alert("Please fill in all the required fields in the form.");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}subscription`, {
          newData,
          ...row,
        })
        .then((res) => {
          console.log(res.data.data);
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  };

  const handleUserAccount = (value, i) => {
    setCategory(value);
    addressess[i] = { ...addressess[i], type: value, GroupAccount: "" };
    setAddressess([...addressess]);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
      .then((res) => {
        // console.log("UserAccount>>", res.data.data);
        const selectValue = res?.data?.data;
        setDataUser(selectValue);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}subscription/getGroup`)
      .then((res) => {
        // console.log("GroupAccount>>", res.data.message);
        setDataGroup(res?.data?.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                    Create Subscription
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
                <form
                  className="form-box"
                  id="basic-form"
                  // method="post"
                  novalidate
                >
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title">Subscription Information</h6>
                    </div>
                    <div className="d-flex py-1 px-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-9">
                            <div className="row g-3">
                              <div className="col-sm-6">
                                <label className="form-label">
                                  Name of Subscription
                                  <span className="AsteriskSymbol">*</span>
                                </label>
                                <input
                                
                        name="SubscriptionName"
                        value={row.SubscriptionName}
                        onChange={handleChangePost}
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6">
                                <label className="form-label">
                                  Default Sender E-mail *
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  // required
                                  name="DefaultEmail"
                                  value={row.DefaultEmail||''}
                        onBlur={handleBlur}
                        onChange={handleChangePost}
                                />
                              </div>
                              <div className="col-sm-6">
                                <label className="form-label">
                                  General Description
                                </label>
                                <textarea
                                
                        name="Description"
                        value={row.Description}
                        onChange={handleChangePost}
                                  type="text"
                                  rows={4}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6">
                                <label className="form-label">
                                  E-mail Message
                                </label>
                                <textarea
                                 type="text"
                        name="EmailMessage"
                        value={row.EmailMessage}
                        onChange={handleChangePost}
                                  
                                  rows={4}
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="col-12">
                              <label className="form-label">Schedule *</label>
                              <div className="form-check form-switch">
                                <input
                                 name="schedule"
                          value="Daily"
                          onChange={handleChangePost}
                          defaultChecked={row.Daily === true}
                                  className="form-check-input"
                                  type="radio"
                                  // name="shared"
                                  id="notShared"
                                  // value={false}
                                  // defaultChecked
                                />
                                <label className="form-check-label">
                                  Daily
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="schedule"
                          value="Weekly"
                          onChange={handleChangePost}
                          defaultChecked={row.Weekly === true}
                                />
                                <label className="form-check-label">
                                  Weekly
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="schedule"
                          value="Monthly"
                          onChange={handleChangePost}
                          defaultChecked={row.Monthly === true}
                                />
                                <label className="form-check-label">
                                  Monthly
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="schedule"
                          value="Quarterly"
                          onChange={handleChangePost}
                          defaultChecked={row.Quarterly === true}

                                />
                                <label className="form-check-label">
                                  Quarterly
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="schedule"
                          value="BiAnnually"
                          onChange={handleChangePost}
                          defaultChecked={row.BiAnnually === true}
                                />
                                <label className="form-check-label">
                                  Bi Annually
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="schedule"
                          value="Annually"
                          onChange={handleChangePost}
                          defaultChecked={row.Annually === true}
                                />
                                <label className="form-check-label">
                                  Annually
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  {addressess?.map((item, i) => (
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="card-title">Subscription Security</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-sm-6 col-md-5 col-lg-5">
                          <label className="form-label">Template Name</label>
                          <select className="form-select select2 mt-1"
                           name="SubscriptionTemplate"
                            value={addressess[i].SubscriptionTemplate}
                          onChange={(e) => handleAddress(e, i)}
                          >
                            <option selected disabled>
                              Open this select menu
                            </option>
                            {templates?.map((item, i) => {
                            return (
                              <option key={i} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-5 col-lg-5">
                          <div className="d-flex tw-gap-x-4">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`AccountType_${i}`}
                            onChange={() => handleUserAccount("user", i)}
                            checked={addressess[i].type === "user"}
                                // value={false}
                                // defaultChecked
                              />
                              <label className="form-check-label">
                                User Account
                              </label>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`AccountType_${i}`}
                            onChange={() => handleUserAccount("group", i)}
                            checked={addressess[i].type === "group"}
                              />
                              <label className="form-check-label">
                                Group Account
                              </label>
                            </div>
                          </div>
                          <select  name="GroupAccount"
                          value={addressess[i].GroupAccount}
                          onChange={(e) => handleAddress(e, i, category)}
                           className="form-select select2">
                            <option selected disabled>
                              Open this select menu
                            </option>
                            {addressess[i].type === "user" && (
                            <>
                              {dataUser?.map((item, ij) => {
                                return (
                                  <option key={ij} value={item.id}>
                                    {item.id +
                                      "." +
                                      " " +
                                      item.FirstName +
                                      " " +
                                      item.LastName}
                                  </option>
                                );
                              })}
                            </>
                          )}
                          {addressess[i].type === "group" && (
                            <>
                              {dataGroup?.map((item, ijk) => {
                                return (
                                  <option key={ijk} value={item.id}>
                                    {item.id + "." + " " + item.GroupName}
                                  </option>
                                );
                              })}
                            </>
                          )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 tw-flex mb-3 px-3 tw-gap-x-2">
                      {addressess?.length-i&&(<span  onClick={(e) => handleExpand(e)} className="btn btn-primary">
                        + Add More
                      </span>)}
                     {addressess?.length>1&& <span onClick={() => handleDelete(i)} className="btn btn-primary">
                        Remove
                      </span>}
                    </div>
                  </div>))}
                  <div className="col-12 mt-4 tw-flex tw-justify-end">
                    <button onClick={(e) => handleSubscription(e)} type="submit" className="btn btn-primary">
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

export default CreateSubscription;
