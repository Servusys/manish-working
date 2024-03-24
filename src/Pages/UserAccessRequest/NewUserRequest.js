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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Modal } from "@mui/material";
import { Button } from "../../../node_modules/@mui/material/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
function NewUserRequest() {
  const [records, setRecords] = useState();
  const [open1, setOpen1] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [providerData, setProviderData] = useState();
  const [sexData, setSexData] = useState();
  const [titleData, setTitleData] = useState();
  const [communicationData, setCommunicationData] = useState();
  const [specialityData, setSpecialityData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  // const [modalData, setModalData] = useState([]);
  const [modalData, setModalData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Sex_Type: "",
    SexTypeId: "",
    DOB: "",
    NPINumber: "",
    MedicalLicenseNumber: "",
    Title_Type: "",
    TitleTypeId: "",
    Provider_Type: "",
    ProviderTypeId: "",
    Speciality_Type: "",
    SpecialityTypeId: "",
    Communication_Type: "",
    CommunicationTypeId: "",
    PhoneNumber: "",
    FaxNumber: "",
    PreferredContact: "",
    E_Mail: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    County: "",
    ZipCode: "",
    Country: "",
    PracticeName: "",
    Demographic: false,
    userRole: false,
  });

  // Provider Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=provider`)
      .then((res) => {
        console.log(res.data.data);
        setProviderData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Sex Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=sex`)
      .then((res) => {
        console.log(res.data.data);
        setSexData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Title Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=title`)
      .then((res) => {
        console.log(res.data.data);
        setTitleData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Communication Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=communication`)
      .then((res) => {
        console.log(res.data.data);
        setCommunicationData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Speciality Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=speciality`)
      .then((res) => {
        console.log(res.data.data);
        setSpecialityData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePending = (id) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}users?task=toPending&id=${id}`)
      .then((res) => {
        alert(res.data.message);

        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);

        // window.location.reload();
        setOpen1(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApproved = (id) => {
    var d = true;
    var u = true;
    if (document.getElementById("Demographic").checked) {
      d = true;
    } else {
      d = false;
    }
    if (document.getElementById("userRole").checked) {
      u = true;
    } else {
      u = false;
    }
    console.log(modalData, d, u);
    if (d === true) {
      if (modalData.NPINumber == "") {
        alert("Please fill NPI Number");
      } else if (modalData.MedicalLicenseNumber == "") {
        alert("Please fill Medical License Number");
      } else {
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}users?task=toApproved&id=${id}`,
            {
              Demographic: d,
              userRole: u,
              ...modalData,
            }
          )
          .then((res) => {
            alert(res.data.message);
            const updatedRecords = records.filter((record) => record.id !== id);
            setRecords(updatedRecords);
            // window.location.reload();
            setOpen1(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}users?task=toApproved&id=${id}`,
          {
            Demographic: d,
            userRole: u,
            ...modalData,
          }
        )
        .then((res) => {
          alert(res.data.message);

          const updatedRecords = records.filter((record) => record.id !== id);
          setRecords(updatedRecords);

          // window.location.reload();
          setOpen1(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleReject = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}users?task=toReject
      &id=${id}`
      )
      .then((res) => {
        alert(res.data.message);

        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);

        // window.location.reload();
        setOpen1(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    axios
      .get(`${process.env.REACT_APP_BASE_URL}users?stage=newRequest`)
      .then((res) => {
        console.log(res.data.data);
        setRecords(res?.data?.data);
        setIsLoading(false);
        setOriginalRecords(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilter = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const newData = originalRecords.filter((row) => {
      return row.FirstName.toLowerCase().includes(inputValue);
    });
    setRecords(newData);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // alert(value);
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "FirstName" || name === "MiddleName" || name === "LastName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setModalData({
          ...modalData,
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
        setModalData({ ...modalData, [name]: value });
      }
    } else if (name === "E_Mail") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === "") {
        setModalData({ ...modalData, [name]: value });
      }
    } else if (name === "Demographic" || name === "userRole") {
      setModalData({
        ...modalData,
        [name]: checked,
      });
    } else {
      setModalData({ ...modalData, [name]: value });
    }
  };

  const [loading, setLoading] = useState(true);
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
                        {records?.length > 0 &&
                          records?.map((item, i) => (
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
                              <td className="table-actions">
                                <a
                                  href="#"
                                  onClick={() => handleClick(item?.id)}
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {/* {!records?.length && <p>No Records to Show</p>} */}
                  </div>
                </div>
              </div>
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
          <div className="tw-w-[95%] md:tw-w-[100%] tw-mx-auto">
            <div className="">
              <div className="tw-border-b-[1px] py-2 px-3 tw-bg-gray-50 tw-flex tw-justify-between tw-items-center">
                <p className="tw-text-xl tw-font-medium tw-leading-6 tw-text-gray-900">
                  You have request from{" "}
                  <span className="underline">
                    {modalData?.FirstName + " " + modalData?.LastName || "NA"}
                  </span>
                </p>
                <div className="tw-flex tw-items-center">
                  <div className="tw-w-[150px]">
                    <div className="checkbox-wrapper">
                      <div className="tw-flex">
                        <input
                          type="checkbox"
                          name="Demographic"
                          defaultChecked={modalData?.Demographic === true}
                          onChange={(e) => handleChange(e)}
                          className="tw-shadow-sm sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                          id="Demographic"
                        />
                        <label htmlFor="example-1">Provider Account</label>
                      </div>
                    </div>
                  </div>
                  <div className="tw-w-[150px]">
                    <div className="checkbox-wrapper">
                      <div className="tw-flex">
                        <input
                          type="checkbox"
                          name="userRole"
                          defaultChecked={modalData?.userRole === true}
                          onChange={(e) => handleChange(e)}
                          className="tw-shadow-sm sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                          id="userRole"
                        />
                        <label htmlFor="example-1">User Account</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {open1 && (
                <div className="md:tw-grid tw-grid-cols-6 px-3 tw-gap-x-6 tw-gap-y-2 tw-mt-2">
                  <div className="sm:tw-col-span-2 sm:tw-col-start-1">
                    <label htmlFor="name" className="">
                      First Name
                    </label>
                    <div className="">
                      <input
                        value={modalData?.FirstName}
                        type="text"
                        name="FirstName"
                        onChange={(e) => handleChange(e)}
                        required
                        className="form-control"
                        // className='form-control'
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Middle Name
                    </label>
                    <div className="">
                      <input
                        value={modalData?.MiddleName}
                        type="text"
                        name="MiddleName"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Last Name
                    </label>
                    <div className="">
                      <input
                        value={modalData?.LastName}
                        type="text"
                        name="LastName"
                        id="lName"
                        required
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Sex
                    </label>
                    <div className="">
                      <select
                        name="SexTypeId"
                        // value={modalData.SexTypeId}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                        <option value="0">Select</option>
                        {sexData?.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.id}
                              selected={
                                item.id == modalData?.SexTypeId ? true : false
                              }
                            >
                              {item.Type}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Date of Birth
                    </label>
                    <div className="w-full">
                      <DatePicker
                        selected={
                          modalData?.DOB ? new Date(modalData?.DOB) : null
                        }
                        onChange={(date) => {
                          const formattedDate = date.toISOString();
                          setStartDate(date);
                          setModalData({
                            ...modalData,
                            DOB: formattedDate,
                          });
                        }}
                        dateFormat="MM-dd-yyyy"
                        placeholderText="MM-DD-YYYY"
                        maxDate={new Date()}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* {modalData?.Demographic && (
                    <> */}
                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      NPI Number
                    </label>
                    <div className="">
                      <input
                        defaultValue={modalData?.NPINumber}
                        type="number"
                        name="NPINumber"
                        id="npi"
                        onChange={(e) => handleChange(e)}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        onInput={(e) => {
                          if (e.target.value.length > 15) {
                            e.target.value = e.target.value.slice(0, 15);
                          }
                        }}
                        max={999999999999999}
                        min={1000000000}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Medical License Number{" "}
                    </label>
                    <div className="">
                      <input
                        defaultValue={modalData?.MedicalLicenseNumber}
                        type="text"
                        name="MedicalLicenseNumber"
                        id="mlNumber"
                        onChange={(e) => handleChange(e)}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        max={999999999999999}
                        onInput={(e) => {
                          if (e.target.value.length > 15) {
                            e.target.value = e.target.value.slice(0, 15);
                          }
                        }}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Title
                    </label>
                    <div className="">
                      <select
                        id="TitleTypeId"
                        name="TitleTypeId"
                        // defaultValue={modalData.Title_Type}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                        <option value="0">Select</option>
                        {titleData?.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.id}
                              selected={
                                item.id == modalData?.TitleTypeId ? true : false
                              }
                            >
                              {item.Type}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Provider Type
                    </label>
                    <div className="">
                      <select
                        id="ProviderType"
                        name="ProviderTypeId"
                        // defaultValue={modalData.Provider_Type}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                        <option value="0">Select</option>
                        {providerData?.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.id}
                              selected={
                                item.id == modalData?.ProviderTypeId
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
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Speciality
                    </label>
                    <div className="">
                      <select
                        id="SpecialityType"
                        name="SpecialityTypeId"
                        // defaultValue={modalData.Speciality_Type}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                        <option value="0">Select</option>
                        {specialityData?.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.id}
                              selected={
                                item.id == modalData?.SpecialityTypeId
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
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Preferred Communication
                    </label>
                    <div className="">
                      <select
                        id="ReferralSourceType"
                        name="CommunicationTypeId"
                        // defaultValue={modalData.Communication_Type}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                        <option value="0">Select</option>
                        {communicationData?.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.id}
                              selected={
                                item.id == modalData?.CommunicationTypeId
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
                  </div>
                  {/* </>
                  )} */}

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Practice Name
                    </label>
                    <div className="">
                      <input
                        value={modalData?.PracticeName}
                        type="text"
                        name="PracticeName"
                        onChange={(e) => handleChange(e)}
                        autoComplete="fdsgh"
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Address Line 1
                    </label>
                    <div className="">
                      <input
                        value={modalData?.AddressLine1}
                        type="text"
                        name="AddressLine1"
                        onChange={(e) => handleChange(e)}
                        autoComplete="fdsgh"
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Address Line 2
                    </label>
                    <div className="">
                      <input
                        value={modalData?.AddressLine2}
                        type="text"
                        name="AddressLine2"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      City
                    </label>
                    <div className="">
                      <input
                        value={modalData?.City}
                        type="text"
                        name="City"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      State
                    </label>
                    <div className="">
                      <input
                        value={modalData?.State}
                        type="text"
                        name="State"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      County
                    </label>
                    <div className="">
                      <input
                        value={modalData?.County}
                        type="text"
                        name="County"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Zip Code
                    </label>
                    <div className="">
                      <input
                        value={modalData?.ZipCode}
                        type="number"
                        name="ZipCode"
                        onChange={(e) => handleChange(e)}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        maxLength={8}
                        minLength={5}
                        required
                        onInput={(e) => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Country
                    </label>
                    <div className="">
                      <input
                        value={modalData?.Country}
                        type="text"
                        name="Country"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Phone Number
                    </label>
                    <div className="">
                      <input
                        value={modalData?.PhoneNumber}
                        type="number"
                        name="PhoneNumber"
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
                        max={999999999999999}
                        min={1000000000}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Fax Number
                    </label>
                    <div className="">
                      <input
                        value={modalData?.FaxNumber}
                        type="number"
                        name="FaxNumber"
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
                        max={999999999999999}
                        min={1000000000}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Email
                    </label>
                    <div className="">
                      <input
                        value={modalData?.E_Mail}
                        type="text"
                        name="E_Mail"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="sm:tw-col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-thin leading-6"
                    >
                      Alternate Number
                    </label>
                    <div className="">
                      <input
                        value={modalData?.PreferredContact}
                        type="number"
                        name="PreferredContact"
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
                        max={999999999999999}
                        min={1000000000}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="tw-flex tw-justify-end tw-gap-6 tw-pb-5 tw-mt-5 tw-w-[100%]">
              <div className="">
                <Button
                  onClick={() => handlePending(modalData.id)}
                  variant="outlined"
                  color="secondary"
                >
                  Pending
                </Button>
              </div>
              <div className="">
                <Button
                  onClick={() => handleApproved(modalData.id)}
                  variant="outlined"
                  color="success"
                >
                  Approved
                </Button>
              </div>
              <div className="">
                <Button
                  onClick={() => handleReject(modalData.id)}
                  variant="outlined"
                  color="error"
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
          {/* </form> */}
        </Box>
      </Modal>
    </div>
  );
}

export default NewUserRequest;
