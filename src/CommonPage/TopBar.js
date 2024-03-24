import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useSharedContext } from './SharedDataSet';
import { useNavigate } from 'react-router-dom';

function TopBar() {
    const navigate = useNavigate();
    const mobileMenuBar = () => {
        $("body").toggleClass("offcanvas-active");
    }
    const { emailValue } = useSharedContext();
    const { notificationValue } = useSharedContext();

    const [emailBtn, setEmailBtn] = useState(emailValue);
    const [notificationBtn, setNotificationBtn] = useState(notificationValue);
    useEffect(() => {
        setEmailBtn(emailValue);
        setNotificationBtn(notificationValue);
    }, [emailValue, notificationValue]);
    const handleLogout = async () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        localStorage.removeItem('subMenus');   
        localStorage.removeItem('menuType');   
        localStorage.removeItem('menuItems');  
        navigate("/")
    };
    
    return (
        <nav className="navbar navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-btn">
                    <button type="button" className="btn-toggle-offcanvas" onClick={mobileMenuBar}><i className="fa fa-bars"></i></button>
                </div>

                <div className="navbar-brand pt-1">
                    <a href="index.html" className="d-flex">
                       <img src='/logo.png'  alt='' className='tw-h-[36px]'/>
                    </a>
                </div>

                <div className="d-flex flex-grow-1 align-items-center">
                                       <div className="flex-grow-1">
                        <ul className="nav navbar-nav flex-row justify-content-end align-items-center">
                            {(emailBtn == true) ? (
                                <li><a href="app-inbox.html" className="icon-menu"><i className="fa fa-envelope"></i><span className="notification-dot"></span></a></li>
                            ) : ("")}
                            {(notificationBtn == true) ? (
                                <li className="dropdown">
                                    <a className="dropdown-toggle icon-menu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa fa-bell"></i>
                                        <span className="notification-dot"></span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end p-0 shadow notification">
                                        <ul className="list-unstyled feeds_widget">
                                            <li className="d-flex">
                                                <div className="feeds-left"><i className="fa fa-thumbs-o-up"></i></div>
                                                <div className="feeds-body flex-grow-1">
                                                    <h6 className="mb-1">7 New Feedback <small className="float-end text-muted small">Today</small></h6>
                                                    <span className="text-muted">It will give a smart finishing to your site</span>
                                                </div>
                                            </li>
                                            <li className="d-flex">
                                                <div className="feeds-left"><i className="fa fa-user"></i></div>
                                                <div className="feeds-body flex-grow-1">
                                                    <h6 className="mb-1">New User <small className="float-end text-muted small">10:45</small></h6>
                                                    <span className="text-muted">I feel great! Thanks team</span>
                                                </div>
                                            </li>
                                            <li className="d-flex">
                                                <div className="feeds-left"><i className="fa fa-question-circle"></i></div>
                                                <div className="feeds-body flex-grow-1">
                                                    <h6 className="mb-1 text-warning">Server Warning <small className="float-end text-muted small">10:50</small></h6>
                                                    <span className="text-muted">Your connection is not private</span>
                                                </div>
                                            </li>
                                            <li className="d-flex">
                                                <div className="feeds-left"><i className="fa fa-check"></i></div>
                                                <div className="feeds-body flex-grow-1">
                                                    <h6 className="mb-1 text-danger">Issue Fixed <small className="float-end text-muted small">11:05</small></h6>
                                                    <span className="text-muted">WE have fix all Design bug with Responsive</span>
                                                </div>
                                            </li>
                                            <li className="d-flex">
                                                <div className="feeds-left"><i className="fa fa-shopping-basket"></i></div>
                                                <div className="feeds-body flex-grow-1">
                                                    <h6 className="mb-1">7 New Orders <small className="float-end text-muted small">11:35</small></h6>
                                                    <span className="text-muted">You received a new oder from Tina.</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ) : ("")}
                            
                            {/* more link  */}
                            <li className="dropdown">
                                <a className="dropdown-toggle icon-menu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-sliders"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end p-2 shadow">
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-pencil-square-o"></i> <span>Basic</span></a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-sliders fa-rotate-90"></i> <span>Preferences</span></a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-lock"></i> <span>Privacy</span></a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-bell"></i> <span>Notifications</span></a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-credit-card"></i> <span>Payments</span></a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-print"></i> <span>Invoices</span></a></li>
                                    <li><a className="dropdown-item rounded-pill" href="#"><i className="me-2 fa fa-refresh"></i> <span>Renewals</span></a></li>
                                </ul>
                            </li>
                            <li><a onClick={handleLogout} className="icon-menu"><i className="fa fa-sign-out"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar