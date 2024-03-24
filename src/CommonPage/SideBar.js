import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useSharedContext } from "./SharedDataSet";
import MetisMenu from "metismenujs";
import { toast } from "react-toastify";

function SideBar() {
  const { emailValue, updateEmailValue } = useSharedContext();
  const { notificationValue, updateNotificationValue } = useSharedContext();

  const storedValue = localStorage.getItem("localTextColor");
  const storedTheme = localStorage.getItem("theme");

  const [textColor, setTextColor] = useState(storedValue);
  const [themeChecked, setThemeChecked] = useState(false);
  const [highContrastChecked, setHighContrastChecked] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(storedTheme);

  const [emailBtn, setEmailBtn] = useState(
    localStorage.getItem("email") === "true" || false
  );
  const [notificationBtn, setNotificationBtn] = useState(
    localStorage.getItem("notification") === "true" || false
  );
  const [offlineBtn, setOfflineBtn] = useState(
    localStorage.getItem("offline") === "true" || false
  );
  const [locationState, setLocationState] = useState(
    localStorage.getItem("location") === "true" || false
  );
  const [menuItem, setMenuItem] = useState(localStorage.getItem("menuItems"));
  const [subMenu, setSubMenu] = useState(localStorage.getItem("subMenus"));
  const [menuType, setMenuType] = useState(localStorage.getItem("menuType"));
  const navigate = useNavigate();

  useEffect(() => {
    if (menuItem) {
      console.log(menuItem);
      if (menuType === "singleMenuBtn") {
        $("." + menuItem).addClass("active");
        navigate("/" + menuItem);
      } else if (menuType === "hasMenuBtn") {
        navigate("/" + menuItem);
        if ($("li").hasClass(menuItem)) {
          $("." + menuItem).addClass("active mm-show");
        }
        $("." + subMenu + "-has").addClass("mm-active active");
        $("." + subMenu + "-sub").addClass("mm-show");
      }
    } else {
      localStorage.setItem("menuItems", "dashboard");
      localStorage.setItem("menuType", "singleMenuBtn");
    }
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (!menuItem) {
      setMenuItem("dashboard");
      setSubMenu("");
    }
    if (storedValue) {
      setTextColor(storedValue);
      $("#layout").addClass("theme-" + storedValue);
    } else {
      $("#layout").addClass("theme-cyan");
    }
    if (currentTheme == "dark") {
      setHighContrastChecked(false);
      setThemeChecked(true);
    } else if (currentTheme == "high-contrast") {
      setHighContrastChecked(true);
      setThemeChecked(false);
    } else {
      setHighContrastChecked(false);
      setThemeChecked(false);
    }
  }, []);
  const colorHandle = (colorCode) => {
    setTextColor(colorCode);
    localStorage.setItem("localTextColor", colorCode);
    var t = $("#layout"),
      e = $(this),
      i = $(".choose-skin li.active").data("theme");
    $("#layout").removeClass("theme-" + i);
    $("#layout").addClass("theme-" + colorCode);
    $(".choose-skin li").removeClass("active");
  };
  const miniSideBar = () => {
    $("body").toggleClass("sidebar-mini");
  };
  const darkModeTheame = () => {
    if (themeChecked == false) {
      setThemeChecked(true);
      setHighContrastChecked(false);
      localStorage.setItem("theme", "dark");
      setCurrentTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setThemeChecked(false);
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };
  const highContrast = () => {
    if (highContrastChecked == false) {
      document.documentElement.setAttribute("data-theme", "high-contrast");
      setHighContrastChecked(true);
      setThemeChecked(false);
      localStorage.setItem("theme", "high-contrast");
      setCurrentTheme("high-contrast");
    } else {
      setHighContrastChecked(false);
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };
  const rtlMode = () => {
    $("body").toggleClass("rtl_mode");
  };
  const emailNotifyHandle = () => {
    if (emailBtn === false) {
      setEmailBtn(true);
      updateEmailValue(true);
      localStorage.setItem("email", true);
    } else {
      updateEmailValue(false);
      localStorage.setItem("email", false);
      setEmailBtn(false);
    }
  };
  const alertNotification = () => {
    if (notificationBtn === false) {
      localStorage.setItem("notification", true);
      setNotificationBtn(true);
      updateNotificationValue(true);
    } else {
      localStorage.setItem("notification", false);
      setNotificationBtn(false);
      updateNotificationValue(false);
    }
  };
  const offlineHandle = () => {
    if (offlineBtn === false) {
      toast.warning(
        "Software is now in offline mode. Network requests are disabled.",
        { autoClose: 2000 }
      );
      localStorage.setItem("offline", true);
      setOfflineBtn(true);
    } else {
      toast.success(
        "Software is now back online. Network requests are enabled.",
        { autoClose: 2000 }
      );
      localStorage.setItem("offline", false);
      setOfflineBtn(false);
    }
  };
  const locationPermission = () => {
    if (locationState === false) {
      localStorage.setItem("location", true);
      setLocationState(true);
    } else {
      localStorage.setItem("location", false);
      setLocationState(false);
    }
  };
  const singleMenu = (a, b, c) => {
    if (a != "" && b != "" && c != "") {
      localStorage.setItem("menuItems", c);
      localStorage.setItem("subMenus", a);
      localStorage.setItem("menuType", b);
    } else if (a != "" && b != "" && c == "") {
      if ($("." + a + "-has").hasClass("mm-active")) {
        $("." + a + "-has").removeClass("mm-active");
        $("." + a + "-sub").removeClass("mm-show");
      } else {
        if ($("li").hasClass("mm-active") && $("ul").hasClass("mm-show")) {
          $("li").removeClass("mm-active");
          $("ul").removeClass("mm-show");
        }
        $("." + a + "-has").addClass("mm-active");
        $("." + a + "-sub").addClass("mm-show");
      }
    }
  };
  const handleLogout = async () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    localStorage.removeItem("subMenus");
    localStorage.removeItem("menuType");
    localStorage.removeItem("menuItems");
    navigate("/");
  };
  useEffect(() => {
    const handleConnectivityChange = () => {
      setOfflineBtn(!navigator.onLine);
    };
    window.addEventListener("online", handleConnectivityChange);
    window.addEventListener("offline", handleConnectivityChange);
    return () => {
      window.removeEventListener("online", handleConnectivityChange);
      window.removeEventListener("offline", handleConnectivityChange);
    };
  }, []);

  return (
    //   Sidbar menu
    <div id="left-sidebar" className="sidebar">
      <div className="user-account p-3 mb-3">
        <div className="d-flex pb-2 mb-2 border-bottom align-items-center">
          <img
            src="/nav.jpg"
            className="avatar lg rounded me-3"
            alt="User Profile Picture"
          />{" "}
          <br />
          <div className="dropdown flex-grow-1">
            <span>Welcome &nbsp;</span>
            <Link
              to="#"
              className="dropdown-toggle user-name"
              data-bs-toggle="dropdown"
            >
              <strong>Tarun Goswami </strong>
            </Link>
            <ul className="dropdown-menu p-2 shadow-sm ">
              <li>
                <Link to="#">
                  <i className="fa fa-user me-2"></i>My Profile
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-envelope-open me-2"></i>Messages
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-cog me-2"></i>Settings
                </Link>
              </li>
              <li className="divider"></li>
              <li>
                <Link onClick={handleLogout}>
                  <i className="fa fa-power-off me-2"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row g-3">
          <div className="col">
            <h6 className="mb-0">5+</h6>
            <small className="text-muted">New</small>
          </div>
          <div className="col">
            <h6 className="mb-0">400+</h6>
            <small className="text-muted">Users</small>
          </div>
          <div className="col">
            <h6 className="mb-0">80+</h6>
            <small className="text-muted">Providers</small>
          </div>
        </div>
      </div>

      {/* nav tab: menu list */}
      <ul className="nav nav-tabs text-center mb-2" role="tablist">
        <li className="nav-item flex-fill">
          <Link
            className="px-1   nav-link active"
            id="hr_menu_nav_link"
            data-bs-toggle="tab"
            to="#hr_menu"
            role="tab"
            title="Account"
          >
            <i className="fa fa-users"></i>
          </Link>
        </li>
        <li className="nav-item flex-fill">
          <Link
            className="px-1   nav-link"
            data-bs-toggle="tab"
            to="#project_menu"
            role="tab"
            title="Analytics"
          >
            <i className="fa fa-list-alt" aria-hidden="true"></i>
          </Link>
        </li>
        <li className="nav-item flex-fill">
          <Link
            className="px-1   nav-link"
            data-bs-toggle="tab"
            to="#sub_menu"
            role="tab"
            title="Security"
          >
            <i className="fa fa-shield" aria-hidden="true"></i>
          </Link>
        </li>
        <li className="nav-item flex-fill">
          <Link
            className="px-1   nav-link"
            data-bs-toggle="tab"
            to="#analytics"
            role="tab"
            title="All Records"
          >
            <i class="fa fa-book" aria-hidden="true"></i>
          </Link>
        </li>
        <li className="nav-item flex-fill">
          <Link
            className="px-1   nav-link"
            data-bs-toggle="tab"
            to="#setting_menu"
            role="tab"
            title="Setting"
          >
            <i className="fa fa-cog"></i>
          </Link>
        </li>
      </ul>

      {/* nav tab: content */}
      <div className="tab-content px-0">
        <div className="tab-pane fade show active" id="hr_menu" role="tabpanel">
          <nav className="sidebar-nav">
            <ul className="metismenu list-unstyled" id="menu">
              <li className="dashboard">
                <Link
                  className="menu-item-single"
                  to="/dashboard"
                  onClick={() => {
                    singleMenu("dashboard", "singleMenuBtn", "dashboard");
                  }}
                >
                  <i className="fa fa-tachometer"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="provider-has">
                <Link
                  to="#Provider"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("provider", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-users"></i>
                  <span>Provider Administration</span>
                </Link>
                <ul className="list-unstyled mm-collapse provider-sub">
                  <li className="add_provider">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("provider", "hasMenuBtn", "add_provider");
                      }}
                      to={"/add_provider"}
                    >
                      Add Provider
                    </Link>
                  </li>
                  <li className="provider_list">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("provider", "hasMenuBtn", "provider_list");
                      }}
                      to={"/provider_list"}
                    >
                      Edit Provider
                    </Link>
                  </li>
                  <li className="new_provider_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "provider",
                          "hasMenuBtn",
                          "new_provider_request"
                        );
                      }}
                      to={"/new_provider_request"}
                    >
                      New Approved Provider
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="user-has">
                <Link
                  to="#User"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("user", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-user"></i>
                  <span>User Account</span>
                </Link>
                <ul className="list-unstyled mm-collapse user-sub">
                  <li className="add_user">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("user", "hasMenuBtn", "add_user");
                      }}
                      to={"/add_user"}
                    >
                      {" "}
                      Add User
                    </Link>
                  </li>
                  <li className="user_list">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("user", "hasMenuBtn", "user_list");
                      }}
                      to={"/user_list"}
                    >
                      Edit User
                    </Link>
                  </li>
                  <li className="new_users_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("user", "hasMenuBtn", "new_users_request");
                      }}
                      to={"/new_users_request"}
                    >
                      New Approved User
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="UserAccessRequest-has">
                <Link
                  to="#UserAccessRequest"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("UserAccessRequest", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-briefcase"></i>
                  <span>User Access Request</span>
                </Link>
                <ul className="list-unstyled mm-collapse UserAccessRequest-sub">
                  <li className="new_user_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "UserAccessRequest",
                          "hasMenuBtn",
                          "new_user_request"
                        );
                      }}
                      to={"/new_user_request"}
                    >
                      New Request
                    </Link>
                  </li>
                  <li className="new_pending_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "UserAccessRequest",
                          "hasMenuBtn",
                          "new_pending_request"
                        );
                      }}
                      to={"/new_pending_request"}
                    >
                      Pending Request
                    </Link>
                  </li>
                  <li className="new_approved_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "UserAccessRequest",
                          "hasMenuBtn",
                          "new_approved_request"
                        );
                      }}
                      to={"/new_approved_request"}
                    >
                      Approved Request
                    </Link>
                  </li>
                  <li className="new_complete_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "UserAccessRequest",
                          "hasMenuBtn",
                          "new_complete_request"
                        );
                      }}
                      to={"/new_complete_request"}
                    >
                      Complete Request
                    </Link>
                  </li>
                  <li className="new_rejected_request">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "UserAccessRequest",
                          "hasMenuBtn",
                          "new_rejected_request"
                        );
                      }}
                      to={"/new_rejected_request"}
                    >
                      Rejected Request
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="tab-pane fade" id="project_menu" role="tabpanel">
          <nav className="sidebar-nav">
            <ul className="metismenu list-unstyled" id="menu">
              <li className="TemplateConfiguration-has">
                <Link
                  to="#TemplateConfiguration"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("TemplateConfiguration", "hasMenuBtn", "");
                  }}
                >
                  <i class="fa fa-bar-chart" aria-hidden="true"></i>
                  <span>Template Configuration</span>
                </Link>
                <ul className="list-unstyled mm-collapse TemplateConfiguration-sub">
                  <li className="add_template">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "TemplateConfiguration",
                          "hasMenuBtn",
                          "add_template"
                        );
                      }}
                      to={"/add_template"}
                    >
                      Add Template
                    </Link>
                  </li>
                  <li className="edit_template">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "TemplateConfiguration",
                          "hasMenuBtn",
                          "edit_template"
                        );
                      }}
                      to={"/edit_template"}
                    >
                      Template List
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="SubscriptionConfiguration-has">
                <Link
                  to="#SubscriptionConfiguration"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("SubscriptionConfiguration", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-user"></i>
                  <span>Subscription Config.</span>
                </Link>
                <ul className="list-unstyled mm-collapse SubscriptionConfiguration-sub">
                  <li className="create_subscription">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "SubscriptionConfiguration",
                          "hasMenuBtn",
                          "create_subscription"
                        );
                      }}
                      to={"/create_subscription"}
                    >
                      {" "}
                      Add Subscription
                    </Link>
                  </li>
                  <li className="edit_subscription">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "SubscriptionConfiguration",
                          "hasMenuBtn",
                          "edit_subscription"
                        );
                      }}
                      to={"/edit_subscription"}
                    >
                      Edit Subscription
                    </Link>
                  </li>
                  <li className="add_group">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "SubscriptionConfiguration",
                          "hasMenuBtn",
                          "add_group"
                        );
                      }}
                      to={"/add_group"}
                    >
                      Add Group
                    </Link>
                  </li>
                  <li className="edit_group">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "SubscriptionConfiguration",
                          "hasMenuBtn",
                          "edit_group"
                        );
                      }}
                      to={"/edit_group"}
                    >
                      Edit Group
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="Analytics-has">
                <Link
                  to="#Analytics"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("Analytics", "hasMenuBtn", "");
                  }}
                >
                  <i class="fa fa-columns" aria-hidden="true"></i>
                  <span>Analytics</span>
                </Link>
                <ul className="list-unstyled mm-collapse Analytics-sub">
                  <li className="AdminDash">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("Analytics", "hasMenuBtn", "AdminDash");
                      }}
                      to={"/AdminDash"}
                    >
                      Administrative Dashboard
                    </Link>
                  </li>
                  <li className="KeyMetrics">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("Analytics", "hasMenuBtn", "KeyMetrics");
                      }}
                      to={"/KeyMetrics"}
                    >
                      Key Metrics
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="tab-pane fade" id="sub_menu" role="tabpanel">
          <nav className="sidebar-nav">
            <ul className="metismenu list-unstyled" id="menu">
              <li className="UserRole-has">
                <Link
                  to="#UserRole"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("UserRole", "hasMenuBtn", "");
                  }}
                >
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                  <span>User Role</span>
                </Link>
                <ul className="list-unstyled mm-collapse UserRole-sub">
                  <li className="add_userRole">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("UserRole", "hasMenuBtn", "add_userRole");
                      }}
                      to={"/add_userRole"}
                    >
                      Add User
                    </Link>
                  </li>
                  <li className="edit_userRole">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("UserRole", "hasMenuBtn", "edit_userRole");
                      }}
                      to={"/edit_userRole"}
                    >
                      Edit User Role
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="SecurityClass-has">
                <Link
                  to="#SecurityClass"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("SecurityClass", "hasMenuBtn", "");
                  }}
                >
                  <i class="fa fa-lock" aria-hidden="true"></i>
                  <span>Security Class</span>
                </Link>
                <ul className="list-unstyled mm-collapse SecurityClass-sub">
                  <li className="add_security_class">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "SecurityClass",
                          "hasMenuBtn",
                          "add_security_class"
                        );
                      }}
                      to={"/add_security_class"}
                    >
                      {" "}
                      Add New
                    </Link>
                  </li>
                  <li className="EditSecurityClass">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "SecurityClass",
                          "hasMenuBtn",
                          "EditSecurityClass"
                        );
                      }}
                      to={"/EditSecurityClass"}
                    >
                      Edit Security Class
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="admin-has">
                <Link
                  to="#Admin"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("admin", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-user"></i>
                  <span>Admin Login</span>
                </Link>
                <ul className="list-unstyled mm-collapse admin-sub">
                  <li className="add_admin">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("admin", "hasMenuBtn", "add_admin");
                      }}
                      to={"/add_admin"}
                    >
                      {" "}
                      Add Admin
                    </Link>
                  </li>
                  <li className="admin_list">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("admin", "hasMenuBtn", "admin_list");
                      }}
                      to={"/admin_list"}
                    >
                      Edit Admin
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="tab-pane fade" id="analytics" role="tabpanel">
          <nav className="sidebar-nav">
            <ul className="metismenu list-unstyled" id="menu">
              <li className="recordAccount-has">
                <Link
                  to="#recordAccount"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("recordAccount", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-clipboard"></i>
                  <span>Record Viewer</span>
                </Link>
                <ul className="list-unstyled mm-collapse recordAccount-sub">
                  <li className="all_provider_records">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "recordAccount",
                          "hasMenuBtn",
                          "all_provider_records"
                        );
                      }}
                      to={"/all_provider_records"}
                    >
                      {" "}
                      Provider Record
                    </Link>
                  </li>
                  <li className="all_user_records">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "recordAccount",
                          "hasMenuBtn",
                          "all_user_records"
                        );
                      }}
                      to={"/all_user_records"}
                    >
                      User Record
                    </Link>
                  </li>
                  <li className="all_userRoles_records">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "recordAccount",
                          "hasMenuBtn",
                          "all_userRoles_records"
                        );
                      }}
                      to={"/all_userRoles_records"}
                    >
                      User Role Record
                    </Link>
                  </li>
                  <li className="all_template_records">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "recordAccount",
                          "hasMenuBtn",
                          "all_template_records"
                        );
                      }}
                      to={"/all_template_records"}
                    >
                      All Template Record
                    </Link>
                  </li>
                  <li className="all_subscription_records">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "recordAccount",
                          "hasMenuBtn",
                          "all_subscription_records"
                        );
                      }}
                      to={"/all_subscription_records"}
                    >
                      All Subscription Record
                    </Link>
                  </li>
                  <li className="all_alertTrigger_records">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "recordAccount",
                          "hasMenuBtn",
                          "all_alertTrigger_records"
                        );
                      }}
                      to={"/all_alertTrigger_records"}
                    >
                      Alert Trigger
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="CategoryList-has">
                <Link
                  to="#CategoryList"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("CategoryList", "hasMenuBtn", "");
                  }}
                >
                  <i class="fa fa-list" aria-hidden="true"></i>
                  <span>Category List</span>
                </Link>
                <ul className="list-unstyled mm-collapse CategoryList-sub">
                  <li className="category_provider">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_provider"
                        );
                      }}
                      to={"/category_provider"}
                    >
                      {" "}
                      Provider Type
                    </Link>
                  </li>
                  <li className="category_communication">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_communication"
                        );
                      }}
                      to={"/category_communication"}
                    >
                      {" "}
                      Communication Type
                    </Link>
                  </li>
                  <li className="category_referral">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_referral"
                        );
                      }}
                      to={"/category_referral"}
                    >
                      {" "}
                      Referral Source Type
                    </Link>
                  </li>
                  <li className="category_specility">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_specility"
                        );
                      }}
                      to={"/category_specility"}
                    >
                      {" "}
                      Speciality Type
                    </Link>
                  </li>
                  <li className="category_title">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_title"
                        );
                      }}
                      to={"/category_title"}
                    >
                      {" "}
                      Title Type
                    </Link>
                  </li>
                  <li className="category_SexType">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_SexType"
                        );
                      }}
                      to={"/category_SexType"}
                    >
                      {" "}
                      Gender Type
                    </Link>
                  </li>
                  <li className="category_ststus">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_ststus"
                        );
                      }}
                      to={"/category_ststus"}
                    >
                      {" "}
                      Status Type
                    </Link>
                  </li>
                  <li className="category_security_question">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_security_question"
                        );
                      }}
                      to={"/category_security_question"}
                    >
                      {" "}
                      Security Question Type
                    </Link>
                  </li>
                  <li className="category_template">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "CategoryList",
                          "hasMenuBtn",
                          "category_template"
                        );
                      }}
                      to={"/category_template"}
                    >
                      {" "}
                      Template Category
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="archive-has">
                <Link
                  to="#archive"
                  className="has-arrow"
                  onClick={() => {
                    singleMenu("archive", "hasMenuBtn", "");
                  }}
                >
                  <i className="fa fa-clipboard"></i>
                  <span>Archive</span>
                </Link>
                <ul className="list-unstyled mm-collapse archive-sub">
                  <li className="ArchiveProviderAdministration">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveProviderAdministration"
                        );
                      }}
                      to={"/ArchiveProviderAdministration"}
                    >
                      {" "}
                      Provider Administration
                    </Link>
                  </li>
                  <li className="ArchiveUserAccount">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveUserAccount"
                        );
                      }}
                      to={"/ArchiveUserAccount"}
                    >
                      User Account
                    </Link>
                  </li>
                  <li className="ArchiveUserRole">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("archive", "hasMenuBtn", "ArchiveUserRole");
                      }}
                      to={"/ArchiveUserRole"}
                    >
                      User Role
                    </Link>
                  </li>
                  <li className="ArchiveTemplate">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("archive", "hasMenuBtn", "ArchiveTemplate");
                      }}
                      to={"/ArchiveTemplate"}
                    >
                      Template
                    </Link>
                  </li>
                  <li className="ArchiveSubscription">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveSubscription"
                        );
                      }}
                      to={"/ArchiveSubscription"}
                    >
                      Subscription
                    </Link>
                  </li>
                  <li className="ArchiveProviderType">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveProviderType"
                        );
                      }}
                      to={"/ArchiveProviderType"}
                    >
                      Provider Type
                    </Link>
                  </li>
                  <li className="archive_communication_type">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "archive_communication_type"
                        );
                      }}
                      to={"/archive_communication_type"}
                    >
                      Communication Type
                    </Link>
                  </li>
                  <li className="ArchiveReferralSource">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveReferralSource"
                        );
                      }}
                      to={"/ArchiveReferralSource"}
                    >
                      Referral Source Type
                    </Link>
                  </li>
                  <li className="ArchiveSpecialityType">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveSpecialityType"
                        );
                      }}
                      to={"/ArchiveSpecialityType"}
                    >
                      Speciality Type
                    </Link>
                  </li>
                  <li className="ArchiveTitle">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("archive", "hasMenuBtn", "ArchiveTitle");
                      }}
                      to={"/ArchiveTitle"}
                    >
                      Title Type
                    </Link>
                  </li>
                  <li className="ArchiveSex">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("archive", "hasMenuBtn", "ArchiveSex");
                      }}
                      to={"/ArchiveSex"}
                    >
                      Gender Type
                    </Link>
                  </li>
                  <li className="ArchiveStatus">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu("archive", "hasMenuBtn", "ArchiveStatus");
                      }}
                      to={"/ArchiveStatus"}
                    >
                      Status Type
                    </Link>
                  </li>
                  <li className="ArchiveSecurityQuestion">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveSecurityQuestion"
                        );
                      }}
                      to={"/ArchiveSecurityQuestion"}
                    >
                      Security Question Type
                    </Link>
                  </li>
                  <li className="ArchiveTemplateCatType">
                    <Link
                      className="menu-item"
                      onClick={() => {
                        singleMenu(
                          "archive",
                          "hasMenuBtn",
                          "ArchiveTemplateCatType"
                        );
                      }}
                      to={"/ArchiveTemplateCatType"}
                    >
                      Template Category Type
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="tab-pane fade" id="setting_menu" role="tabpanel">
          <div className="px-3">
            <h6>Choose Skin</h6>
            <ul className="choose-skin list-unstyled">
              <li
                onClick={() => colorHandle("purple")}
                data-theme="purple"
                className={textColor === "purple" ? "active  mb-2" : " mb-2"}
              >
                <div className="purple"></div>
                <span>Purple</span>
              </li>
              <li
                onClick={() => colorHandle("blue")}
                data-theme="blue"
                className={textColor === "blue" ? "active  mb-2" : " mb-2"}
              >
                <div className="blue"></div>
                <span>Blue</span>
              </li>
              <li
                onClick={() => colorHandle("cyan")}
                data-theme="cyan"
                className={textColor === "cyan" ? "active  mb-2" : " mb-2"}
              >
                <div className="cyan"></div>
                <span>Cyan</span>
              </li>
              <li
                onClick={() => colorHandle("green")}
                data-theme="green"
                className={textColor === "green" ? "active  mb-2" : " mb-2"}
              >
                <div className="green"></div>
                <span>Green</span>
              </li>
              <li
                onClick={() => colorHandle("orange")}
                data-theme="orange"
                className={textColor === "orange" ? "active  mb-2" : " mb-2"}
              >
                <div className="orange"></div>
                <span>Orange</span>
              </li>
              <li
                onClick={() => colorHandle("blush")}
                data-theme="blush"
                className={textColor === "blush" ? "active  mb-2" : " mb-2"}
              >
                <div className="blush"></div>
                <span>Blush</span>
              </li>
            </ul>
            <hr />
            <h6>Theme Option</h6>
            <ul className="list-unstyled mm-collapse mm-show ">
              <li className="d-flex align-items-center mb-1">
                <div className="form-check form-switch theme-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="theme-switch"
                    checked={themeChecked}
                    onChange={darkModeTheame}
                  />
                  <label className="form-check-label" htmlFor="theme-switch">
                    Enable Dark Mode!
                  </label>
                </div>
              </li>
              <li className="d-flex align-items-center mb-1">
                <div className="form-check form-switch theme-high-contrast">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="theme-high-contrast"
                    checked={highContrastChecked}
                    onChange={highContrast}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="theme-high-contrast"
                  >
                    Enable High Contrast
                  </label>
                </div>
              </li>
              <li className="d-flex align-items-center mb-1">
                <div className="form-check form-switch theme-rtl">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="theme-rtl"
                    onChange={rtlMode}
                  />
                  <label className="form-check-label" htmlFor="theme-rtl">
                    Enable RTL Mode!
                  </label>
                </div>
              </li>
              <li className="d-flex align-items-center mb-1">
                <div className="form-check form-switch minisidebar-active">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="mini-active"
                    onChange={miniSideBar}
                  />
                  <label className="form-check-label" htmlFor="mini-active">
                    Mini Sidebar
                  </label>
                </div>
              </li>
            </ul>
            <hr />
            <h6>General Settings</h6>
            <ul className="setting-list list-unstyled">
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault1"
                    checked={emailBtn}
                    onChange={emailNotifyHandle}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault1"
                  >
                    Email Redirect
                  </label>
                </div>
              </li>
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault2"
                    checked={notificationBtn}
                    onChange={alertNotification}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault2"
                  >
                    Notifications
                  </label>
                </div>
              </li>
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault4"
                    checked={offlineBtn}
                    onChange={offlineHandle}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault4"
                  >
                    Offline
                  </label>
                </div>
              </li>
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault5"
                    checked={locationState}
                    onChange={locationPermission}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault5"
                  >
                    Location Permission
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
