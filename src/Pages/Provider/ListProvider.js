import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import "datatables.net-dt/css/dataTables.dataTables.css";
import DataTable from "datatables.net-dt";
import axios from "axios";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CircleIcon from "@mui/icons-material/Circle";
function ListProvider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [providerData, setProviderData] = useState();
  const [sexData, setSexData] = useState();
  const [titleData, setTitleData] = useState();
  const [referralSourceData, setReferralSourceData] = useState();
  const [communicationData, setCommunicationData] = useState();
  const [specialityData, setSpecialityData] = useState();
  const [securityData, setSecurityData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [Demographic, setDemographic] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Sex_Type: "",
    SexTypeId: "",
    DOB: "",
    NPINumber: "",
    MedicalLicenseNumber: "",
    ProviderAddresses: [],
    Title_Type: "",
    TitleTypeId: "",
    Provider_Type: "",
    ProviderTypeId: "",
    Speciality_Type: "",
    SpecialityTypeId: "",
    ReferralSource_Type: "",
    ReferralSourceTypeId: "",
    Communication_Type: "",
    CommunicationTypeId: "",
  });
  const [open2, setOpen2] = useState(false);
  const [ProviderAddresses, setProviderAddresses] = useState([]);
  const [filteredAddress, setFilteredAddress] = useState([]);
  const [expandedAccordion, setExpandedAccordion] = useState(0); // Initially expanded Accordion index
  const [addressExpand, setAddressExpand] = useState(false);
  useEffect(() => {
    console.log({ ProviderAddresses });
  }, [ProviderAddresses]);
  useEffect(() => {
    if (open2) {
      setExpandedAccordion(0);
    }
  }, [open2]);

  const handleSecondModal = () => {
    setOpen2(true);
  };
  const CloseSecondModal = () => {
    setOpen2(false);
  };

  const handleEditClick = async (id) => {
    try {
      setOpenModal(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}users/getProvider?UserId=${id}`
      );

      const providerData = response.data.data;
      setDemographic(providerData);
      setProviderAddresses(providerData.ProviderAddresses);
      setFilteredAddress((prevAddresses) => {
        const result = providerData.ProviderAddresses.filter((item) => {
          return item.Primary === true;
        });
        return result;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Provider Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=provider`)
      .then((res) => {
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
        setTitleData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Referral Source Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=referralSource`)
      .then((res) => {
        setReferralSourceData(res?.data?.data);
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
        setSpecialityData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Security Type
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=securityQuestion`)
      .then((res) => {
        setSecurityData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeModalBox = () => {
    setDemographic({
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Sex_Type: "",
      SexTypeId: "",
      DOB: "",
      NPINumber: "",
      MedicalLicenseNumber: "",
      ProviderAddresses: [],
      Title_Type: "",
      TitleTypeId: "",
      Provider_Type: "",
      ProviderTypeId: "",
      Speciality_Type: "",
      SpecialityTypeId: "",
      ReferralSource_Type: "",
      ReferralSourceTypeId: "",
      Communication_Type: "",
      CommunicationTypeId: "",
    });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    if (name == "MedicalLicenseNumber") {
    }
    if (name == "NPINumber") {
    }
    if (name === "FirstName" || name === "MiddleName" || name === "LastName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setDemographic({
          ...Demographic,
          [name]: capitalizeFirstLetter(value),
        });
      }
    } else if (name === "Email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === "") {
        setDemographic({ ...Demographic, [name]: value });
      }
    } else {
      setDemographic({ ...Demographic, [name]: value });
    }
  };

  const handleChangeInside = (e, index) => {
    let tempAddress = [...ProviderAddresses];
    if (e.target.name === "Primary") {
      tempAddress[index] = { ...tempAddress[index], Primary: true };

      for (var i = 0; i < tempAddress.length; i++) {
        // // console.log(i,index)
        if (i !== index) {
          tempAddress[i] = { ...tempAddress[i], Primary: false };
        }
      }
    } else if (e.target.name === "Shared") {
      tempAddress[index] = {
        ...tempAddress[index],
        [e.target.name]: true,
      };
      for (var i = 0; i < tempAddress.length; i++) {
        // // console.log(i,index)
        if (i !== index) {
          tempAddress[i] = {
            ...tempAddress[i],
            [e.target.name]: false,
          };
        }
      }
    } else if (e.target.name === "NotShared") {
      tempAddress[index] = { ...tempAddress[index], Shared: false };
    } else {
      tempAddress[index] = {
        ...tempAddress[index],
        [e.target.name]: e.target.value,
      };
    }
    setProviderAddresses(tempAddress);
    setDemographic({ ...Demographic, ProviderAddresses });
  };

  const handleUpdateData = () => {
    // setOpenModal(false);
    if (
      Demographic.FirstName.trim() === "" ||
      Demographic.LastName.trim() === "" ||
      Demographic.DOB.trim() === "" ||
      Demographic.NPINumber === "" ||
      Demographic.MedicalLicenseNumber === ""
    ) {
      // Use SweetAlert for displaying an error message
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Please fill in all the required fields in the form.",
      // });
    } else {
      // Use SweetAlert for confirming the update action
      // Swal.fire({
      //   title: "Are you sure?",
      //   text: "You are about to update the provider information.",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonText: "Yes, update it!",
      //   cancelButtonText: "No, cancel!",
      //   reverseButtons: true,
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     // Use SweetAlert for displaying a success message
      //     // Swal.fire({
      //     //   title: "Success!",
      //     //   text: "Provider information updated successfully.",
      //     //   icon: "success",
      //     // });

      //     // Proceed with the axios put request
      //     axios
      //       .put(`${process.env.REACT_APP_BASE_URL}users/updateProvider`, {
      //         ...Demographic,
      //       })
      //       .then((res) => {
      //         // console.log(res.data.message);
      //         setOpenModal(false);

      //         // Use SweetAlert for informing about data retrieval
      //         Swal.fire({
      //           title: "Success!",
      //           text: res?.data?.message,
      //           icon: "success",
      //         });

      //         // Fetch the latest provider information after the update
      //         axios
      //           .get(`${process.env.REACT_APP_BASE_URL}users/getProvider`)
      //           .then((res) => {
      //             // console.log(res.data.data);
      //             setData(res?.data?.data);

      //             // Close the previous SweetAlert
      //             Swal.close();
      //           })
      //           .catch((error) => {
      //             // console.log(error);

      //             // Close the previous SweetAlert with an error message
      //             Swal.fire({
      //               icon: "error",
      //               title: "Oops...",
      //               text: error?.data?.message,
      //             });
      //           });
      //       })
      //       .catch((error) => {
      //         // console.log(error);
      //         // Handle any errors from the backend
      //         Swal.fire({
      //           icon: "error",
      //           title: "Oops...",
      //           text: error.response.data.message,
      //         });
      //       });
      //   } else if (result.dismiss === Swal.DismissReason.cancel) {
      //     // Use SweetAlert for displaying a cancellation message
      //     Swal.fire({
      //       title: "Cancelled",
      //       text: "Provider information update has been cancelled.",
      //       icon: "error",
      //     });
      //   }
      // });
      axios
        .put(`${process.env.REACT_APP_BASE_URL}users/updateProvider`, {
          ...Demographic,
        })
        .then((res) => {
          // console.log(res.data.message);
          // setOpenModal(false);

          // Use SweetAlert for informing about data retrieval
          Swal.fire({
            title: "Success!",
            text: res?.data?.message,
            icon: "success",
            timer: 1000,
          });
          // toast.success("success");

          // Fetch the latest provider information after the update
          axios
            .get(`${process.env.REACT_APP_BASE_URL}users/getProvider`)
            .then((res) => {
              // console.log(res.data.data);
              setData(res?.data?.data);

              // Close the previous SweetAlert
              // Swal.close();
            })
            .catch((error) => {
              // console.log(error);

              // Close the previous SweetAlert with an error message
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.data?.message,
              });
            });
        })
        .catch((error) => {
          // console.log(error);
          // Handle any errors from the backend
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    }
  };

  const handleUpdateDataTwo = () => {
    const hasEmptyFields = ProviderAddresses.some(
      (item) =>
        item.PracticeName === "" ||
        item.AddressLine1 === "" ||
        // item.City === "" ||
        // item.State === "" ||
        // item.County === "" ||
        item.ZipCode === "" ||
        // item.Country === "" ||
        item.PhoneNumber === "" ||
        item.FaxNumber === "" ||
        item.Email === ""
    );

    if (hasEmptyFields) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log({ ProviderAddresses });
    axios
      .put(`${process.env.REACT_APP_BASE_URL}users/updateProvider`, {
        ...Demographic,
      })
      .then((res) => {
        toast.success(res.data.message);
        setOpen2(false);
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
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleExpandAddress = () => {
    setProviderAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        PracticeName: "",
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        ZipCode: "",
        County: "",
        Country: "",
        PhoneNumber: "",
        FaxNumber: "",
        E_mail: "",
        PreferredContact: "",
        Primary: false,
        Shared: false,
        State: "",
      },
    ]);
  };

  return (
    <div id="layout" className="">
      <Preloader />
      <div id="wrapper">
        <TopBar />
        <SideBar />
        <div id="main-content">
          <div className="container-fluid">
            <div className="row g-2 clearfix row-deck">
              <div className="col-lg-12 col-md-12">
                <div className="card mb-4">
                  <div className="card-body" style={{ overflowX: "scroll" }}>
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>S.No.</th>
                          <th>Name</th>
                          <th>Provider Id</th>
                          <th>Phone No.</th>
                          <th>E-mail</th>
                          <th>NPI No.</th>
                          <th>ML No.</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length &&
                          data.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1 || "NA"}</td>
                              <td>
                                {(item.FirstName || "NA") +
                                  " " +
                                  item.MiddleName +
                                  " " +
                                  item.LastName}
                              </td>
                              <td>{item?.id}</td>
                              <td>{item.ProviderAddresses[0].PhoneNumber}</td>
                              <td>{item.ProviderAddresses[0].Email}</td>
                              <td>{item.NPINumber}</td>
                              <td>{item.MedicalLicenseNumber}</td>
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
                  <h2>Edit Provider</h2>
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
                            First Name<span className="AsteriskSymbol">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={Demographic?.FirstName}
                            name="FirstName"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Middle Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="MiddleName"
                            value={Demographic?.MiddleName}
                            onChange={(e) => handleChange(e)}
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
                            {sexData?.map((item, i) => {
                              return (
                                <option
                                  key={i}
                                  value={item?.id}
                                  selected={
                                    item.id == Demographic?.SexTypeId
                                      ? true
                                      : false
                                  }
                                >
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
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            NPI Number<span className="AsteriskSymbol">*</span>
                          </label>
                          <input
                            className="form-control"
                            defaultValue={Demographic?.NPINumber}
                            type="text"
                            name="NPINumber"
                            id="npi"
                            onChange={(e) => handleChange(e)}
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                            maxLength={15}
                            minLength={10}
                            onInput={(e) => {
                              if (e.target.value.length > 15) {
                                e.target.value = e.target.value.slice(0, 15);
                              }
                            }}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">
                            Medical License Number
                            <span className="AsteriskSymbol">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="MedicalLicenseNumber"
                            defaultValue={Demographic?.MedicalLicenseNumber}
                            onChange={(e) => handleChange(e)}
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                            maxLength={15}
                            minLength={10}
                            onInput={(e) => {
                              if (e.target.value.length > 15) {
                                e.target.value = e.target.value.slice(0, 15);
                              }
                            }}
                            required
                          />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Choose Title</label>
                          <select
                            className="form-select"
                            id="TitleType"
                            name="TitleTypeId"
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected>Select</option>
                            {titleData?.map((item, i) => {
                              return (
                                <option
                                  key={i}
                                  value={item.id}
                                  selected={
                                    item.id == Demographic?.TitleTypeId
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
                            Choose Provider Type
                          </label>
                          <select
                            id="ProviderType"
                            name="ProviderTypeId"
                            onChange={(e) => handleChange(e)}
                            className="form-select"
                          >
                            <option selected>Select</option>
                            {providerData?.map((item, i) => {
                              return (
                                <option
                                  key={i}
                                  value={item.id}
                                  selected={
                                    item.id == Demographic?.ProviderTypeId
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
                            Choose Speciality
                          </label>
                          <select
                            id="SpecialityType"
                            name="SpecialityTypeId"
                            onChange={(e) => handleChange(e)}
                            className="form-select"
                          >
                            <option selected>Select</option>
                            {specialityData?.map((item, i) => {
                              return (
                                <option
                                  key={i}
                                  value={item.id}
                                  selected={
                                    item.id == Demographic?.SpecialityTypeId
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
                            Choose Referral Source
                          </label>
                          <select
                            className="form-select"
                            id="ReferralSourceType"
                            name="ReferralSourceTypeId"
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected>Select</option>
                            {referralSourceData?.map((item, i) => {
                              return (
                                <option
                                  key={i}
                                  value={item.id}
                                  selected={
                                    item.id == Demographic?.ReferralSourceTypeId
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
                            Choose Preferred Communication
                          </label>
                          <select
                            className="form-select"
                            id="CommunicationType"
                            name="CommunicationTypeId"
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected>Select</option>
                            {communicationData?.map((item, i) => {
                              return (
                                <option
                                  key={i}
                                  value={item.id}
                                  selected={
                                    item.id == Demographic?.CommunicationTypeId
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
                    </div>
                  </div>
                  {/* .filter(
                      (item) => item.Primary === true
                    ) */}
                  {ProviderAddresses.length > 0 &&
                    ProviderAddresses.map((item, index) => {
                      console.log({ item });
                      return (
                        <div className="card mt-3" key={index}>
                          <div className="card-header d-flex justify-content-between align-item-center">
                            <h6 className="card-title">Contact information</h6>
                            <Link
                              to=""
                              className="text-blue-400 underline"
                              onClick={handleSecondModal}
                            >
                              Edit & View all Contact Info
                            </Link>
                          </div>
                          <div className="card-body">
                            <div className="row g-3 ">
                              <div className="col-12 d-flex">
                                <span className="mx-1">
                                  {item?.Primary
                                    ? "PrimaryTrue"
                                    : "PrimaryFalse"}
                                  {item?.Shared ? "SharedTrue" : "SharedFalse"}
                                  <CircleIcon
                                    className={
                                      item?.Primary
                                        ? "text-success"
                                        : "text-dark"
                                    }
                                  />{" "}
                                  &nbsp; Primary
                                </span>
                                <span className="mx-1">
                                  <CircleIcon
                                    className={
                                      item?.Shared
                                        ? "text-success"
                                        : "text-dark"
                                    }
                                  />{" "}
                                  &nbsp; Shared
                                </span>
                                {/* <div className="form-check form-switch">
                                  {item?.Primary ? (
                                    <CircleIcon />
                                  ) : (
                                    <i class="fas fa-dot-circle bg-danger"></i>
                                  )}

                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={item?.Primary}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="primary"
                                  >
                                    Primary
                                  </label>
                                </div> */}
                                {/* <div className="form-check form-switch mx-3">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    disabled
                                    name="Shared"
                                    checked={item?.Shared === true}
                                    onChange={(e) =>
                                      handleChangeInside(e, index)
                                    }
                                  />
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={item?.Shared}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Shared"
                                  >
                                    Shared
                                  </label>
                                </div> */}
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">
                                  Practice Name
                                </label>
                                <input
                                  disabled
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => handleChangeInside(e, index)}
                                  defaultValue={item?.PracticeName}
                                  name="PracticeName"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">
                                  Address Line 1
                                </label>
                                <input
                                  disabled
                                  type="text"
                                  className="form-control"
                                  name="AddressLine1"
                                  defaultValue={item?.AddressLine1}
                                  onChange={(e) => handleChangeInside(e, index)}
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">
                                  Address Line2
                                </label>
                                <input
                                  disabled
                                  className="form-control"
                                  type="text"
                                  name="AddressLine2"
                                  defaultValue={item?.AddressLine2}
                                  onChange={(e) => handleChangeInside(e, index)}
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">City</label>
                                <input
                                  disabled
                                  type="text"
                                  name="City"
                                  value={item?.City}
                                  onChange={(e) => handleChangeInside(e, index)}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">State</label>
                                <input
                                  disabled
                                  type="text"
                                  name="State"
                                  onChange={(e) => handleChangeInside(e, index)}
                                  value={item.State}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">County</label>
                                <input
                                  disabled
                                  type="text"
                                  name="County"
                                  defaultValue={item?.County}
                                  onChange={(e) => handleChangeInside(e, index)}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">Zip Code</label>
                                <input
                                  disabled
                                  type="number"
                                  name="ZipCode"
                                  defaultValue={item?.ZipCode}
                                  onChange={(e) => handleChangeInside(e, index)}
                                  style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "textfield",
                                  }}
                                  max={99999999}
                                  min={10000}
                                  onInput={(e) => {
                                    if (e.target.value.length > 8) {
                                      e.target.value = e.target.value.slice(
                                        0,
                                        8
                                      );
                                    }
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">Country</label>
                                <input
                                  disabled
                                  type="text"
                                  name="Country"
                                  defaultValue={item?.Country}
                                  onChange={(e) => handleChangeInside(e, index)}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">
                                  Phone Number
                                </label>
                                <div class="input-group">
                                  <span
                                    class="input-group-text"
                                    id="basic-addon16"
                                  >
                                    <i class="fa fa-phone"></i>
                                  </span>
                                  <input
                                    disabled
                                    type="number"
                                    name="PhoneNumber"
                                    style={{
                                      WebkitAppearance: "none",
                                      MozAppearance: "textfield",
                                    }}
                                    defaultValue={item?.PhoneNumber}
                                    onChange={(e) =>
                                      handleChangeInside(e, index)
                                    }
                                    onInput={(e) => {
                                      if (e.target.value.length > 10) {
                                        e.target.value = e.target.value.slice(
                                          0,
                                          10
                                        );
                                      }
                                    }}
                                    // onChange={(e) => handleAddress(e, i)}
                                    max={9999999999}
                                    min={10000000}
                                    class="form-control phone-number"
                                    placeholder="Ex: +00 (000) 000-00-00"
                                    aria-label="phone-number"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">
                                  Alternate Number
                                </label>
                                <div class="input-group">
                                  <span
                                    class="input-group-text"
                                    id="basic-addon16"
                                  >
                                    <i class="fa fa-phone"></i>
                                  </span>
                                  <input
                                    disabled
                                    type="number"
                                    name="PreferredContact"
                                    defaultValue={item?.PreferredContact}
                                    onChange={(e) =>
                                      handleChangeInside(e, index)
                                    }
                                    style={{
                                      WebkitAppearance: "none",
                                      MozAppearance: "textfield",
                                    }}
                                    max={9999999999}
                                    min={10000000}
                                    onInput={(e) => {
                                      if (e.target.value.length > 10) {
                                        e.target.value = e.target.value.slice(
                                          0,
                                          10
                                        );
                                      }
                                    }}
                                    class="form-control phone-number"
                                    placeholder="Ex: +00 (000) 000-00-00"
                                    aria-label="phone-number"
                                    aria-describedby="basic-addon16"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">Fax Number</label>
                                <input
                                  disabled
                                  type="number"
                                  name="FaxNumber"
                                  onChange={(e) => handleChangeInside(e, index)}
                                  defaultValue={item?.FaxNumber}
                                  style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "textfield",
                                  }}
                                  max={9999999999}
                                  min={1000000000}
                                  onInput={(e) => {
                                    if (e.target.value.length > 10) {
                                      e.target.value = e.target.value.slice(
                                        0,
                                        10
                                      );
                                    }
                                  }}
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 col-lg-3">
                                <label className="form-label">E-mail</label>
                                <div class="input-group">
                                  <span
                                    class="input-group-text"
                                    id="basic-addon20"
                                  >
                                    <i class="fa fa-envelope-o"></i>
                                  </span>
                                  <input
                                    disabled
                                    class="form-control email"
                                    placeholder="Ex: example@example.com"
                                    aria-label="email"
                                    aria-describedby="basic-addon20"
                                    type="email"
                                    name="Email"
                                    defaultValue={item?.Email}
                                    onChange={(e) =>
                                      handleChangeInside(e, index)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </form>
                <footer class="custom_modal-footer">
                  <button
                    class="action"
                    type="submit"
                    onClick={handleUpdateData}
                  >
                    Accept
                  </button>
                  <button class="action" onClick={closeModalBox}>
                    Decline
                  </button>
                </footer>
              </div>
            </div>

            <div
              className={
                open2 === true ? "custom_modal open openModal" : "custom_modal"
              }
            >
              <div class="custom_content-wrapper tw-w-[90%]">
                <button
                  class="custom_close"
                  onClick={CloseSecondModal}
                ></button>
                <header class="custom_modal-header">
                  <h2>Edit Provider Address</h2>
                </header>
                <form className="form-box" id="basic-form">
                  <div>
                    {ProviderAddresses.length > 0 &&
                      ProviderAddresses.map((item, index) => {
                        console.log({ ProviderAddresses }, "Sahi");
                        return (
                          <Accordion
                            expanded={expandedAccordion === index}
                            onChange={() => setExpandedAccordion(index)}
                            key={index}
                          >
                            <AccordionSummary
                              className="According_custom"
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={"panel" + index + "a-content"}
                              id={"panel" + index + "a-header"}
                            >
                              <Typography className="tw-text-lg tw-font-medium tw-leading-6">
                                Contact Information : {index + 1} &nbsp; &nbsp;
                                <span className="ml-5 tw-text-[14px]">
                                  {item?.PracticeName}, &nbsp;
                                  {item.PhoneNumber}, &nbsp;
                                  {item.Email}
                                </span>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="card-body">
                                <div className="row g-3 ">
                                  <div className="col-12 d-flex">
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="primary"
                                        id="primary"
                                        defaultChecked={item?.Primary}
                                        onChange={(e) =>
                                          handleChangeInside(e, index)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="primary"
                                      >
                                        Primary
                                      </label>
                                    </div>
                                    <div className="form-check form-switch mx-3">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="Shared"
                                        defaultChecked={item.Shared === true}
                                        onChange={(e) =>
                                          handleChangeInside(e, index)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="Shared"
                                      >
                                        Shared
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Practice Name
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      defaultValue={item?.PracticeName}
                                      name="PracticeName"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Address Line 1
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="AddressLine1"
                                      defaultValue={item?.AddressLine1}
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Address Line2
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="AddressLine2"
                                      defaultValue={item?.AddressLine2}
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      City
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="City"
                                      value={item?.City}
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      State
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="State"
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      value={item.State}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">County</label>
                                    <input
                                      type="text"
                                      name="County"
                                      defaultValue={item?.County}
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Zip Code
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="number"
                                      name="ZipCode"
                                      defaultValue={item?.ZipCode}
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      style={{
                                        WebkitAppearance: "none",
                                        MozAppearance: "textfield",
                                      }}
                                      max={99999999}
                                      min={10000}
                                      onInput={(e) => {
                                        if (e.target.value.length > 8) {
                                          e.target.value = e.target.value.slice(
                                            0,
                                            8
                                          );
                                        }
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Country
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Country"
                                      defaultValue={item?.Country}
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Phone Number
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <div class="input-group">
                                      <span
                                        class="input-group-text"
                                        id="basic-addon16"
                                      >
                                        <i class="fa fa-phone"></i>
                                      </span>
                                      <input
                                        type="number"
                                        name="PhoneNumber"
                                        style={{
                                          WebkitAppearance: "none",
                                          MozAppearance: "textfield",
                                        }}
                                        defaultValue={item?.PhoneNumber}
                                        onChange={(e) =>
                                          handleChangeInside(e, index)
                                        }
                                        onInput={(e) => {
                                          if (e.target.value.length > 10) {
                                            e.target.value =
                                              e.target.value.slice(0, 10);
                                          }
                                        }}
                                        // onChange={(e) => handleAddress(e, i)}
                                        max={9999999999}
                                        min={1000000000}
                                        class="form-control phone-number"
                                        placeholder="Ex: +00 (000) 000-00-00"
                                        aria-label="phone-number"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Alternate Number
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <div class="input-group">
                                      <span
                                        class="input-group-text"
                                        id="basic-addon16"
                                      >
                                        <i class="fa fa-phone"></i>
                                      </span>
                                      <input
                                        type="number"
                                        name="PreferredContact"
                                        defaultValue={item?.PreferredContact}
                                        onChange={(e) =>
                                          handleChangeInside(e, index)
                                        }
                                        style={{
                                          WebkitAppearance: "none",
                                          MozAppearance: "textfield",
                                        }}
                                        max={9999999999}
                                        min={1000000000}
                                        onInput={(e) => {
                                          if (e.target.value.length > 10) {
                                            e.target.value =
                                              e.target.value.slice(0, 10);
                                          }
                                        }}
                                        class="form-control phone-number"
                                        placeholder="Ex: +00 (000) 000-00-00"
                                        aria-label="phone-number"
                                        aria-describedby="basic-addon16"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      Fax Number
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <input
                                      type="number"
                                      name="FaxNumber"
                                      onChange={(e) =>
                                        handleChangeInside(e, index)
                                      }
                                      defaultValue={item?.FaxNumber}
                                      style={{
                                        WebkitAppearance: "none",
                                        MozAppearance: "textfield",
                                      }}
                                      max={9999999999}
                                      min={1000000000}
                                      onInput={(e) => {
                                        if (e.target.value.length > 10) {
                                          e.target.value = e.target.value.slice(
                                            0,
                                            10
                                          );
                                        }
                                      }}
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <label className="form-label">
                                      E-mail
                                      <span className="AsteriskSymbol">*</span>
                                    </label>
                                    <div class="input-group">
                                      <span
                                        class="input-group-text"
                                        id="basic-addon20"
                                      >
                                        <i class="fa fa-envelope-o"></i>
                                      </span>
                                      <input
                                        class="form-control email"
                                        placeholder="Ex: example@example.com"
                                        aria-label="email"
                                        aria-describedby="basic-addon20"
                                        type="email"
                                        name="Email"
                                        defaultValue={item?.Email}
                                        onChange={(e) =>
                                          handleChangeInside(e, index)
                                        }
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                  </div>
                </form>
                <footer class="custom_modal-footer">
                  <button
                    type="button"
                    className="btn add-more-btn d-inline"
                    onClick={() => handleExpandAddress()}
                  >
                    Add More Addresss
                  </button>
                  <button class="action bg-danger" onClick={CloseSecondModal}>
                    Decline
                  </button>
                  <button
                    class="action bg-success"
                    type="submit"
                    onClick={handleUpdateDataTwo}
                  >
                    Accept
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

export default ListProvider;
