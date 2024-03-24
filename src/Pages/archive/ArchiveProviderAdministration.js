import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import "datatables.net-dt/css/dataTables.dataTables.css";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { toast } from "react-toastify";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

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
  mt: "10%",
  pb: "1%",
  overflow: "scroll",
  height: "80%",
};

function ArchiveProviderAdministration() {
  const [open1, setOpen1] = useState(false);
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);

  const handleFilter = (e) => {
    const inputValue = e.target.value;
    const newData = originalRecords.filter((row) => {
      return (
        row?.FirstName.toLowerCase().includes(inputValue.toLowerCase()) ||
        row?.NPINumber.toLowerCase().includes(inputValue.toLowerCase()) ||
        row?.MedicalLicenseNumber.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        row?.PhoneNumber.toLowerCase().includes(inputValue.toLowerCase()) ||
        row?.id == +inputValue
      );
    });
    setRecords(newData);
  };

  const handleClickData = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}users/getArchiveHistory?type=providers&productId=${id}`
      )
      .then((res) => {
        console.log("HistoryDATA", res.data.message);
        setData(res?.data?.message);
        setOpen1(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}users/getProvider?archive=1`)
      .then((res) => {
        console.log(res.data.data);
        // setData(res.data.data);
        setOriginalRecords(res?.data?.data);
        setRecords(res?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const restoreClick = (data, id) => {
    // alert(id);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}users/ProviderRestore`, {
        id,
        archiveId: data?.id,
      })
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        axios
          .get(`${process.env.REACT_APP_BASE_URL}users/getProvider?archive=1`)
          .then((res) => {
            console.log(res.data.data);
            setRecords(res?.data?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClick = (id) => {
    // alert(id);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}users/getArchiveHistory?type=providers&productId=${id}`
      )
      .then((res) => {
        console.log("HistoryDATA", res.data.message);
        // restoreClick()
        let data1 = res.data.message?.filter((i) => {
          return i?.RestoreDate == null;
        });
        restoreClick(data1[0], id);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log({ records });
  }, [records]);
  useEffect(() => {
    if (!isLoading) {
      new DataTable("#userList", {});
    }
  }, [isLoading]);
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
                    Archive Provider Administration
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
                          <th>E-mail</th>
                          <th>NPI No.</th>
                          <th>ML No.</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.length &&
                          records.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1 || "NA"}</td>
                              <td>
                                {(item.FirstName || "NA") +
                                  " " +
                                  item.MiddleName +
                                  " " +
                                  item.LastName}
                              </td>
                              <td>{item.ProviderAddresses[0].PhoneNumber}</td>
                              <td>{item.ProviderAddresses[0].Email}</td>
                              <td>{item.NPINumber}</td>
                              <td>{item.MedicalLicenseNumber}</td>
                              <td>
                                <span className="badge bg-success">Active</span>
                              </td>
                              <td className="table-actions">
                                <a
                                  href="#"
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleClickData(item.id)}
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                                <a
                                  href="#"
                                  onClick={() => handleClick(item.id)}
                                  className="btn btn-sm btn-outline-success"
                                >
                                  <RestoreFromTrashIcon />
                                </a>
                                {/* <a
                                  href="#"
                                  className="btn btn-sm btn-outline-danger"
                                >
                                  <i className="fa fa-trash"></i>
                                </a> */}
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
      <Modal
        open={open1}
        onClose={() => setOpen1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="tw-text-center tw-font-bold tw-bg-gray-500 tw-text-white p-2 tw-text-lg">
            Archive And Restoration History
            <button
              className="tw-absolute tw-z-[100]  tw-right-[2%] tw-text-red-700"
              onClick={() => setOpen1(false)}
            >
              <HighlightOffIcon className="deleteIcon" />
            </button>
          </div>

          <div className="tw-w-[100%] tw-mx-auto tw-bg-white tw-border-[1px]  tw-text-gray-900 tw-border-gray-300 tw-pb-5 demo">
            <div className="tw-border-b-[1px] tw-py-1 tw-px-3 tw-bg-gray-50 tw-items-center tw-mt-2">
              <p className="tw-text-xl tw-font-medium tw-leading-6">
                Archive History
              </p>
            </div>
            <div className="tw-mb-2">
              <div className="md:tw-grid tw-grid-cols-6 tw-px-3 tw-gap-x-6 tw-gap-y-2 tw-mt-2">
                {data?.length > 0 &&
                  data?.map((item, dt) => {
                    return (
                      <>
                        <div key={dt} className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Provider ID : &nbsp;
                            {item?.productId || "NA"}
                          </label>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            Archived Date : &nbsp;
                            {item?.ArchivedDate ? (
                              <>
                                {new Date(item?.ArchivedDate).toLocaleString(
                                  "en-US"
                                )}
                              </>
                            ) : (
                              "NA"
                            )}
                          </label>
                        </div>

                        <div className="sm:tw-col-span-2">
                          <label
                            htmlFor="city"
                            className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                          >
                            RestoreDate : &nbsp;{" "}
                            {item?.RestoreDate ? (
                              <>
                                {new Date(item?.RestoreDate).toLocaleString(
                                  "en-US"
                                )}
                              </>
                            ) : (
                              "NA"
                            )}
                          </label>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ArchiveProviderAdministration;
