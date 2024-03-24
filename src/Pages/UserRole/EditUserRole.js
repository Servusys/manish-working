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

function EditUserRole() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [showRow, setShowRow] = useState(false);
  const [records, setRecords] = useState([]);
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [userRole, setUserRole] = useState({
    UserRoleName: "",
    Description: "",
    active: "",
    Template: [],
  });
  const [Template, setTemplate] = useState();
  const [defaultTemplate, setDefaultTemplate] = useState();
  const [subTemplate, setSubTemplate] = useState();
  const [addressExpand, setAddressExpand] = useState(false);
  const [templates, setTemplates] = useState();
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}userrole?stage=all`)
        .then(function (res) {
          console.log(res?.data?.data);
          const updatedRecords = res?.data?.data?.map((item) => {
            const defaultTemp = item.Templates.filter(
              (filter) => filter.userTemplate.defaultTemplate === true
            );

            const subTemplate = item.Templates.filter(
              (filter) => filter.userTemplate.defaultTemplate !== true
            );

            return {
              name: item.UserRoleName,
              description: item.Description,
              defaultTemp: defaultTemp[0],
              subTemplate: subTemplate,
              id: item.id,
              createdAt: item.createdAt,
              active: item.active,
            };
          });
          console.log({ updatedRecords });
          setData(updatedRecords);
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
      new DataTable("#userList", {
        initComplete: function () {},
      });
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
                    All User Role Records
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
                  <div className="card-body overflow-auto">
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>S.No.</th>
                          <th style={{ width: "50px" }}>User Role ID</th>
                          <th>User Role Name</th>
                          <th>Description</th>
                          <th>Default Template</th>
                          <th>Sub Template</th>
                          <th>Status</th>
                          <th>Created On</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.length &&
                          data?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1 || "NA"}</td>
                              <td>{item?.id}</td>
                              <td>{item?.name}</td>
                              <td>{item?.description}</td>
                              <td>{item?.defaultTemp?.name}</td>
                              <td>
                                {item?.subTemplate
                                  ? item?.subTemplate
                                      .map((sub) => sub.name)
                                      .filter(Boolean)
                                      .join(" ")
                                  : ""}
                              </td>
                              <td>
                                <span className="badge bg-success">Active</span>
                              </td>
                              <td>{item?.createdAt}</td>
                              <td className="table-actions">
                                <a
                                  href="#"
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                                {/* <a href="#" className="btn btn-sm btn-outline-success"><i className="fa fa-pencil"></i></a> */}
                                {/* <a href="#" className="btn btn-sm btn-outline-danger"><i className="fa fa-trash"></i></a> */}
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

export default EditUserRole;
