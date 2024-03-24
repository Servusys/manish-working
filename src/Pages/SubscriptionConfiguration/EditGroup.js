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
import { toast } from 'react-toastify'
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Modal,Button } from "@mui/material";
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
function EditGroup() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}subscription/getGroup`)
        .then(function (res) {
          console.log(res?.data?.message);
          setData(res?.data?.message);
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


  useEffect(()=>{console.log(data)},[data])
  const [records, setRecords] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [Demographic, setDemographic] = useState({
    Description: "",
    GroupName: "",
    Active: "",
    roleData: "",
  });
  const [roleData, setRoleData] = useState([]);
  // const [data, setData] = useState([]);
  const [addressExpand, setAddressExpand] = useState(false);
  const [addressess, setAddressess] = useState([
    {
      userAccount: "",
    },
  ]);
  const [address, setAddress] = useState({
    userAccount: "",
  });

  const handleExpand = () => {
    setAddressess((prev) => [...prev, address]);
  };

  const handleAddress = (e, i) => {
    const { name, value } = e.target;

    const isAlphabetic = /^[A-Za-z\s]+$/;

    const updatedAddresses = addressess.map((address, index) => {
      if (index === i) {
        if (isAlphabetic.test(value) || value === "") {
          return {
            ...address,
            [name]: value,
          };
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
      .then((res) => {
        console.log("USER>>", res.data.data);
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleServiceChange = (e, index) => {
    const { value } = e.target;

    setDemographic((prevDemographic) => {
      return {
        ...prevDemographic,
        Users: prevDemographic.Users.map((item, i) => {
          if (i === index) {
            return data.find((d) => d.id == value);
          }
          return item;
        }),
      };
    });
  };

  const handleServiceRemove = (id, grpID) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}subscription/removeUser?userId=${id}&groupId=${grpID}`
      )
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}subscription/getGroupmember?groupId=${grpID}`
          )
          .then((res) => {
            console.log(res.data.data);
            const userAccountData = res?.data?.data;
            setDemographic(userAccountData);
            setRoleData(userAccountData.Users);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilter = (e) => {
    const inputValue = e.target.value;
    const newData = originalRecords.filter((row) => {
      return (
        row?.GroupName.toLowerCase().includes(inputValue.toLowerCase()) ||
        row?.id == +inputValue
      );
    });
    setRecords(newData);
  };

  const handleSubmit = async (id) => {
    try {
      setOpen1(false);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}subscription/getGroupmember?groupId=${id}`
      );
      console.log("DEMODATA", response.data);
      const userAccountData = response?.data?.data;
      setDemographic(userAccountData);
      setRoleData(userAccountData.Users);
      setOpen1(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}subscription/getGroup`)
      .then((res) => {
        console.log("DATA>>", res.data.message);
        setOriginalRecords(res?.data?.message);
        setRecords(res?.data?.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (name === "GroupName") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setDemographic({
          ...Demographic,
          [name]: capitalizeFirstLetter(value),
        });
      }
    } else {
      setDemographic({ ...Demographic, [name]: value });
    }
  };

  const handleFinalUpdate = () => {
    if (Demographic?.GroupName === "") {
      alert("Please fill the Details");
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}subscription/editGroup`, {
          ...Demographic,
        })
        .then((res) => {
          alert(res.data.message);
          setOpen1(false);
          const updatedRecords = records.map((user) => {
            if (user.id === Demographic.id) {
              return { ...user, ...Demographic };
            }
            return user;
          });
          setRecords(updatedRecords);
          axios
            .get(`${process.env.REACT_APP_BASE_URL}subscription/getGroup`)
            .then((res) => {
              console.log(res.data.data);
              setOriginalRecords(res?.data?.message);
              setRecords(res?.data?.message);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  };

  const handleCloseModal = () => {
    setOpen1(false);
  };

  const handleExpandAddress = () => {
    setAddressExpand(true);
  };

  const handleExpandAddressClose = () => {
    setAddressExpand(false);
  };

  const handleUpdateDataThree = () => {
    const list = addressess.map((item, i) => ({
      ...item,
    }));
    axios
      .put(`${process.env.REACT_APP_BASE_URL}subscription/addUser`, {
        list,
        groupId: Demographic.id,
      })
      .then((res) => {
        console.log(res.data.data);
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleRemove = (index) => {
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
        
      <Modal
        open={open1}
        onClose={() => setOpen1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="tw-text-center tw-font-bold tw-bg-gray-500 tw-text-white p-2 tw-text-lg">
            Group Information
            <button
              className="tw-absolute tw-z-[100]  tw-right-[2%] tw-text-red-700"
              onClick={() => setOpen1(false)}
            >
              <HighlightOffIcon className="deleteIcon"/>
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
                            autoComplete="fdsgh"
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
                    <div className="tw-w-[150px]">
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
                  <div className="tw-w-[100%]">
                    <div className="md:tw-grid tw-grid-cols-2 tw-gap-x-6 tw-gap-y-2 tw-mt-2">
                      <div className="sm:tw-col-span-2">
                        <label
                          htmlFor="Subscription"
                          className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                        >
                          Group Name :
                        </label>
                        <div className="">
                          <input
                            type="text"
                            name="GroupName"
                            value={Demographic?.GroupName}
                            onChange={(e) => handleChange(e)}
                        className=' form-control w-50'
                          />
                        </div>
                      </div>

                      <div className="sm:tw-col-span-2">
                        <label
                          htmlFor="Description"
                          className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                        >
                          General Description :
                        </label>
                        <div className="">
                          <textarea
                            rows={4}
                            type="text"
                            name="Description"
                            value={Demographic?.Description}
                            onChange={(e) => handleChange(e)}
                          
                            className='form-control w-50'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tw-w-full  tw-border-[1px] tw-bg-gray-100  tw-border-gray-300 tw-text-gray-900 tw-pb-5 demo">
                <div className="px-3 py-2">
                  <div className=" tw-w-[100%]">
                    {roleData?.map((items, i) => {
                      return (
                        <>
                          <div
                            className="tw-w-[40%] tw-pr-5 my-2 tw-flex"
                            key={items.id}
                          >
                            <div className="tw-w-[100%]">
                              <select
                                onChange={(e) => handleServiceChange(e, i)}
                                name="service"
                              className='form-control '
                              >
                                <option value="0">Select</option>
                                {data?.map((item, jk) => {
                                  console.log({item})
                                  return (
                                    <option
                                      key={jk}
                                      value={item?.id}
                                      selected={
                                        item.id == roleData[i]?.id
                                          ? true
                                          : false
                                      }
                                    >
                                      {item.id +
                                        " " +
                                        item.FirstName +
                                        " " +
                                        item.LastName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <span
                              className="groupDelet mx-1 tw-cursor-pointer"
                              onClick={() =>
                                handleServiceRemove(
                                  roleData[i].id,
                                  Demographic.id
                                )
                              }
                            >
                              X
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="tw-flex tw-justify-end tw-gap-x-2">
                <button
                  type="button"
                  onClick={() => handleExpandAddress()}
                  className='btn btn-outline-success'
                  // className="rounded-sm mr-5 px-2 h-[30px] bg-gray-300 text-sm font-med text-black shadow-sm hover:bg-gray-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  + Add More User
                </button>
                <button
                  type="button"
                  onClick={() => handleExpandAddressClose()}
                  className='btn btn-outline-danger'
                  // className="rounded-sm mr-5 px-5 h-[30px] bg-gray-300 text-sm font-med text-black shadow-sm hover:bg-gray-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Close
                </button>
              </div>

              {addressExpand && (
                <>
                  <form method="post" action="javascript:void(0)">
                    <div className="tw-w-full tw-bg-white tw-border-[1px]  tw-border-gray-300 tw-text-gray-900 tw-pb-5 demo tw-flex tw-flex-wrap">
                      {addressess.map((item, i) => {
                        return (
                          <>
                            <div className="md:tw-grid tw-grid-cols-1 py-1 px-3 tw-gap-x-6 tw-gap-y-2 mt-2">
                              <div className="sm:tw-col-span-2">
                                <label
                                  htmlFor="name"
                                  className="tw-block tw-text-[14px] tw-font-thin tw-leading-6"
                                >
                                  User Account :
                                </label>
                                <div className="tw-flex">
                           
                                  <select
                                    name="userAccount"
                                    value={addressess[i].userAccount}
                                    onChange={(e) => handleAddress(e, i)}
                                    className='form-control '
                                    // className="w-full rounded-sm border-0 py-0.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                                  >
                                    <option value="0">Select</option>
                                    {data?.map((item, ij) => {
                                      console.log({item})
                                      return (
                                        <option key={ij} value={item.id}>
                                          {item.id +
                                            " " +
                                            item.FirstName +
                                            " " +
                                            item.LastName}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {addressess.length !== 1 && (
                                    <span
                                      className="groupDelet tw-cursor-pointer"
                                      onClick={() => handleRemove(i)}
                                    >
                                      X
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {addressess.length - 1 === i && (
                              <div className="tw-w-[100%] tw-flex tw-justify-end ">
                                <div className="mt-2">
                                  <button
                                    type="button"
                                    onClick={() => handleExpand()}
                                    className='btn btn-outline-success'
                                    // className="rounded-sm mr-5 h-[30px] px-5 bg-gray-300 text-sm font-med text-gray-900 hover:text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
                            <div className="flex justify-end w-[100%] mt-2">
                              {addressess.length - 1 === i && (
                                <button
                                  type="submit"
                                  onClick={handleUpdateDataThree}
                                  className='btn btn-outline-success'
                                  // className="rounded-sm mr-5 px-5 h-[35px] bg-blue-500 text-sm font-med text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                  Add New User
                                </button>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </form>
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
                          <th style={{ width: "50px" }}>Group ID</th>
                          <th>Group Name</th>
                          {/* <th>Default E-mail</th> */}
                          <th>Description</th>
                          <th>Created On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>S.No.</th>
                          <th>Deadline</th>                                                    <th>Prograss</th>
                          {/* <th>Lead</th> */}
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {data?.length && data?.map((item, i) => (
                          <tr key={i}>
                            <td>
                              {i + 1 || 'NA'}
                            </td>
                            <td>{item?.id}</td>
                            <td>{item?.GroupName}</td>
                            {/* <td>
                            {item?.email}
                            </td> */}
                            <td>{item?.Description}</td>
                            <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                            <td><span className="badge bg-success">Active</span></td>
                            <td className="table-actions">
                              <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => handleSubmit(item?.id)}><i className="fa fa-eye"></i></a>
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

export default EditGroup;
