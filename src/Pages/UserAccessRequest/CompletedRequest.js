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
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  position: "relative",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  bgcolor: "white",
  // border: '2px solid blue',
  borderRadius: "5px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  mt: "15%",
  pb: "1%",
  overflow: "scroll",
  height: "80%",
};
function CompletedRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalData, setModalData] = useState();
  const [open1, setOpen1] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
        .then(function (res) {
          console.log(res?.data?.data);
          setData(res?.data?.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  const handleClick = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}users?stage=newRequest&UserId=${id}`
      );
      console.log("abc>>", response.data.data);
      // Update state here
      setModalData(response.data.data);
      setIsLoading(false);
      setOpen1(true);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      new DataTable("#userList", {});
    }
  }, [loading]);
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
                    All Records
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
            <Modal
              open={open1}
              onClose={() => setOpen1(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="text-center fw-bold tw-bg-gray-500 text-white p-2 tw-text-lg">
                  Request Form
                  <button
                    className="tw-absolute tw-z-[100]  tw-right-[2%] tw-text-red-700"
                    onClick={() => setOpen1(false)}
                  >
                    <HighlightOffIcon className="deleteIcon" />
                  </button>
                </div>

                {/* <form> */}
                <div className="tw-w-[95%] md:tw-w-[100%] tw-mx-auto tw-mt-3">
                  <div className="tw-px-3  tw-pb-3 demo">
                    <div className="tw-mt-3 tw-flex tw-justify-between tw-items-center">
                      <p className="text-xl font-medium leading-6 text-gray-900">
                        You Have Request From Following
                      </p>
                    </div>

                    {open1 && (
                      <div className="md:tw-grid tw-grid-cols-6 tw-px-3 tw-gap-x-6 tw-gap-y-2 tw-mt-2">
                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="FirstName"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            First Name :
                          </label>
                          <div className="">
                            <input
                              id="FirstName"
                              name="FirstName"
                              defaultValue={modalData?.FirstName || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="FirstName"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Middle Name :
                          </label>
                          <div className="">
                            <input
                              id="FirstName"
                              name="FirstName"
                              defaultValue={modalData?.MiddleName || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="FirstName"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Last Name :
                          </label>
                          <div className="">
                            <input
                              id="FirstName"
                              name="FirstName"
                              defaultValue={modalData?.LastName || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="FirstName"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Sex:
                          </label>
                          <div className="">
                            <input
                              id="FirstName"
                              name="FirstName"
                              defaultValue={modalData?.Sex_Type?.type || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="FirstName"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Date of Birth :
                          </label>
                          <div className="">
                            <input
                              id="FirstName"
                              name="FirstName"
                              defaultValue={modalData?.DOB || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            NPI Number :
                          </label>
                          <div className="">
                            <input
                              name="NPINumber"
                              defaultValue={modalData?.NPINumber || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Medical License Number :
                          </label>
                          <div className="">
                            <input
                              name="MedicalLicenseNumber"
                              defaultValue={
                                modalData?.MedicalLicenseNumber || "NA"
                              }
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Title :
                          </label>
                          <div className="">
                            <input
                              name="TitleType"
                              defaultValue={modalData?.Title_Type?.type || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="tw-col-span-2">
                          <label
                            htmlFor="country"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Provider Type :
                          </label>
                          <div className="">
                            <input
                              name="ProviderType"
                              defaultValue={
                                modalData?.Provider_Type?.type || "NA"
                              }
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Speciality :
                          </label>
                          <div className="">
                            <input
                              name="SpecialityType"
                              defaultValue={
                                modalData?.Speciality_Type?.type || "NA"
                              }
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="country"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Preferred Communication
                          </label>
                          <div className="">
                            <input
                              name="CommunicationType"
                              defaultValue={
                                modalData?.Communication_Type?.type || "NA"
                              }
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Practice Name :
                          </label>
                          <div className="">
                            <input
                              name="PracticeName"
                              defaultValue={modalData?.PracticeName || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Address Line 1 :
                          </label>
                          <div className="">
                            <input
                              name="AddressLine1"
                              defaultValue={modalData?.AddressLine1 || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Address Line 2 :
                          </label>
                          <div className="">
                            <input
                              name="AddressLine2"
                              defaultValue={modalData?.AddressLine2 || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            City :
                          </label>
                          <div className="">
                            <input
                              name="City"
                              defaultValue={modalData?.City || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Zip Code :
                          </label>
                          <div className="">
                            <input
                              name="ZipCode"
                              defaultValue={modalData?.ZipCode || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            County :
                          </label>
                          <div className="">
                            <input
                              name="County"
                              defaultValue={modalData?.County || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Country :
                          </label>
                          <div className="">
                            <input
                              name="Country"
                              defaultValue={modalData?.Country || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Phone Number :
                          </label>
                          <div className="">
                            <input
                              name="PhoneNumber"
                              defaultValue={modalData?.PhoneNumber || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Fax Number :
                          </label>
                          <div className="">
                            <input
                              name="FaxNumber"
                              defaultValue={modalData?.FaxNumber || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            E-mail :
                          </label>
                          <div className="">
                            <input
                              name="E_Mail"
                              defaultValue={modalData?.E_Mail || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Preferred Contact :
                          </label>
                          <div className="">
                            <input
                              name="PreferredContact"
                              defaultValue={modalData?.PreferredContact || "NA"}
                              disabled
                              className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-1 px-2 tw-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div className="flex justify-end gap-6 pb-5 mt-5 w-[100%]">
              <div className="">
                <Button onClick={() => handleApproved(modalData.id)} variant="outlined" color="success">
                  Approved
                </Button>
              </div>
              <div className="">
                <Button onClick={() => handleReject(modalData.id)} variant="outlined" color="error">
                  Reject
                </Button>
              </div>
            </div> */}
                </div>
                {/* </form> */}
              </Box>
            </Modal>
            <div className="row g-2 clearfix row-deck">
              <div className="col-lg-12 col-md-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>S.No.</th>
                          <th style={{ width: "50px" }}>Request Date</th>
                          <th>Name</th>
                          <th>Phone No.</th>
                          <th>E-mail</th>
                          <th>Title</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.length &&
                          data?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1 || "NA"}</td>
                              <td>
                                {new Date(item?.createdAt).toLocaleDateString(
                                  "en-US"
                                )}
                              </td>
                              <td>
                                {(item?.FirstName || "NA") +
                                  " " +
                                  item?.MiddleName +
                                  " " +
                                  item?.LastName}
                              </td>
                              <td>{item?.PhoneNumber}</td>
                              <td>{item?.E_Mail}</td>
                              <td>{item?.Title_Type?.type}</td>
                              <td
                                className="table-actions"
                                onClick={() => handleClick(item?.id)}
                              >
                                <a
                                  href="#"
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                                {/* <a href="#" className="btn btn-sm btn-outline-success"><i className="fa fa-pencil"></i></a>
                              <a href="#" className="btn btn-sm btn-outline-danger"><i className="fa fa-trash"></i></a> */}
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
    </div>
  );
}

export default CompletedRequest;
