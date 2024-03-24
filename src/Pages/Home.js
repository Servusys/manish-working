import React from 'react'
import { Link } from 'react-router-dom'
import Preloader from '../CommonPage/Preloader'
import TopBar from '../CommonPage/TopBar'
import SideBar from '../CommonPage/SideBar'
import ToggleNavBar from '../CommonPage/ToggleNavBar'

function Home() {
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
                    Dashboard</h2>
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
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card top_counter">
                  <div className="list-group list-group-custom list-group-flush">
                    <div className="list-group-item d-flex align-items-center py-3">
                      <div className="icon text-center me-3"><i className="fa fa-user"></i> </div>
                      <div className="content">
                        <div>New Request</div>
                        <h5 className="mb-0">7</h5>
                      </div>
                    </div>
                    <div className="list-group-item d-flex align-items-center py-3">
                      <div className="icon text-center me-3"><i className="fa fa-users"></i> </div>
                      <div className="content">
                        <div>Pending Request</div>
                        <h5 className="mb-0">10</h5>
                      </div>
                    </div>
                    <div className="list-group-item d-flex align-items-center py-3">
                      <div className="icon text-center me-3"><i className="fa fa-university"></i> </div>
                      <div className="content">
                        <div>Approved Request</div>
                        <h5 className="mb-0">305</h5>
                      </div>
                    </div>
                    <div className="list-group-item d-flex align-items-center py-3">
                      <div className="icon text-center me-3"><i className="fa fa-university"></i> </div>
                      <div className="content">
                        <div>Total Request</div>
                        <h5 className="mb-0">322</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card text-center">
                  <div className="card-body">
                    <h5>User Request Analysis</h5>
                    <span className="text-muted">8% High then last month</span>
                    <div id="sparkline-pie" className="mt-3 d-flex justify-content-center"></div>
                    <div className="stats-report">
                      <div className="stat-item d-inline-block px-2 mt-4">
                        <h5 className="mb-0 fw-normal fs-6">New</h5>
                        <strong>84.60%</strong>
                      </div>
                      <div className="stat-item d-inline-block px-2 mt-4">
                        <h5 className="mb-0 fw-normal fs-6">Pending</h5>
                        <strong>15.40%</strong>
                      </div>
                      <div className="stat-item d-inline-block px-2 mt-4">
                        <h5 className="mb-0 fw-normal fs-6">Approved</h5>
                        <strong>5.10%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h6 className="card-title">User Request Statistics</h6>
                    <ul className="header-dropdown list-unstyled">
                      <li><a className="tab_btn" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Weekly">W</a></li>
                      <li><a className="tab_btn" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Monthly">M</a></li>
                      <li><a className="tab_btn active" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Yearly">Y</a>
                      </li>
                      <li className="dropdown">
                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                        <ul className="dropdown-menu dropdown-menu-end dropstart list-unstyled">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another Action</a></li>
                          <li><a className="dropdown-item" href="#">Something else</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div id="Salary_Statistics"></div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title">User request by Unit</h6>
                    <ul className="header-dropdown list-unstyled">
                      <li><a className="tab_btn" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Weekly">W</a></li>
                      <li><a className="tab_btn" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Monthly">M</a></li>
                      <li><a className="tab_btn active" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Yearly">Y</a>
                      </li>
                      <li className="dropdown">
                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropstart list-unstyled">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another Action</a></li>
                          <li><a className="dropdown-item" href="#">Something else</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div id="total_Salary" className="ct-chart"></div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title">ToDo List</h6>
                  </div>
                  <div className="card-body todo_list">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="Makers" />
                          <label className="form-check-label" htmlFor="Makers">
                            <strong>New User introduction</strong>
                          </label>
                        <span className="text-muted d-flex small">SCHEDULED FOR 3:00 P.M. ON  MARCH 10, 2024</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="Makers1"
                          defaultChecked />
                          <label className="form-check-label" htmlFor="Makers1">
                            <strong>Send email to CEO</strong>
                          </label>
                          <span className="text-muted d-flex small">SCHEDULED FOR 4:30 P.M. ON MARCH 14, 2024</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="Makers2" />
                          <label className="form-check-label" htmlFor="Makers2">
                            <strong>New Joing User Welcome kit</strong>
                          </label>
                          <span className="text-muted d-flex small">
                            <small><a href="#">John Smith</a> Job Position 1</small><br />
                          </span>
                          <span className="text-muted d-flex small">
                          <small><a href="#">Hossein Shams</a> Job Position 2</small><br />
                          </span>
                          <span className="text-muted d-flex small">
                          <small><a href="#">Maryam Amiri</a> Job Position 3</small><br />
                          </span>
                          <span className="text-muted d-flex small">
                          <small><a href="#">Mike Litorus</a> Job Position 4</small>
                          </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="Makers3" />
                          <label className="form-check-label" htmlFor="Makers3">
                            <strong>Birthday Wish</strong>
                          </label>
                          <span className="text-muted d-flex small">SCHEDULED FOR 4:30 P.M. ON MARCH 20, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title">New User Request</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Marshall Nichols</td>
                            <td><span>mail1@mail.com</span></td>
                            <td><span className="">1111 111 111</span></td>
                            <td><span id="sparkbar_uideveloper" className='d-none'></span></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Susie Willis</td>
                            <td><span>mail2@mail.com</span></td>
                            <td><span className="">1111 111 112</span></td>
                            <td><span id="sparkbar_designer1" className=" d-none"></span></td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Francisco Vasquez</td>
                            <td><span>mail3@mail.com</span></td>
                            <td><span className="">1111 111 113</span></td>
                            <td><span id="sparkbar_leader" className=" d-none"></span></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Erin Gonzales</td>
                            <td><span>mail4@mail.com</span></td>
                            <td><span className="">1111 111 114</span></td>
                            <td><span id="sparkbar_developer" className=" d-none"></span></td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Ava Alexander</td>
                            <td><span>mail5@mail.com</span></td>
                            <td><span className="">1111 111 115</span></td>
                            <td><span id="sparkbar_designer" className=" d-none"></span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title">User Structure</h6>
                  </div>
                  <div className="card-body text-center">
                    <div id="apex-TotalStudent"></div>
                    <div className="mb-3 mt-4">
                      <span className="text-muted small">Male</span>
                      <h4 className="mb-0">73%</h4>
                    </div>
                    <div>
                      <span className="text-muted small">Female</span>
                      <h4 className="mb-0">27%</h4>
                    </div>
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

export default Home