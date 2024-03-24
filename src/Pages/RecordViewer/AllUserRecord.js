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

function AllUserRecord() {
  const convertTimestampToDateFormat = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}users?stage=completed`)
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
      new DataTable('#userList', {
      });
    }
  }, [loading]);

  const handleDeleteClick = (id) => {
    // alert(id);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}users/archive`, {
        id,
      })
      .then((res) => {
        toast.success(res.data.message, { autoClose: 1000 });
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}users?stage=completed`
          )
          .then((res) => {
            // console.log(res.data.data);
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
                    All User Records</h2>
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
                  <div className="card-body" style={{overflowX:"scroll"}}>
                    <table id="userList" className="table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>S.No.</th>
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Phone No.</th>
                          <th>System Login</th>
                          <th>Linked Account</th>
                          <th>Status</th>
                          <th>Created On</th>
                          <th>Last Login Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        {data?.length && data?.map((  item, i) => (
                          <tr key={i}>
                            <td>
                              {i + 1 || 'NA'}
                            </td>
                            <td>{(item?.FirstName || 'NA') + " " + item?.MiddleName + " " + item?.LastName}</td>
                            <td>
                              {item?.E_Mail}
                            </td>
                            <td>
                              {item?.PhoneNumber}
                            </td>
                            <td>
                              {item?.SystemLogin}
                            </td>
                            <td>
                              {item?.ProviderId}
                            </td>
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
                              <td>{convertTimestampToDateFormat(item?.createdAt)}</td>
                              <td>{convertTimestampToDateFormat(item?.createdAt)}</td>
                            <td className="table-actions">
                              <a onClick={() => handleDeleteClick(item.id)} className="btn btn-sm btn-outline-danger"><i className="fa fa-trash"></i></a>
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

export default AllUserRecord;
