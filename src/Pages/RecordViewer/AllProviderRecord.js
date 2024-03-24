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

function AllProviderRecord() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newApprovedData, setNewApprovedData] = useState();
  const [address, setAddress] = useState();


  const closeModalBox = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}users/getProvider`)
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

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}users/getProvider?UserId=${id}`
      );
      setNewApprovedData(response?.data?.data);
      var addressSec = newApprovedData?.ProviderAddresses.map((item, ikl) => {
        return {
          PracticeName: item?.PracticeName,
          AddressLine1: item?.AddressLine1,
          AddressLine2: item?.AddressLine2,
          City: item?.City,
          ZipCode: item?.ZipCode,
          County: item?.County,
          Country: item?.Country,
          PhoneNumber: item?.PhoneNumber,
          FaxNumber: item?.FaxNumber,
          E_mail: item?.E_mail,
          PreferredContact: item?.PreferredContact,
          Primary: item?.Primary,
          Shared: item?.Shared,
          State: item?.State,
        };
      });
      setAddress(addressSec);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = (id) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}users/providerArchive`, {
        id,
      })
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}users/getProvider`
          )
          .then((res) => {
            setData(res?.data?.data);
          })
          .catch((error) => {
            // console.log(error);
          });
      })
      .catch((error) => {
        toast.error(error?.data?.message);
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
                    All Provider Records
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
                          <th>Name</th>
                          <th>Phone No.</th>
                          <th>Provider Type</th>
                          <th>Speciality</th>
                          <th>NPI No.</th>
                          <th>ML No.</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length &&
                          data?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1 || "NA"}</td>
                              <td>
                                {(item?.FirstName || "NA") +
                                  " " +
                                  item?.MiddleName +
                                  " " +
                                  item?.LastName}
                              </td>
                              <td>{item?.ProviderAddresses[0]?.PhoneNumber}</td>
                              <td>{item?.Provider_Type?.type}</td>
                              <td>{item?.Speciality_Type?.type}</td>
                              <td>{item?.NPINumber}</td>
                              <td>{item?.MedicalLicenseNumber}</td>
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
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleEditClick(item.id)}
                                >
                                  <i className="fa fa-eye"></i>
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
                    <h2>All Provider Record</h2>
                  </header>
                  <form className="form-box" id="basic-form">
                    <div className="card">
                      <div className="card-header">
                        <h6 className="card-title">Demographic Information</h6>
                      </div>
                      <div className="card-body">
                        <div className="row g-3 ">
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              First Name : {newApprovedData?.FirstName || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Middle Name :{" "}
                              {newApprovedData?.MiddleName || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Last Name : {newApprovedData?.LastName || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Gender : {newApprovedData?.Sex_Type?.type || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Date of Birth : {newApprovedData?.DOB || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              NPI Number : {newApprovedData?.NPINumber || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Medical License Number :{" "}
                              {newApprovedData?.MedicalLicenseNumber || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Title :{" "}
                              {newApprovedData?.Title_Type?.type || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Provider Type :{" "}
                              {newApprovedData?.Provider_Type?.type || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Speciality :{" "}
                              {newApprovedData?.Speciality_Type?.type || "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Referral Source :{" "}
                              {newApprovedData?.Referral_Source_Type?.type ||
                                "NA"}
                            </label>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Preferred Communication :{" "}
                              {newApprovedData?.Communication_Type?.type ||
                                "NA"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {newApprovedData?.ProviderAddresses?.map((item, i) => (
                      <div className="card" key={i}>
                        <div className="card-header">
                          <h6 className="card-title">
                            Primary Contact Information
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="row g-3">
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Practice Name : {item?.PracticeName || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Address Line 1 : {item?.AddressLine1 || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Address Line 2 : {item?.AddressLine2 || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                City : {item?.City || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                County : {item?.County || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                ZipCode : {item?.ZipCode || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Country : {item?.Country || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Phone Number : {item?.PhoneNumber || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Fax Number : {item?.FaxNumber || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                E-mail : {item?.Email || "NA"}
                              </label>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                              <label className="form-label">
                                Alternate Number :{" "}
                                {item?.PreferredContact || "NA"}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProviderRecord;
