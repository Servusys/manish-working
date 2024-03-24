import React from "react";
import { NavLink } from "../../../node_modules/react-router-dom/dist/index";

const TemplateButton = () => {
  return (
    <>
      <div className="tw-flex mb-3">
        <NavLink
          to="/add_template"
          className="categoryButton"
          activeclassname="categoryButtonAcive"
        >
          Add Template
        </NavLink>
        <NavLink
          to="/edit_template"
          className="categoryButton"
          activeclassname="categoryButtonAcive"
        >
          Edit Template
        </NavLink>
      </div>
    </>
  );
};

export default TemplateButton;
