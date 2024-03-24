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

function AlertTrigger() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}userRole/template?stage=all`)
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
        initComplete: function () {
          this.api()
            .columns([1, 2])
            .every(function () {
              let column = this;
              let title = column.footer().textContent;

              // Create input element
              let input = document.createElement('input');
              input.placeholder = title;
              column.footer().replaceChildren(input);

              // Event listener for user input
              input.addEventListener('keyup', () => {
                if (column.search() !== input.value) {
                  column.search(input.value).draw();
                }
              });
            });
        }
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
                    Alert Trigger</h2>
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

            Last Login :
           </div>
        </div>
      </div>
    </div>
  )
}

export default AlertTrigger;