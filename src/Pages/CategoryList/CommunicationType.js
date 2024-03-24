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
import { toast } from "react-toastify";

function CommunicationType() {
  const [data, setData] = useState([]);
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedType, setEditedType] = useState("");

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditedType(item.Type);
    setOpenModal(true);
  };

  const closeModalBox = () => {
    setOpenModal(false);
  };

  const fetchData = async () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}types?type=communication&category=all`
      )
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      new DataTable("#userList", {});
    }
  }, [loading]);

  const handleChange = (e) => {
    setRow({ [e.target.name]: e.target.value, Active: true });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (row.Type === "") {
      alert("Please fill in the details");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}types?type=communication`, row)
        .then((res) => {
          toast.success(res.data.message, { autoClose: 1000 });
          fetchData();
          setRow({ Type: "" });
        })
        .catch((error) => {});
    }
  };

  const handleDeleteClick = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}types/archive?type=communication`,
        {
          // ...selectedItem,
          id,
        }
      )
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}types?type=communication&category=all`
          )
          .then((res) => {
            // console.log(res.data.data);
            setData(res?.data?.data);
          })
          .catch((error) => {
            // console.log(error);
            toast.error(error.response.data.message);
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  const handleUpdateProvider = () => {
    if (!selectedItem) return;
    axios
      .put(`${process.env.REACT_APP_BASE_URL}types?type=communication`, {
        ...selectedItem,
        Type: editedType,
      })
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        const updatedData = data.map((item) => {
          if (item === selectedItem) {
            return { ...item, Type: editedType };
          }
          return item;
        });
        setData(updatedData);
        setOpenModal(false);
      })
      .catch((error) => {
        console.error(error.response);
        toast.error(error.response.data.message);
      });
  };

  const handleChangeCheck = (a, b) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}types?type=communication`, {
        id: a,
        Active: b,
      })
      .then((res) => {
        // alert(res.data.message);
        if (b === true) {
          toast.success("Activation successful! ", { autoClose: 1000 });
        } else {
          toast.success("Deactivation successful!", { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error.data.message, { autoClose: 1000 });
      });
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
                    Communication Type
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
              <form
                className="form-box"
                id="basic-form"
                method="post"
                novalidate
              >
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h6 className="card-title">Communication Type</h6>
                    </div>
                    
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6 col-md-4">
                          <label className="form-label">
                            Add Communication Type
                          </label>
                          <input
                            type="text"
                            name="Type"
                            value={row.Type}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 mt-3">
                          <button
                            onClick={handleClick}
                            type="submit"
                            className="btn submit-btn"
                          >
                            Add Communication Type
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="row g-2 clearfix row-deck mt-3">
              <div className="col-lg-12 col-md-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>S.No.</th>

                          <th>Communication Type</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length &&
                          data.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.id}
                                    onChange={(e) =>
                                      handleChangeCheck(
                                        e.target.value,
                                        e.target.checked ? true : false
                                      )
                                    }
                                    defaultChecked={item.Active}
                                  />
                                </div>
                              </td>
                              <td className="text-center">{i + 1 || "NA"}</td>
                              <td>{item.Type}</td>
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
                                  onClick={() => handleEditClick(item)}
                                >
                                  <i className="fa fa-pencil"></i>
                                </a>
                                <a
                                  onClick={() => handleDeleteClick(item.id)}
                                  className="btn btn-sm btn-outline-danger"
                                >
                                  <i className="fa fa-trash"></i>
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
          </div>
        </div>
      </div>
      <div
        className={
          openModal === true ? "custom_modal open openModal" : "custom_modal"
        }
      >
        <div class="custom_content-wrapper tw-w-[50%]">
          <button class="custom_close" onClick={closeModalBox}></button>
          <header class="custom_modal-header">
            <h2>Edit Communication Type</h2>
          </header>
          <div className="tw-w-[100%]">
            <div className="col-12">
              <label className="form-label">Edit Communication Type</label>
              <input
                type="text"
                value={editedType}
                onChange={(e) => setEditedType(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>
          <footer class="custom_modal-footer">
            <button class="action" type="submit" onClick={handleUpdateProvider}>
              Accept
            </button>
            <button class="action" onClick={closeModalBox}>
              Decline
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default CommunicationType;
