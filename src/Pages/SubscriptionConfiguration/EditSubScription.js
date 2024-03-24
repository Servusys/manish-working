import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Preloader from '../../CommonPage/Preloader'
import TopBar from '../../CommonPage/TopBar'
import SideBar from '../../CommonPage/SideBar'
import ToggleNavBar from '../../CommonPage/ToggleNavBar'
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import DataTable from 'datatables.net-dt';
import axios from 'axios';
import { Box, Modal,Button } from '@mui/material'
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from 'react-toastify'
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

function EditSubScription() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState();
  console.log("DATA>>>>>>>>>>>>", records);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [Demographic, setDemographic] = useState({
    Schedule: "",
    emailMessage: "",
    email: "",
    generalDescription: "",
    name: "",
    // Daily: "",
    // Weekly: "",
    // Monthly: "",
    // Quarterly: "",
    // BiAnnually: "",
    // Annually: "",
    active: "",
    Subscription: [],
  });
  const [category, setCategory] = useState("");
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
  const [Subscription, setSubscription] = useState();
  console.log("Sub////", Subscription);
  const [dataUser, setDataUser] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [addressExpand, setAddressExpand] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "name") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setDemographic({
          ...Demographic,
          [name]: capitalizeFirstLetter(value),
        });
      }
    } else if (name === "Schedule") {
      setDemographic({
        ...Demographic,
        Schedule: value,
      });
    } else {
      setDemographic({ ...Demographic, [name]: value });
    }
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
  
  const handleRemove = (id, subId, type) => {
    // alert(type);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}subscription?subscriptionId=${subId}&groupId=${id}&type=${type}`
      )
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        axios
          .get(`${process.env.REACT_APP_BASE_URL}subscription?id=${subId}`)
          .then((res) => {
            console.log(res.data.data);
            const userAccountData = res?.data?.data;
            setDemographic(userAccountData);
            setSubscription(userAccountData?.SubscriptionSecurity);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
    .then((res) => {
      console.log("UserAccount>>", res.data.data);
      const selectValue = res?.data?.data;
      setDataUser(selectValue);
    })
    .catch((error) => {
      console.log(error);
    });
    const fetchData = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}subscription`)
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
    axios
    .get(`${process.env.REACT_APP_BASE_URL}userRole/template`)
    .then((res) => {
      console.log(res.data.data);
      setTemplates(res?.data?.data);
    })
    .catch((error) => {
      console.log(error);
    });
    fetchData();
  }, []);


  const handleExpandAddress = () => {
    const defaultAddressess = [
      {
        SubscriptionTemplate: "",
        type: "",
        GroupAccount: "",
      },
    ];

    setAddressess(defaultAddressess);
    setAddressExpand(true);
    // setAddressExpand(true);
  };

  const handleExpandAddressClose = () => {
    setAddressess([]);
    setAddressExpand(false);
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

  const handleUserAccount = (value, i) => {
    setCategory(value);
    addressess[i] = { ...addressess[i], type: value, GroupAccount: "" };
    setAddressess([...addressess]);
  };
  const handleExpand = () => {
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
  const handleFinalUpdate = () => {
    // const newData = addressess?.map((item, i) => ({
    //   ...item,
    // }));
    const newData =
      addressess.length > 0
        ? addressess.map((item, i) => ({
            ...item,
          }))
        : [];
    if (Demographic?.name === "" || Demographic?.email === "") {
      alert("Please fill the Details");
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}subscription`, {
          ...Demographic,
          Schedule: Demographic.Schedule,
          newData,
        })
        .then((res) => {
          toast.success(res.data.message, { autoClose: 1000 });
          setOpen1(false);
          setAddressess([
            {
              SubscriptionTemplate: "",
              GroupAccount: "",
              type: category,
            },
          ]);
          setAddressExpand(false);
          const updatedRecords = records.map((user) => {
            if (user.id === Demographic.id) {
              return { ...user, ...Demographic };
            }
            return user;
          });
          setRecords(updatedRecords);
          axios
            .get(`${process.env.REACT_APP_BASE_URL}subscription`)
            .then((res) => {
              console.log(res.data.data);
              setOriginalRecords(res?.data?.data);
              setRecords(res?.data?.data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          // alert(error?.response?.data?.message);
        });
    }
  };

  const handleCloseModal = () => setOpen1(false);

  const handleSubmit = async (id) => {
    try {
      setOpen1(false);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}subscription?id=${id}`
      );
      console.log("DEMODATA", response.data);
      const userAccountData = response?.data?.data;
      setDemographic(userAccountData);
      setSubscription(userAccountData?.SubscriptionSecurity);
      setOpen1(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div id="layout" className="">
      <Preloader />
      <div id="wrapper">
        <TopBar />
        <SideBar />
        
      <Modal
        open={open1}
        onClose={() => setOpen1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="tw-text-center tw-font-bold tw-bg-gray-500 tw-text-white p-2 tw-text-lg">
            Subscription Information
            <button
              className="tw-absolute tw-z-[100]  tw-right-[2%] tw-text-red-700"
              onClick={() => setOpen1(false)}
            >
              <HighlightOffIcon className="deleteIcon" />
            </button>
          </div>

          <form>
            <div className="tw-space-y-6 tw-mt-3">
              <div className="tw-w-full  tw-border-[1px] tw-bg-gray-100 tw-text-gray-900 tw-border-gray-300 tw-pb-5 demo">
                <div className="tw-border-b-[1px] py-1 px-3 tw-bg-gray-50 tw-flex tw-justify-between tw-items-center">
                  <p className="tw-text-xl tw-font-medium tw-leading-6">
                    Subscription Information
                  </p>
                  <div className="tw-flex py-1 px-3 ">
                    <div className="tw-w-[80px] ">
                      <div className="checkbox-wrapper">
                        <div className="tw-flex tw-items-center">
                          <input
                            type="radio"
                            name="active"
                            defaultValue={true}
                            defaultChecked={Demographic?.Active === true}
                            onChange={(e) => handleChange(e)}
                            className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                          />
                          <label>Active</label>
                        </div>
                      </div>
                    </div>
                    <div className="tw-w-[150px] ">
                      <div className="checkbox-wrapper">
                        <div className="tw-flex tw-items-center">
                          <input
                            type="radio"
                            name="active"
                            defaultValue={false}
                            onChange={(e) => handleChange(e)}
                            defaultChecked={Demographic?.Active === false}
                            className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                          />
                          <label htmlFor="example-1">Inactive</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tw-flex py-1 px-3">
                  <div className="tw-w-[80%]">
                    <div className="md:tw-grid tw-grid-cols-4 tw-gap-x-6 tw-gap-y-2 tw-mt-2">
                      <div className="sm:tw-col-span-2">
                        <label
                          htmlFor="Subscription"
                          className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                        >
                          Name of Subscription{" "}
                          <span className="tw-text-red-500">*</span>
                        </label>
                        <div className="">
                          <input
                            type="text"
                            name="name"
                            value={Demographic?.name}
                            onChange={(e) => handleChange(e)}
                            className="form-control rounded-3 "
                            

                          />
                        </div>
                      </div>

                      <div className="sm:tw-col-span-2">
                        <label
                          htmlFor="DefaultEmail"
                          className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                     
                        >
                          Default Sender E-mail
                        </label>
                        <div className="">
                          <input
                            type="text"
                            name="email"
                            value={Demographic?.email}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e)}
                            className="form-control rounded-3"
                          />
                        </div>
                      </div>

                      <div className="sm:tw-col-span-2">
                        <label
                          htmlFor="Description"
                          className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                     
                        >
                          General Description
                        </label>
                        <div className="">
                          <textarea
                            rows={4}
                            type="text"
                            name="generalDescription"
                            value={Demographic?.generalDescription}
                            onChange={(e) => handleChange(e)}
                     className='form-control rounded-3'
                          />
                        </div>
                      </div>

                      <div className="sm:tw-col-span-2">
                        <label
                          htmlFor="EnailMessage"
                          className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                     
                        >
                          E-mail Message
                        </label>
                        <div className="">
                          <textarea
                            rows={4}
                            type="text"
                            name="emailMessage"
                            value={Demographic?.emailMessage||Demographic?.eMailMessage}
                            onChange={(e) => handleChange(e)}
                     className='form-control rounded-3'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tw-w-[20%] tw-ml-3">
                    <div className="tw-mt-2">
                      <p className="tw-text-medium tw-font-medium tw-leading-6 tw-text-gray-900">
                        Schedule
                      </p>
                      <div className="c">
                        <div className="tw-flex tw-items-center tw-gap-x-4">
                          <div className="mt-1">
                            <input
                              type="radio"
                              // value={Demographic.Daily}
                              value="Daily"
                              onChange={(e) => handleChange(e)}
                              defaultChecked={Demographic.Schedule === "Daily"}
                              name="Schedule"
                              className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                            />
                          </div>
                          <label
                            htmlFor="Daily"
                            className="tw-text-medium tw-leading-6 tw-text-gray-900"
                          >
                            Daily
                          </label>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-x-4">
                          <div className="mt-1">
                            <input
                              type="radio"
                              // value={Demographic.Weekly}
                              value="Weekly"
                              onChange={(e) => handleChange(e)}
                              defaultChecked={Demographic.Schedule === "Weekly"}
                              name="Schedule"
                              className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                            />
                          </div>
                          <label
                            htmlFor="city"
                            className="tw-text-medium tw-leading-6 tw-text-gray-900"
                          >
                            Weekly
                          </label>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-x-4">
                          <div className="mt-1">
                            <input
                              type="radio"
                              // value={Demographic.Monthly}
                              value="Monthly"
                              onChange={(e) => handleChange(e)}
                              defaultChecked={
                                Demographic.Schedule === "Monthly"
                              }
                              name="Schedule"
                              className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                            />
                          </div>
                          <label
                            htmlFor="city"
                            className="tw-text-medium tw-leading-6 tw-text-gray-900"
                          >
                            Monthly
                          </label>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-x-4">
                          <div className="mt-1">
                            <input
                              type="radio"
                              // value={Demographic.Quarterly}
                              value="Quarterly"
                              onChange={(e) => handleChange(e)}
                              defaultChecked={
                                Demographic.Schedule === "Quarterly"
                              }
                              name="Schedule"
                              className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                            />
                          </div>
                          <label
                            htmlFor="city"
                            className="tw-text-medium tw-leading-6 tw-text-gray-900"
                          >
                            Quarterly
                          </label>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-x-4">
                          <div className="mt-1">
                            <input
                              type="radio"
                              // value={Demographic.BiAnnually}
                              value="BiAnnually"
                              onChange={(e) => handleChange(e)}
                              defaultChecked={
                                Demographic.Schedule === "BiAnnually"
                              }
                              name="Schedule"
                              className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                            />
                          </div>
                          <label
                            htmlFor="city"
                            className="tw-text-medium tw-leading-6 tw-text-gray-900"
                          >
                            Bi Annually
                          </label>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-x-4">
                          <div className="mt-1">
                            <input
                              type="radio"
                              // value={Demographic.Annually}
                              value="Annually"
                              onChange={(e) => handleChange(e)}
                              defaultChecked={
                                Demographic.Schedule === "Annually"
                              }
                              name="Schedule"
                              className="tw-shadow-sm  sm:text-sm sm:tw-leading-6 tw-mr-[6px]"
                            />
                          </div>
                          <label
                            htmlFor="city"
                            className="tw-text-medium tw-leading-6 tw-text-gray-900"
                          >
                            Annually
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {Subscription?.length > 0 &&
                Subscription?.map((item, sub) => {
                  console.log("TARUN>>");
                  return (
                    <>
                      <div
                        key={sub}
                        className="tw-w-[100%] tw-border-[1px] tw-border-gray-500/100 tw-pb-3 bg-white tw-mt-5 demo"
                      >
                        <div className="tw-border-b-[1px] py-1 px-3 tw-bg-gray-50 tw-items-center tw-flex tw-justify-between">
                          <p className="tw-text-xl tw-font-medium tw-leading-6">
                            Subscription Security
                          </p>
                          <span
                            className="SubDelet tw-cursor-pointer"
                            onClick={() =>
                              handleRemove(
                                item?.type === "user" ? item?.id : item?.id,
                                Demographic.id,
                                item?.type
                              )
                            }
                          >
                            Remove
                          </span>
                        </div>
                        <div className="md:tw-grid tw-grid-cols-4 py-1 px-3  tw-gap-x-6 tw-gap-y-2 mt-2">
                          <div className="sm:tw-col-span-2">
                            <label
                              htmlFor="city"
                              // className="tw-block text-sm font-medium leading-6 text-gray-900"
                            >
                              Template Name :
                            </label>
                            <div className="">
                              <input
                                type="text"
                                name="name"
                                defaultValue={item?.tempDetails?.name}
                                // onChange={(e) => handleChange(e)}
                                disabled
                                className='form-control rounded-3'
                                // className="block w-[100%] rounded-sm border-0 py-0.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:tw-col-span-2">
                            <label
                              htmlFor="city"
                              // className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              <span>
                                <input
                                  type="radio"
                                  // name={`AccountType_${i}`}
                                  // onChange={() => handleUserAccount("user", i)}
                                  defaultChecked={
                                    // item?.Users?.length > 0 ? true : false
                                    item?.type == "user" ? true : false
                                  }
                                  className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                                  disabled
                                />
                                User Account
                              </span>
                              &nbsp; &nbsp;
                              <span>
                                <input
                                  type="radio"
                                  // name={`AccountType_${i}`}
                                  // onChange={() => handleUserAccount("group", i)}
                                  defaultChecked={
                                    item?.type == "group" ? true : false
                                  }
                                  className=" tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                                  disabled
                                />
                                Group Account
                              </span>
                            </label>
                            <div className="">
                              <input
                                type="text"
                                name="name"
                                // defaultValue={`${item?.Users[0]?.id + ". " + item?.Users[0]?.FirstName + " " + item?.Users[0]?.LastName}` || `${item?.Users.groups?.GroupName}`}
                                defaultValue={
                                  item?.type === "user"
                                    ? `${
                                        item?.groupDetails?.id +
                                        ". " +
                                        item?.groupDetails?.FirstName +
                                        " " +
                                        item?.groupDetails?.LastName
                                      }`
                                    : `${
                                        item?.groupDetails?.id +
                                        ". " +
                                        item?.groupDetails?.GroupName
                                      }`
                                }
                                disabled
                                className='form-control rounded-3'
                                // className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

              <div className="tw-flex tw-justify-end tw-gap-x-2 px-2">
                <button
                  type="button"
                  onClick={handleExpandAddress}
                  className='btn btn-outline-success'
                >
                  + Add More Subscription Security
                </button>
                {addressExpand && (
                  <button
                    type="button"
                    onClick={handleExpandAddressClose}
                    className='btn btn-outline-success'
                
                  >
                    Close
                  </button>
                )}
              </div>

              {addressExpand && (
                <>
                  {addressess.length > 0 &&
                    addressess?.map((item, i) => {
                      return (
                        <div className="tw-w-[100%] tw-border-[1px] tw-border-gray-500/100 tw-pb-3 tw-bg-white tw-mt-5 demo">
                          <div className="tw-border-b-[1px] py-1 px-3 tw-bg-gray-50 tw-items-center">
                            <p className="tw-text-xl tw-font-medium tw-leading-6">
                              Subscription Security
                            </p>
                          </div>
                          <div className="md:tw-grid tw-grid-cols-4 py-1 px-3  tw-gap-x-6 tw-gap-y-2 mt-2">
                            <div className="sm:tw-col-span-2">
                              <label
                                htmlFor="city"
                                className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                              >
                                Template Name :
                              </label>
                              <div className="">
                                <select
                                  name="SubscriptionTemplate"
                                  value={addressess[i].SubscriptionTemplate}
                                  onChange={(e) => handleAddress(e, i)}
                                  className='form-control rounded-3'
                                  // className="tw-block tw-w-full tw-rounded-sm border-0 tw-py-0.5 tw-shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                                >
                                  <option value="0">Select</option>
                                  {templates?.map((item, i) => {
                                    return (
                                      <option key={i} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>

                            <div className="sm:tw-col-span-2">
                              <label
                                htmlFor="city"
                                className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                              >
                                <span>
                                  <input
                                    type="radio"
                                    name={`AccountType_${i}`}
                                    onChange={() =>
                                      handleUserAccount("user", i)
                                    }
                                    checked={addressess[i].type === "user"}
                                    className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                                  />
                                  User Account
                                </span>
                                &nbsp; &nbsp;
                                <span>
                                  <input
                                    type="radio"
                                    name={`AccountType_${i}`}
                                    onChange={() =>
                                      handleUserAccount("group", i)
                                    }
                                    checked={addressess[i].type === "group"}
                                    className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 tw-mr-[6px]"
                                  />
                                  Group Account
                                </span>
                              </label>
                              <div className="">
                                <select
                                  name="GroupAccount"
                                  value={addressess[i].GroupAccount}
                                  onChange={(e) =>
                                    handleAddress(e, i, category)
                                  }
                                  className='form-control rounded-3'
                                  // className="tw-block tw-w-full tw-rounded-sm tw-border-0 py-0.5 tw-shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                                >
                                  <option value="0">Select</option>
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
                                            {item.id +
                                              "." +
                                              " " +
                                              item.GroupName}
                                          </option>
                                        );
                                      })}
                                    </>
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          {addressess.length - 1 === i && (
                            <div 
                            className="tw-flex tw-justify-end tw-mr-3 tw-mt-5 tw-gap-x-4"
                            >
                              <button
                                type="button"
                                onClick={() => handleExpand()}
                                className='btn btn-outline-success'
                                // className="rounded-sm h-[30px] px-5 bg-green-200 text-sm font-med text-gray-900 hover:text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                + Add More
                              </button>
                              {addressess.length > 0 && (
                            <div 
                            // className="tw-flex tw-justify-end tw-mr-3 tw-mt-5 tw-gap-x-4"
                            >
                              <button
                                disabled={addressess.length == 1}
                                type="button"
                                onClick={() => handleDelete(i)}
                                className='btn btn-outline-danger'
                                // className="rounded-sm h-[30px] px-3 bg-red-300 text-sm font-med text-gray-900 hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                            </div>
                          )}
                         
                        </div>
                      );
                    })}
                </>
              )}

              <div className="tw-flex tw-justify-end tw-gap-6 tw-mt-5 tw-w-[100%]">
                <Button
                  // type="submit"
                  onClick={handleFinalUpdate}
                  variant="outlined"
                  color="success"
                >
                  Accept
                </Button>
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
        <div id="main-content">
          <div className="container-fluid">

            <div className="block-header py-lg-4 py-3">
              <div className="row g-3">
                <div className="col-md-6 col-sm-12">
                  <h2 className="m-0 fs-5">
                    <ToggleNavBar />
                    All Subscription Records</h2>
                  <ul className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="index.html">sLEAP</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
                <div className="col-md-6 col-sm-12 text-md-end">
                  <div className="d-inline-flex text-start">
                    <div className="me-2">
                      <h6 className="mb-0"><i className="fa fa-user"></i> 405</h6>
                      <small>Users</small>
                    </div>
                    <span id="bh_visitors"></span>
                  </div>
                  <div className="d-inline-flex text-start ms-lg-3 me-lg-3 ms-1 me-1">
                    <div className="me-2">
                      <h6 className="mb-0"><i className="fa fa-globe"></i> 83</h6>
                      <small>Providers</small>
                    </div>
                    <span id="bh_visits"></span>
                  </div>
                  <div className="d-inline-flex text-start">
                    <div className="me-2">
                      <h6 className="mb-0"><i className="fa fa-comments"></i> 7</h6>
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
                          <th style={{ width: "50px" }}>Subscription ID</th>
                          <th>Subscription Name</th>
                          <th>Default E-mail</th>
                          <th>Description</th>
                          <th>Email Message</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    
                      <tbody>
                        {data?.length && data?.map((item, i) => (
                          <tr key={i}>
                            <td>
                              {i + 1 || 'NA'}
                            </td>
                            <td>{item?.id}</td>
                            <td>{item?.name}</td>
                            <td>
                            {item?.email}
                            </td>
                            <td>{item?.generalDescription}</td>
                            <td>{item?.emailMessage}</td>
                            <td><span className="badge bg-success">Active</span></td>
                            <td className="table-actions">
                              <a href="#" className="btn btn-sm btn-outline-secondary" onClick={()=>handleSubmit(item?.id)}><i className="fa fa-eye"></i></a>
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
  )
}

export default EditSubScription;
