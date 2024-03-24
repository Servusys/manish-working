import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import axios from "axios";
import "datatables.net-dt/css/dataTables.dataTables.css";
import DataTable from "datatables.net-dt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function NewRequestProvider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newApprovedData, setNewApprovedData] = useState();
  const [dropData, setDropData] = useState();

  const closeModalBox = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}users?stage=pendingProvider`)
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

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}users?stage=newRequest&UserId=${id}`
      );
      setNewApprovedData(response?.data?.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      new DataTable("#userList", {});
    }
  }, [loading]);

  const handlePostData = (e, id) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}users/addNewprovider`, {
        ...newApprovedData,
      })
      .then((res) => {
        toast.success(res.data.message);
        if (id) {
            const filteredData = dropData.filter(
              (option) => option.value !== id
            );
            setDropData(filteredData);
          }
        setOpenModal(false);
        axios
        .get(`${process.env.REACT_APP_BASE_URL}users?stage=pendingProvider`)
        .then((res) => {
          const fetchedRecords = res?.data?.data || [];
          setData(fetchedRecords);
        })
        .catch((error) => {
          // console.log(error);
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
                    New Provider Rwquest
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
                  <div className="card-body" style={{ overflowX: "scroll" }}>
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>S.No.</th>
                          <th>Provider ID</th>
                          <th>Name</th>
                          <th>NPI No.</th>
                          <th>Phone No.</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length &&
                          data.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1 || "NA"}</td>
                              <td>{item.id}</td>
                              <td>
                                {(item.FirstName || "NA") + " " + item.LastName}
                              </td>
                              <td>{item.NPINumber}</td>
                              <td>{item.PhoneNumber}</td>
                              <td className="table-actions">
                                <a
                                  href="#"
                                  onClick={() => handleEditClick(item.id)}
                                  className="btn btn-sm btn-outline-success"
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

            {newApprovedData && (
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
                    <h2>New Provider Request</h2>
                  </header>
                  <form className="form-box" id="basic-form">
                    <div className="card">
                      <div className="card-header">
                        <h6 className="card-title">Demographic information</h6>
                      </div>
                      <div className="card-body">
                        <div className="row g-3 ">
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              First Name
                              <span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="FirstName"
                              disabled
                              defaultValue={newApprovedData?.FirstName || "NA"}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Middle Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="MiddleName"
                              disabled
                              defaultValue={newApprovedData?.MiddleName || "NA"}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="LastName"
                              disabled
                              defaultValue={newApprovedData?.LastName || "NA"}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Sex</label>
                            <input
                              type="text"
                              className="form-control"
                              name="FirstName"
                              disabled
                              defaultValue={
                                newApprovedData?.Sex_Type?.type || "NA"
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                              type="text"
                              className="form-control"
                              name="DOB"
                              defaultValue={newApprovedData?.DOB || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">NPI Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="NPINumber"
                              defaultValue={newApprovedData?.NPINumber || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Medical License Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                newApprovedData?.MedicalLicenseNumber || "NA"
                              }
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              name="TitleType"
                              defaultValue={
                                newApprovedData?.Title_Type?.type || "NA"
                              }
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Provider Type</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ProviderType"
                              defaultValue={
                                newApprovedData?.Provider_Type?.type || "NA"
                              }
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Speciality</label>
                            <input
                              type="text"
                              className="form-control"
                              name="SpecialityType"
                              defaultValue={
                                newApprovedData?.Speciality_Type?.type || "NA"
                              }
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Referral Source
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="SpecialityType"
                              defaultValue={
                                newApprovedData?.Referral_Source_Type?.type ||
                                "NA"
                              }
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Preferred Communication
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="CommunicationType"
                              defaultValue={
                                newApprovedData?.Communication_Type?.type ||
                                "NA"
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <h6 className="card-title">
                          Primary Contact Information
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row g-3 ">
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Practice Name
                              <span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="FirstName"
                              disabled
                              defaultValue={
                                newApprovedData?.PracticeName || "NA"
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              name="MiddleName"
                              disabled
                              defaultValue={
                                newApprovedData?.AddressLine1 || "NA"
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              name="LastName"
                              disabled
                              defaultValue={
                                newApprovedData?.AddressLine2 || "NA"
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="FirstName"
                              disabled
                              defaultValue={newApprovedData?.City || "NA"}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">County</label>
                            <input
                              type="text"
                              className="form-control"
                              name="DOB"
                              defaultValue={newApprovedData?.County || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">ZipCode</label>
                            <input
                              type="text"
                              className="form-control"
                              name="NPINumber"
                              defaultValue={newApprovedData?.ZipCode || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Country</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={newApprovedData?.Country || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="TitleType"
                              defaultValue={
                                newApprovedData?.PhoneNumber || "NA"
                              }
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Fax Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ProviderType"
                              defaultValue={newApprovedData?.FaxNumber || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">E-mail</label>
                            <input
                              type="text"
                              className="form-control"
                              name="SpecialityType"
                              defaultValue={newApprovedData?.E_Mail || "NA"}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Alternate Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="CommunicationType"
                              defaultValue={
                                newApprovedData?.PreferredContact || "NA"
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <footer class="custom_modal-footer">
                    <button class="action" type="submit" onClick={() => handlePostData(newApprovedData?.id)}>
                      Accept
                    </button>
                    <button class="action" onClick={closeModalBox}>
                      Decline
                    </button>
                  </footer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRequestProvider;
