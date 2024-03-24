import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import axios from "axios";

function AddGroup() {
  const [addUser, setAddUser] = useState([]);
  const [addressess, setAddressess] = useState([
    {
      userAccount: "",
    },
  ]);
  const [address, setAddress] = useState({
    userAccount: "",
  });
  const [row, setRow] = useState({
    GroupName: "",
    Description: "",
  });

    // User Account
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
        .then((res) => {
          console.log("USER>>",res.data.data);
          setAddUser(res?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  const handleExpand = (e) => {
    e.preventDefault();
    setAddressess((prev) => [...prev, address]);
  };

  const handleGroup = (e) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "GroupName") {
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

  const handleAddress = (e, i) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const isAlphabetic = /^[A-Za-z\s]+$/;

    const updatedAddresses = addressess.map((address, index) => {
      if (index === i) {
        if (name === "SubscriptionTemplate") {
          if (isAlphabetic.test(value) || value === "") {
            const newValue = capitalizeFirstLetter(value);
            return {
              ...address,
              [name]: newValue,
            };
          }
        } else {
          return {
            ...address,
            [name]: value,
          };
        }
      }
      return address;
    });

    setAddressess(updatedAddresses);
  };

  const handlePostGroup = (e) => {
    e.preventDefault();
    const list = addressess.map((item, i) => ({
      ...item,
    }));
    if (row.GroupName.trim() === "") {
      alert("Please fill Group Name fields.");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}subscription/addGroup`, {
          list,
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

  const handleServiceRemove = (index) => {
    const list = [...addressess];
    list.splice(index, 1);
    setAddressess(list);
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
                    Create Group
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
            <form className="form-box" id="basic-form"  novalidate>
              <div className="col-12">
       
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title">Group information</h6>
                    </div>
                    <div className="card-body">
                      <div className='row g-3 d-block'>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Group Name<span className='AsteriskSymbol'>*</span></label>
                          <input type="text" 
                           name="GroupName"
                        value={row.GroupName}
                        onChange={handleGroup}
                          className="form-control" required />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">General Description</label>
                          <textarea
                           name="Description"
                        value={row.Description}
                        onChange={handleGroup}
                           rows={4} type="email" className="form-control" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="card-title">Select Users</h6>
                    </div>
                    <div className="card-body">
                      <div className='row g-3 '>
                   {addressess.map((item, i) => (
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">User Account</label>
                          <select 
                           name="userAccount"
                          value={addressess[i].userAccount}
                          onChange={(e) => handleAddress(e, i)}
                          className="form-select select2">
                            <option selected >Open this select menu</option>
                            {addUser?.map((item, ij) => {
                            return (
                              <option key={ij} value={item.id}>
                                {item.id + "." + " " + item.FirstName + " " + item.LastName}
                              </option>
                            );
                          })}
                          </select>
                        </div>
                  ))}
                      </div>
                      <div className="col-12 mt-2 tw-flex tw-justify-end">
                      {  <button onClick={(e) => handleExpand(e)}
 className="btn btn-primary">+ Add More</button>}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-4 tw-flex tw-justify-end">
                    <button type="submit"   onClick={handlePostGroup}
 className="btn btn-primary">Submit</button>
                  </div>
                  </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGroup;
