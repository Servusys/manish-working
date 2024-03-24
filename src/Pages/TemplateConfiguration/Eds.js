import React from 'react'
import EditTemplateSingle from './EditTemplateSingle'
import Preloader from '../../CommonPage/Preloader'
import TopBar from '../../CommonPage/TopBar'
import SideBar from '../../CommonPage/SideBar'
import ToggleNavBar from '../../CommonPage/ToggleNavBar'

export default function Eds() {
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
                  Dashboard
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
          <EditTemplateSingle />
          {/* <div className="row g-2 clearfix row-deck">
            <div className="col-12">
             
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  )
}
