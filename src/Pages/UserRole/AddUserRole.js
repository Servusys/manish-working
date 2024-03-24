import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../CommonPage/Preloader";
import TopBar from "../../CommonPage/TopBar";
import SideBar from "../../CommonPage/SideBar";
import ToggleNavBar from "../../CommonPage/ToggleNavBar";
import axios from "axios";

function AddUserRole() {
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [row, setRow] = useState({
    UserRoleName: "",
    Description: "",
    defaultTemp: "",
  });
  const [templates, setTemplates] = useState();

  useEffect(() => {
    axios
        .get(`${process.env.REACT_APP_BASE_URL}userRole/template`)
        .then((res) => {
          console.log(res.data.data);
          setTemplates(res?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [])

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "UserRoleName") {
      const capitalizedValue = value
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setRow({ ...row, [name]: capitalizedValue });
    } else {
      setRow({ ...row, [name]: value });
    }
  };
useEffect(()=>{
  console.log({row})
},[row])
  const handleAddData = (e) => {
    e.preventDefault()
    const newData = serviceList.map((item, i) => ({
      ...item,
    }));
    if (row.UserRoleName.trim() === "" || row.defaultTemp.trim() === "") {
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}userrole`, {
          newData,
          ...row,
        })
        .then((res) => {
          console.log(res.data.data);
          alert(res.data.message);
          setRow({
            UserRoleName: "",
            Description: "",
            defaultTemp: "",
          })
          setServiceList([{ service: "" }])
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
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
                    User Roles
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
            <form className="form-box" id="basic-form"  novalidate>
              <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title">General information</h6>
                    </div>
                    <div className="card-body">
                      <div className='row g-3 d-block'>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">User Role Name<span className='AsteriskSymbol'>*</span></label>
                          <input type="text" name="UserRoleName"
                        id="UserRoleName"
                        value={row.UserRoleName}
                    onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">General Description</label>
                          <textarea 
                    name="Description"
                    value={row.Description}
                    onChange={handleChange} rows={4} type="email" className="form-control" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="card-title">Template Security</h6>
                    </div>
                    <div className="card-body">
                      <div className='row g-3 '>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Default Template <span className='AsteriskSymbol'>*</span></label>
                          <select 
                  name="defaultTemp"
                  value={row.defaultTemp}
                  id="defaultTemp"
                  onChange={handleChange}
                   className="form-select select2">
                            <option selected disabled>Open this select menu</option>
                            {templates?.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                          <label className="form-label">Sub Template</label>
                          {serviceList.map((singleService, index) =>(
                            <>
                            <select  value={singleService.service}
                          onChange={(e) => handleServiceChange(e, index)}
                          required
                          name="service" className="form-select select2">
                            <option selected disabled>Open this select menu</option>
                            {templates?.map((item, i) => {
                            return (
                              <option key={i} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                          
                          </select>
                          {serviceList.length !== 1 && (
                          <span
                            className="deleteUserRoleBox cursor-pointer"
                            onClick={() => handleServiceRemove(index)}
                          >
                            X
                          </span>
                        )}
                          </>
                          

                          ))}
                          
                        
                        </div>
                      </div>
                      <div className="col-12 mt-2 tw-flex tw-justify-end">
                        <button type="submit"onClick={handleServiceAdd} className="btn btn-primary">+ Add More</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-4 tw-flex tw-justify-end">
                    <button type="submit" onClick={handleAddData} className="btn btn-primary">Add</button>
                  </div>
                  </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserRole;
