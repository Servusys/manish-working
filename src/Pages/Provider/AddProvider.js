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

function AddProvider() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [providerData, setProviderData] = useState();
  const [sexData, setSexData] = useState();
  const [titleData, setTitleData] = useState();
  const [referralSourceData, setReferralSourceData] = useState();
  const [communicationData, setCommunicationData] = useState();
  const [specialityData, setSpecialityData] = useState();
  const [addressess, setAddressess] = useState([
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
      Primary: true,
      Shared: false,
      State: "",
    },
  ]);

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

  const [row, setRow] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    SexType: "",
    DOB: { selectedDate },
    NPINumber: "",
    MedicalLicenseNumber: "",
    TitleType: "",
    ProviderType: "",
    SpecialityType: "",
    ReferralSourceType: "",
    CommunicationType: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleBlur = (e, index) => {
    const { name, value } = e.target;
    if (name === "E_mail") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "") {
        toast.warning("Please enter a valid email.", { autoClose: 1000 });
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
        var updatedAddresses = [...addressess];
        updatedAddresses[index].E_mail = value;
        setAddressess(updatedAddresses);
      }
    }
  };

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

  // Add More Address
  const addmoreAddress = () => {
    setAddressess((prevAddresses) => [
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

  const handleChangePost = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "FirstName" || name === "MiddleName" || name === "LastName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setRow({
          ...row,
          [name]: capitalizeFirstLetter(value),
        });
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
        toast.warning("Accept Only Alphabet ", { autoClose: 1000 });
      }
    } else if (name === "NPINumber") {
      if (/^[0-9]+$/.test(value) || value === "") {
        setIsValidEmail(true);
        setRow({ ...row, [name]: value });
      } else {
        setIsValidEmail(false);
        toast.warning("Accept Only Number", { autoClose: 1000 });
      }
    } else {
      setIsValidEmail(true);
      setRow({ ...row, [name]: value });
    }
  };

  const handlePrimaryClick = (e, index) => {
    const NewPrimary = [...addressess];

    NewPrimary.forEach((item, i) => {
      i == index
        ? (NewPrimary[i].Primary = true)
        : (NewPrimary[i].Primary = false);
    });
    setAddressess(NewPrimary);
  };

  const handalShared = (e, index) => {
    const NewPrimary = [...addressess];
    if (e.target.checked) {
      NewPrimary[index].Shared = true;
    } else {
      NewPrimary[index].Shared = false;
    }
    setAddressess(NewPrimary);
  };

  // const handleAddress = (e, i) => {
  //   const { name, value } = e.target;

  //   const capitalizeFirstLetter = (str) => {
  //     return str.charAt(0).toUpperCase() + str.slice(1);
  //   };

  //   const isAlphabetic = /^[A-Za-z\s]+$/;

  //   const updatedAddresses = addressess.map((address, index) => {
  //     if (index === i) {
  //       if (
  //         name === "City" ||
  //         name === "State" ||
  //         name === "County" ||
  //         name === "Country" ||
  //         name === "PracticeName"
  //       ) {
  //         if (isAlphabetic.test(value) || value === "") {
  //           const newValue = capitalizeFirstLetter(value);
  //           return {
  //             ...address,
  //             [name]: newValue,
  //           };
  //         }
  //       } else {
  //         return {
  //           ...address,
  //           [name]: value,
  //         };
  //       }
  //     }
  //     return address;
  //   });

  //   setAddressess(updatedAddresses);
  // };

  const handleAddress = (e, i) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const isAlphabetic = /^[A-Za-z\s]+$/;

    const updatedAddresses = addressess.map((address, index) => {
      if (index === i) {
        if (
          name === "City" ||
          name === "State" ||
          name === "County" ||
          name === "Country" ||
          name === "PracticeName"
        ) {
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

    const phoneNumber = updatedAddresses[i].PhoneNumber;
    const preferredContact = updatedAddresses[i].PreferredContact;
    if (phoneNumber === preferredContact) {
      // updatedAddresses[i].PreferredContact = "";
      toast.error("Alternate Contact cannot be same as Phone Number.")
      setIsValidEmail(false);
    }else {
      setIsValidEmail(true);  
    }

    setAddressess(updatedAddresses);
  };

  // const handlePostData = (e) => {
  //   e.preventDefault();
  //   const newData = addressess.map((item, i) => ({
  //     ...item,
  //   }));

  //   const isAddressValid = addressess.every(
  //     (address) =>
  //       address.PracticeName.trim() !== "" &&
  //       address.AddressLine1.trim() !== "" &&
  //       address.City.trim() !== "" &&
  //       address.PhoneNumber.trim() !== "" &&
  //       address.PreferredContact.trim() !== "" &&
  //       address.ZipCode.trim() !== "" &&
  //       address.FaxNumber.trim() !== "" &&
  //       address.State.trim() !== "" &&
  //       address.County.trim() !== "" &&
  //       address.Country.trim() !== "" &&
  //       address.E_mail.trim() !== ""
  //   );

  //   const isPhoneNumberValid = addressess.every(
  //     (address) => address.PhoneNumber.trim().length >= 8
  //   );

  //   const arePrimaryAndSharedValid = newData.every(
  //     (address) => address.Primary !== ""
  //   );

  //   if (
  //     row.FirstName.trim() === "" ||
  //     row.NPINumber === "" ||
  //     row.LastName === "" ||
  //     row.MedicalLicenseNumber === "" ||
  //     !isAddressValid ||
  //     !isPhoneNumberValid ||
  //     !arePrimaryAndSharedValid
  //   ) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Please fill in all the required fields in the form.",
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You want to add as Provider",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, submit it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         axios
  //           .post(`${process.env.REACT_APP_BASE_URL}users/addprovider`, {
  //             newData,
  //             ...row,
  //             DOB: formatDate(selectedDate),
  //           })
  //           .then((res) => {
  //             setRow({
  //               FirstName: "",
  //               MiddleName: "",
  //               LastName: "",
  //               SexType: "",
  //               DOB: "",
  //               NPINumber: "",
  //               MedicalLicenseNumber: "",
  //               TitleType: "",
  //               ProviderType: "",
  //               SpecialityType: "",
  //               ReferralSourceType: "",
  //               CommunicationType: "",
  //             });
  //             setAddressess([
  //               {
  //                 PracticeName: "",
  //                 AddressLine1: "",
  //                 AddressLine2: "",
  //                 City: "",
  //                 ZipCode: "",
  //                 County: "",
  //                 Country: "",
  //                 PhoneNumber: "",
  //                 FaxNumber: "",
  //                 E_mail: "",
  //                 PreferredContact: "",
  //                 Primary: "",
  //                 Shared: "",
  //                 State: "",
  //               },
  //             ]);
  //             Swal.fire({
  //               title: "Success!",
  //               text: res?.data?.message,
  //               icon: "success",
  //             });
  //           })
  //           .catch((error) => {
  //             Swal.fire({
  //               icon: "error",
  //               title: "Oops...",
  //               text: error.response.data.message,
  //             });
  //           });
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         // Use SweetAlert for displaying a cancellation message
  //         Swal.fire({
  //           title: "Cancelled",
  //           text: "Your data submission has been cancelled.",
  //           icon: "error",
  //         });
  //       }
  //     });
  //   }
  // };

  const handlePostData = (e) => {
    e.preventDefault();
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.classList.remove("error-border");
    });

    const newData = addressess.map((item, i) => ({
      ...item,
    }));

    const isAddressValid = addressess.every(
      (address) =>
        address.PracticeName.trim() !== "" &&
        address.AddressLine1.trim() !== "" &&
        address.City.trim() !== "" &&
        address.PhoneNumber.trim() !== "" &&
        address.PreferredContact.trim() !== "" &&
        address.ZipCode.trim() !== "" &&
        address.FaxNumber.trim() !== "" &&
        address.State.trim() !== "" &&
        address.County.trim() !== "" &&
        address.Country.trim() !== "" &&
        address.E_mail.trim() !== ""
    );
    const isPhoneNumberValid = addressess.every(
      (address) => address.PhoneNumber.trim().length >= 8
    );
    const arePrimaryAndSharedValid = newData.every(
      (address) => address.Primary !== ""
    );

    if (
      row.FirstName.trim() === "" ||
      row.NPINumber === "" ||
      row.LastName === "" ||
      row.MedicalLicenseNumber === "" ||
      !isAddressValid ||
      !isPhoneNumberValid ||
      !arePrimaryAndSharedValid
    ) {
      // Add red border to empty required input fields
      inputElements.forEach((input) => {
        const fieldName = input.getAttribute("name");
        if (!fieldName || !row[fieldName.trim()]) {
          input.classList.add("error-border");
        }
      });

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the required fields in the form.",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to add as Provider",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${process.env.REACT_APP_BASE_URL}users/addprovider`, {
              newData,
              ...row,
              DOB: formatDate(selectedDate),
            })
            .then((res) => {
              // Reset form fields
              setRow({
                FirstName: "",
                MiddleName: "",
                LastName: "",
                SexType: "",
                DOB: { selectedDate: "" },
                NPINumber: "",
                MedicalLicenseNumber: "",
                TitleType: "",
                ProviderType: "",
                SpecialityType: "",
                ReferralSourceType: "",
                CommunicationType: "",
              });
              setAddressess([
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
                  Primary: "",
                  Shared: "",
                  State: "",
                },
              ]);
              Swal.fire({
                title: "Success!",
                text: res?.data?.message,
                icon: "success",
              });
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Use SweetAlert for displaying a cancellation message
          Swal.fire({
            title: "Cancelled",
            text: "Your data submission has been cancelled.",
            icon: "error",
          });
        }
      });
    }
  };

  const handleDelete = (i) => {
    if (i !== 0) {
      const newArr = addressess.filter((item, index) => index !== i);
      setAddressess(newArr);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    const form = document.getElementById("yourFormId");

    if (form) {
      Array.from(form.elements).forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = "";
        } else if (element.tagName === "SELECT") {
          element.value = "";
        }
      });
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
                    Add Provider
                  </h2>
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
                  id="yourFormId"
                  onSubmit={handlePostData}
                >
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title">Demographic Information</h6>
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
                          <label className="form-label">
                            Last Name<span className="AsteriskSymbol">*</span>
                          </label>
                          <input
                            required
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
                            value={row?.SexType}
                            onChange={(e) => handleChangePost(e)}
                          >
                            <option>Select</option>
                            {sexData?.map((item, i) => {
                              return (
                                <option key={i} value={item.id}>
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
                              selected={selectedDate}
                              onChange={handleChange}
                              dateFormat="MM-dd-yyyy"
                              placeholderText="MM-DD-YYYY"
                              maxDate={new Date()}
                              yearDropdown
                              showYearDropdown
                              scrollableYearDropdown
                              class="form-control date"
                              value={row.DOB}
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
                            type="text"
                            className="form-control"
                            name="NPINumber"
                            value={row.NPINumber}
                            required
                            onChange={handleChangePost}
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
                            id="MedicalLicenseNumber"
                            value={row.MedicalLicenseNumber}
                            onChange={handleChangePost}
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
                            name="TitleType"
                            value={row.TitleType}
                            onChange={handleChangePost}
                          >
                            <option selected>Select</option>
                            {titleData?.map((item, i) => {
                              return (
                                <option key={i} value={item.id}>
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
                            name="ProviderType"
                            value={row.ProviderType}
                            onChange={handleChangePost}
                            className="form-select"
                          >
                            <option selected>Select</option>
                            {providerData?.map((item, i) => {
                              return (
                                <option key={i} value={item.id}>
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
                            name="SpecialityType"
                            value={row.SpecialityType}
                            onChange={handleChangePost}
                            className="form-select"
                          >
                            <option selected>Select</option>
                            {specialityData?.map((item, i) => {
                              return (
                                <option key={i} value={item.id}>
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
                            name="ReferralSourceType"
                            value={row.ReferralSourceType}
                            onChange={handleChangePost}
                          >
                            <option selected>Select</option>
                            {referralSourceData?.map((item, i) => {
                              return (
                                <option key={i} value={item.id}>
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
                            name="CommunicationType"
                            value={row.CommunicationType}
                            onChange={handleChangePost}
                          >
                            <option selected>Select</option>
                            {communicationData?.map((item, i) => {
                              return (
                                <option key={i} value={item.id}>
                                  {item.Type}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {addressess.map((item, i) => (
                    <div className="card mt-3" key={i}>
                      <div className="card-header d-flex justify-content-between align-item-center">
                        <h6 className="card-title">Contact Information</h6>
                        {i !== 0 && addressess.length - 1 === i && (
                          <span>
                            <button
                              type="button"
                              onClick={() => handleDelete(i)}
                              className="closemoreAddress"
                            >
                              Close
                            </button>
                          </span>
                        )}
                      </div>
                      <div className="card-body">
                        <div className="row g-3 ">
                          <div className="col-12 d-flex">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="primary"
                                id="primary"
                                defaultValue={addressess[i].Primary}
                                onChange={(e) => {
                                  handlePrimaryClick(e, i);
                                }}
                                checked={addressess[i].Primary}
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
                                name={`shared${i}`}
                                id={`shared${i}`}
                                defaultValue={addressess[i].Shared}
                                onChange={(e) => {
                                  handalShared(e, i);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`shared${i}`}
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
                              name="PracticeName"
                              value={addressess[i].PracticeName}
                              onChange={(e) => handleAddress(e, i)}
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
                              onChange={(e) => handleAddress(e, i)}
                              value={addressess[i].AddressLine1}
                              required
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">Address Line 2</label>
                            <input
                              className="form-control"
                              type="text"
                              name="AddressLine2"
                              value={addressess[i].AddressLine2}
                              onChange={(e) => handleAddress(e, i)}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              City<span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              type="text"
                              name="City"
                              value={addressess[i].City}
                              onChange={(e) => handleAddress(e, i)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              State<span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              type="text"
                              name="State"
                              onChange={(e) => handleAddress(e, i)}
                              value={addressess[i].State}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              County<span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              type="text"
                              name="County"
                              value={addressess[i].County}
                              onChange={(e) => handleAddress(e, i)}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Zip Code<span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              type="number"
                              name="ZipCode"
                              value={addressess[i].ZipCode}
                              onChange={(e) => handleAddress(e, i)}
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                              max={99999999}
                              min={100000}
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
                            <label className="form-label">
                              Country<span className="AsteriskSymbol">*</span>
                            </label>
                            <input
                              type="text"
                              name="Country"
                              value={addressess[i].Country}
                              onChange={(e) => handleAddress(e, i)}
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
                              <span class="input-group-text" id="basic-addon16">
                                <i class="fa fa-phone"></i>
                              </span>
                              <input
                                type="number"
                                value={addressess[i].PhoneNumber}
                                name="PhoneNumber"
                                style={{
                                  WebkitAppearance: "none",
                                  MozAppearance: "textfield",
                                }}
                                onInput={(e) => {
                                  if (e.target.value.length > 10) {
                                    e.target.value = e.target.value.slice(
                                      0,
                                      10
                                    );
                                  }
                                }}
                                onChange={(e) => handleAddress(e, i)}
                                max={9999999999}
                                min={1000000000}
                                class="form-control phone-number"
                                placeholder="Ex: +00 (000) 000-00-00"
                                aria-label="phone-number"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              Alternate Number
                              <span className="AsteriskSymbol">*</span>
                            </label>
                            <div class="input-group">
                              <span class="input-group-text" id="basic-addon16">
                                <i class="fa fa-phone"></i>
                              </span>
                              <input
                                type="number"
                                required
                                name="PreferredContact"
                                value={addressess[i].PreferredContact}
                                onChange={(e) => handleAddress(e, i)}
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
                              value={addressess[i].FaxNumber}
                              onChange={(e) => handleAddress(e, i)}
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                              max={9999999999}
                              min={1000000000}
                              onInput={(e) => {
                                if (e.target.value.length > 10) {
                                  e.target.value = e.target.value.slice(0, 10);
                                }
                              }}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3">
                            <label className="form-label">
                              E-mail<span className="AsteriskSymbol">*</span>
                            </label>
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
                                name="E_mail"
                                value={addressess[i].E_mail}
                                onBlur={(e) => handleBlur(e, i)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-12 mt-4 text-end">
                    <button
                      type="button"
                      className="btn add-more-btn d-inline "
                      onClick={addmoreAddress}
                      disabled={!isValidEmail}
                    >
                      Add More Addresss
                    </button>
                    <button
                      type="reset"
                      onClick={handleClear}
                      className="btn submit-btn d-inline ms-3"
                      disabled={!isValidEmail}
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="btn submit-btn d-inline ms-3"
                      disabled={!isValidEmail}
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

export default AddProvider;
