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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Chart1 from "../TemplateConfiguration/Chart/Chart1";
import Chart2 from "../TemplateConfiguration/Chart/Chart2";
import Chart3 from "../TemplateConfiguration/Chart/Chart3";
import Chart4 from "../TemplateConfiguration/Chart/Chart4";
import Chart5 from "../TemplateConfiguration/Chart/Chart5";
import Chart6 from "../TemplateConfiguration/Chart/Chart6";
import Chart7 from "../TemplateConfiguration/Chart/Chart7";
import Chart8 from "../TemplateConfiguration/Chart/Chart8";
import Chart9 from "../TemplateConfiguration/Chart/Chart9";
import Chart10 from "../TemplateConfiguration/Chart/Chart10";
import Chart11 from "../TemplateConfiguration/Chart/Chart11";
import Chart12 from "../TemplateConfiguration/Chart/Chart12";
import Chart13 from "../TemplateConfiguration/Chart/Chart13";
import Chart14 from "../TemplateConfiguration/Chart/Chart14";
import Chart15 from "../TemplateConfiguration/Chart/Chart15";
import Chart16 from "../TemplateConfiguration/Chart/Chart16";
import Chart17 from "../TemplateConfiguration/Chart/Chart17";
import Chart18 from "../TemplateConfiguration/Chart/Chart18";
import Chart19 from "../TemplateConfiguration/Chart/Chart19";
import Chart20 from "../TemplateConfiguration/Chart/Chart20";
import Chart21 from "../TemplateConfiguration/Chart/Chart21";
import Chart22 from "../TemplateConfiguration/Chart/Chart22";
import Chart23 from "../TemplateConfiguration/Chart/Chart23";
import Chart24 from "../TemplateConfiguration/Chart/Chart24";
import Chart25 from "../TemplateConfiguration/Chart/Chart25";
import Chart26 from "../TemplateConfiguration/Chart/Chart26";
import Chart27 from "../TemplateConfiguration/Chart/Chart27";
import Chart28 from "../TemplateConfiguration/Chart/Chart28";
import Chart29 from "../TemplateConfiguration/Chart/Chart29";
import Chart30 from "../TemplateConfiguration/Chart/Chart30";
import Chart31 from "../TemplateConfiguration/Chart/Chart31";
import Chart32 from "../TemplateConfiguration/Chart/Chart32";
import Chart33 from "../TemplateConfiguration/Chart/Chart33";
import Chart34 from "../TemplateConfiguration/Chart/Chart34";
import Chart35 from "../TemplateConfiguration/Chart/Chart35";
import Chart36 from "../TemplateConfiguration/Chart/Chart36";

function KeyMetrics() {
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
                    Kpi Metrics
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
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart1 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart4 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart5 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart6 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart7 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart8 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart9 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart10 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart11 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart12 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart13 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart14 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart15 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart16 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart17 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart18 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart21 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart22 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart23 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart24 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart25 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart26 />
                </div>
              </div>
              
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart28 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart30 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart31 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart32 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart33 />
                </div>
              </div>
              <div className="col-md-4 chart-box-container">
                <div>
                  <Chart35 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyMetrics;
