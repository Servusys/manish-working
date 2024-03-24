import React, { useEffect, useRef, useState } from "react";
import TemplateButton from "./TemplateButton";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
import DataTable from "react-data-table-component";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
// import { useSelector } from "react-redux";

const style = {
  position: "relative",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  bgcolor: "white",
  // border: '2px solid blue',
  borderRadius: "5px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  mt: "15%",
  pb: "1%",
  overflow: "scroll",
  height: "80%",
};
const chartSetting = {
  xAxis: [
    {
      label: "Provider",
    },
  ],
  width: 300,
  height: 220,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
];
const data = [
  { id: 0, value: 10, label: "Content" },
  { id: 1, value: 15, label: "Content" },
  { id: 2, value: 20, label: "Content" },
];

const valueFormatter = (value) => `${value}mm`;

const EditTemplateContent = () => {
  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      id: "SerialNo",
      sortable: false,
    },
    {
      name: "Template ID",
      selector: (row) => row.id,
      id: "SerialNo",
      sortable: true,
    },
    {
      name: "Template Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      id: "ActionNo",
      name: "Status",
      selector: (row) =>
        row.Active === true ? (
          <p className="text-blue-600">Active</p>
        ) : (
          <p className="text-red-600">Inactive</p>
        ),
      // className:`${row.Active === true ? ' ActiveBg': 'InActiveBg'}`,
      sortable: true,
    },
    {
      name: "Created On",
      id: "CreatedNo",
      selector: (row) => {
        const date = new Date(row.createdAt);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      sortable: true,
    },
    {
      id: "ActionNo",
      name: "View",
      selector: (row) => (
        <RemoveRedEyeOutlinedIcon
          className="cursor-pointer"
          // onClick={() => handleClick(row.id)}
          onClick={() => handlePreview(row.id)}
        />
      ),
      sortable: false,
    },
    {
      name: "Action",
      id: "ActionNo",
      selector: (row) => (
        <div>
          <ModeEditIcon
            className="cursor-pointer editIcon"
            onClick={() => handleSubmit(row.id)}
          />
        </div>
      ),
      sortable: false,
    },
  ];
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [width, setWidth] = useState();
  const [userTemplate, setUserTemplate] = useState({
    templateBoxes: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userrole/template?stage=all`)
      .then((res) => {
        const updatedRecords = res?.data?.data;
        // console.log(updatedRecords);
        setRecords(updatedRecords); // Update the state with the new array
        setOriginalRecords(updatedRecords);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleFilter = (e) => {
    const inputValue = e.target.value;
    const newData = originalRecords.filter((row) => {
      return (
        row?.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        row?.id == +inputValue
      );
    });
    setRecords(newData);
  };

  const handleSubmit = async (id) => {
    // alert(id);
    navigate(`/edit-template-main/${id}`);
  };

  const handlePreview = (id) => {
    // alert(id);
    navigate(`/preview-template/${id}`);
    // axios
    //   .get(
    //     `${process.env.REACT_APP_BASE_URL}userrole/template?templateId=${id}`
    //   )
    //   .then((res) => {
    //     // console.log(res.data.data);
    //     setUserTemplate(res?.data?.data);
    //     setOpen1(true);
    //     var p = document.getElementById("modalID");
    //     var pw = p.getBoundingClientRect().width;
    //     setWidth(pw);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });
  };

  // const { darkMode } = useSelector((state) => state.menu);

  return (
    <>
      {/* <TemplateButton /> */}

      <div className="container">
        <div className="mb-2">
          <input
            type="text"
            name="fName"
            placeholder="Search by Template ID & Name"
            onChange={handleFilter}
            className="form-control"
            // className="tw-block tw-w-[30%] tw-rounded-sm border-0 py-1 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="border-[2px] border-gray-00">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <DataTable
              // theme={darkMode ? "dark" : "default"}
              data={records}
              columns={columns}
              fixedHeader
              pagination
            />
          )}
        </div>
      </div>

      {
        <Modal
          open={open1}
          onClose={() => setOpen1(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-center font-bold bg-gray-500 text-white p-2 text-lg">
              Template Preview
              <button
                className="absolute z-[100]  right-[2%] text-white crossIcon"
                onClick={() => setOpen1(false)}
              >
                <HighlightOffIcon className="deleteIcon" />
              </button>
            </div>
            <div className="flex justify-between" id="modalID">
              <div className="w-[100%]">
                <div className="w-full bg-white border-[1px] text-gray-900 border-gray-300 pb-5 demo mt-5">
                  <div className="px-3 py-1">
                    <div className="flex mt-2 flex-wrap" id="ptemp">
                      {userTemplate?.templateBoxes.length &&
                        userTemplate?.templateBoxes.map((item, t) => {
                          return (
                            <>
                              <div
                                key={t}
                                id={"tempboxId" + t}
                                className="w-auto h-auto temp border-[1px] border-gray-500/100 hover:bg-blue-100 hover:border-2 hover:border-red-100"
                              >
                                <div className="w-[100%] h-[100%] block rounded-lg p-1 bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                  <div className="p-6">
                                    <div
                                      className={
                                        item?.chartType === "Chart1"
                                          ? "Chart1 chartContainerHide chartContainerShow"
                                          : "Chart1 chartContainerHide"
                                      }
                                    >
                                      <PieChart
                                        series={[
                                          {
                                            data,
                                            highlightScope: {
                                              faded: "global",
                                              highlighted: "item",
                                            },
                                            faded: {
                                              innerRadius: 30,
                                              additionalRadius: -30,
                                              color: "gray",
                                            },
                                          },
                                        ]}
                                        width={(width / 100) * item?.width}
                                        height={item?.height}
                                      />
                                    </div>
                                    <div
                                      className={
                                        item?.chartType === "Chart2"
                                          ? "Chart2 chartContainerHide chartContainerShow"
                                          : "Chart2 chartContainerHide"
                                      }
                                    >
                                      <BarChart
                                        dataset={dataset}
                                        yAxis={[
                                          {
                                            scaleType: "band",
                                            dataKey: "month",
                                          },
                                        ]}
                                        series={[
                                          {
                                            dataKey: "seoul",
                                            label: "Provider",
                                            valueFormatter,
                                          },
                                        ]}
                                        layout="horizontal"
                                        width={(width / 100) * item?.width}
                                        height={item?.height}
                                      />
                                    </div>
                                    <div
                                      className={
                                        item?.chartType === "Chart3"
                                          ? "Chart3 chartContainerHide chartContainerShow"
                                          : "Chart3 chartContainerHide"
                                      }
                                    >
                                      <LineChart
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                        series={[
                                          {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                          },
                                        ]}
                                        width={(width / 100) * item?.width}
                                        height={item?.height}
                                      />
                                    </div>
                                    <div
                                      className={
                                        item?.chartType === "Chart4"
                                          ? "Chart4 chartContainerHide chartContainerShow"
                                          : "Chart4 chartContainerHide"
                                      }
                                    >
                                      <LineChart
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                        series={[
                                          {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            area: true,
                                          },
                                        ]}
                                        width={(width / 100) * item?.width}
                                        height={item?.height}
                                      />
                                    </div>
                                    <div
                                      className={
                                        item?.chartType === "Chart5"
                                          ? "Chart5 chartContainerHide chartContainerShow"
                                          : "Chart5 chartContainerHide"
                                      }
                                    >
                                      <BarChart
                                        xAxis={[
                                          {
                                            scaleType: "band",
                                            data: [
                                              "group A",
                                              "group B",
                                              "group C",
                                            ],
                                          },
                                        ]}
                                        series={[
                                          { data: [4, 3, 5] },
                                          { data: [1, 6, 3] },
                                          { data: [2, 5, 6] },
                                        ]}
                                        width={(width / 100) * item?.width}
                                        height={item?.height}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      }
    </>
  );
};

export default EditTemplateContent;
