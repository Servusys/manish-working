import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import $ from "jquery";
// import "jquery-ui/dist/jquery-ui.min";
import TemplateButton from "./TemplateButton";
import "./template.css";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import TemplateButton from "./TemplateButton";
import { Button } from "../../../node_modules/@mui/material/index";
import axios from "../../../node_modules/axios/index";
// import "../template/template.css";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import Chart1 from "./Chart/Chart1";
import Chart2 from "./Chart/Chart2";
import Chart3 from "./Chart/Chart3";
import Chart4 from "./Chart/Chart4";
import Chart5 from "./Chart/Chart5";
import Chart6 from "./Chart/Chart6";
import Chart7 from "./Chart/Chart7";
import Chart8 from "./Chart/Chart8";
import Chart9 from "./Chart/Chart9";
import Chart10 from "./Chart/Chart10";
import Chart11 from "./Chart/Chart11";
import Chart12 from "./Chart/Chart12";
import Chart13 from "./Chart/Chart13";
import Chart14 from "./Chart/Chart14";
import Chart15 from "./Chart/Chart15";
import Chart16 from "./Chart/Chart16";
import Chart17 from "./Chart/Chart17";
import Chart18 from "./Chart/Chart18";
import Chart19 from "./Chart/Chart19";
import Chart20 from "./Chart/Chart20";
import Chart21 from "./Chart/Chart21";
import Chart22 from "./Chart/Chart22";
import Chart23 from "./Chart/Chart23";
import Chart24 from "./Chart/Chart24";
import Chart25 from "./Chart/Chart25";
import Chart26 from "./Chart/Chart26";
import Chart27 from "./Chart/Chart27";
import Chart28 from "./Chart/Chart28";
import Chart29 from "./Chart/Chart29";
import Chart30 from "./Chart/Chart30";
import Chart31 from "./Chart/Chart31";
import Chart32 from "./Chart/Chart32";
import Chart33 from "./Chart/Chart33";
import Chart34 from "./Chart/Chart34";
import Chart35 from "./Chart/Chart35";
import Chart36 from "./Chart/Chart36";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from "react-toastify";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ReactSortable } from "react-sortablejs";
import PreviewTemplate from "./PreviewTemplate";
import {
  NavLink,
  useNavigate,
  useParams,
} from "../../../node_modules/react-router-dom/dist/index";
import { Link, RotateLeftSharp } from "@mui/icons-material";

// React Quill
var toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ list: "ordered" }],
  [{ align: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ["table"], // Corrected to use "table" as a string
  [{ script: "sub" }, { script: "super" }],
  [{ color: [] }, { background: [] }],
];

// For Modal 1
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  minHeight: "80vh",
  maxHeight: "60vh",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "87%",
  bgcolor: "background.paper",
  minHeight: "80vh",
  maxHeight: "100vh",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

function EditTemplateSingle() {
  // Tab panel
  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  };
  const { dataId } = useParams();
const navigate = useNavigate()
  // All type Use State
  const [Legend, setLegend] = useState();
  const [StrokeLine, setStrokeLine] = useState();
  const [Stacked, setStacked] = useState();
  const [DataLabels, setDataLabels] = useState();
  const [PreviewChartSelect, setPreviewChartSelect] = useState(null);
  const [LegendDisplay, setLegendDisplay] = useState(null);
  const [BackgroundColor, setBackgroundColor] = useState();
  const [LegendTextColor, setLegendTextColor] = useState();
  const [LavelYColor, setLavelYColor] = useState(null);
  const [LavelXColor, setLavelXColor] = useState(null);
  const [PeakValueC, setPeakValueC] = useState(null);
  const [LowestValueC, setLowestValueC] = useState(null);
  const [MovingValueC, setMovingValueC] = useState(null);
  const [AverageValueC, setAverageValueC] = useState(null);
  const [TargetValueLineColor, setTargetValueLineColor] = useState(null);
  const [LableTextColorTarget, setLableTextColorTarget] = useState(null);
  const [FontSizeTarget, setFontSizeTarget] = useState(null);
  const [FontSizeLowest, setFontSizeLowest] = useState(null);
  const [FontSizeAverage, setFontSizeAverage] = useState(null);
  const [FontSizePeak, setFontSizePeak] = useState(null);
  const [PositionLowestTB, setPositionLowestTB] = useState(null);
  const [PositionLowestLR, setPositionLowestLR] = useState(null);
  const [PositionAverageLR, setPositionAverageLR] = useState(null);
  const [PositionAverageTB, setPositionAverageTB] = useState(null);
  const [LineTpyeSD, setLineTpyeSD] = useState(null);
  const [LineWidth, setLineWidth] = useState(null);
  const [PositionTargetTB, setPositionTargetTB] = useState(null);
  const [PositionTargetLR, setPositionTargetLR] = useState(null);
  const [PositionPeakLR, setPositionPeakLR] = useState(null);
  const [PositionPeakTB, setPositionPeakTB] = useState(null);
  const [TargetValue, setTargetValue] = useState(null);
  const [TargetValueTitle, setTargetValueTitle] = useState();
  const [PeakValueTitle, setPeakValueTitle] = useState();
  const [LowestValueTitle, setLowestValueTitle] = useState();
  const [AverageValueTitle, setAverageValueTitle] = useState();
  const [Tooltip, setTooltip] = useState();
  const [TargetDisplay, setTargetDisplay] = useState();
  const [PeakDisplay, setPeakDisplay] = useState();
  const [AverageDisplay, setAverageDisplay] = useState();
  const [LowestDisplay, setLowestDisplay] = useState();
  const [MovingDisplay, setMovingDisplay] = useState();
  const [LowestLineDisplay, setLowestLineDisplay] = useState();
  const [AverageLineDisplay, setAverageLineDisplay] = useState();
  const [TargetLineDisplay, setTargetLineDisplay] = useState();
  const [PeakLineDisplay, setPeakLineDisplay] = useState();
  const [TargetPosition, setTargetPosition] = useState();
  const [FontSize, setFontSize] = useState(null);
  const [YAxis, setYAxis] = useState();
  const [Color, setColor] = useState([]);
  const [XAxis, setXAxis] = useState();
  const [gridY, setGridY] = useState();
  const [LebalX, setLebalX] = useState();
  const [LebalY, setLebalY] = useState();
  const [gridX, setGridX] = useState();
  const [axisX, setAxisX] = useState(true);
  const [axisY, setAxisY] = useState(true);
  const [textColor, setTextColor] = useState();
  const [containers, setContainers] = useState([]);
  const [value, setValue] = React.useState(0);
  const [ValuePeak, setValuePeak] = React.useState();
  const [ValueTarget, setValueTarget] = React.useState();
  const [ValueLowest, setValueLowest] = React.useState();
  const [boxTitleColor, setBoxTitleColor] = useState();
  const [boxTitle, setBoxTitle] = useState();
  const [TopBg, setTopBg] = useState();
  const [BottomBg, setBottomBg] = useState();

  // For modal 1
  const [modalData, setModalData] = useState(null);
  const [modalCData, setModalCData] = useState(null);
  const [modalBData, setModalBData] = useState(null);

  // Preview Modal
  const [previewModal, setPreviewModal] = useState();

  // KPI
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [metrics, setMetrics] = useState();
  const [categoryValue, setCategoryValue] = useState(null);
  const [subCategoryValue, setSubCategoryValue] = useState(null);
  const [metricsValue, setMetricsValue] = useState(null);
  const [chartTypeData, setChartTypeData] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [dataSeries, setDataSeries] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen(false);
  const [ArraydataSeries, setArraydataSeries] = useState(
    Array.from({ length: dataSeries })
  );
  const [previewId, setPreviewId] = useState();
  const [data, setData] = useState();
  const [TemplateName, setTemplateName] = useState();
  const [Description, setDescription] = useState();
  const [TemplateBackgroundTheme, setTemplateBackgroundTheme] = useState();
  const [pagetitleColorC, setPagetitleColorC] = useState();
  const [PageCenter, setPageCenter] = useState();
  const [PageLeft, setPageLeft] = useState();
  const [PageRight, setPageRight] = useState();
  const [BoxTitleColorBG, setBoxTitleColorBG] = useState();
  const [TemplateCat, setTemplateCat] = useState([]);
  const [Template_Type, setTemplate_Type] = useState([]);
  // const [ArraydataSeries, setArraydataSeries] = useState(Array.from({ length: dataSeries }, () => 0));
  const [chartAlldata, setChartAllData] = useState();

  // All type Onclick Event
  // Add Container Event
  const addContainer = () => {
    setContainers([...containers, { boxes: [], theadbox: [], bheadbox: [] }]);
  };

  // Add Box in container
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}types?type=template&category=all`)
      .then((res) => {
        setTemplateCat(res?.data?.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
  }, []);

  const addBox = (containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].boxes.push({
      /* box details */
    });
    setContainers(updatedContainers);
  };

  // Add heading in Top
  const addHeadlineTop = (containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].theadbox.push({});
    setContainers(updatedContainers);
  };

  // Add heading in Bottom
  const addHeadlineBottom = (containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].bheadbox.push({});
    setContainers(updatedContainers);
  };

  // Remove Content
  const removeContent = (index) => {
    // console.log('Before Removal:', containers);
    const updatedContainers = [...containers];
    updatedContainers.splice(index, 1); // Remove one element at the specified index
    // console.log('After Removal:', updatedContainers);
    setContainers(updatedContainers);
  };

  // Open Chart for Add new or replace Chart
  const openChart = (boxId, c, b) => {
    setModalData(boxId);
    setModalCData(c);
    setModalBData(b);
    setOpen(true);
    setCategoryValue("");
    setSubCategoryValue("");
    setMetricsValue("");
    setChartTypeData("");
  };

  const openrChart = (boxId, c, b) => {
    setModalData(boxId);
    setModalCData(c);
    setModalBData(b);
    setOpen(true);
    setCategoryValue(containers[c].boxes[b].boxCategoryValue);
    setSubCategoryValue(containers[c].boxes[b].boxSubCategoryValue);
    setMetricsValue(containers[c].boxes[b].boxMetricsValue);
    setChartTypeData(containers[c].boxes[b].boxChartType);
  };

  const openrChart2 = (boxId, cid, bid) => {
    setModalData(boxId);
    setModalCData(cid);
    setModalBData(bid);
    setCategoryValue(containers[cid].boxes[bid].boxCategoryValue);
    setSubCategoryValue(containers[cid].boxes[bid].boxSubCategoryValue);
    setMetricsValue(containers[cid].boxes[bid].boxMetricsValue);
    setPreviewChartSelect(containers[cid]?.boxes[bid]?.boxChartType);
    setLegend(containers[cid]?.boxes[bid]?.position);
    setStrokeLine(containers[cid]?.boxes[bid]?.StrokeLine);
    setStacked(containers[cid]?.boxes[bid]?.Stacked);
    setDataLabels(containers[cid]?.boxes[bid]?.DataLabels);
    setLegendDisplay(containers[cid]?.boxes[bid]?.LegendDisplay);
    setBackgroundColor(containers[cid]?.boxes[bid]?.BackgroundColor);
    setLegendTextColor(containers[cid]?.boxes[bid]?.LegendTextColor);
    setLavelYColor(containers[cid]?.boxes[bid]?.LavelYColor);
    setLavelXColor(containers[cid]?.boxes[bid]?.LavelXColor);
    setPeakValueC(containers[cid]?.boxes[bid]?.PeakValueC);
    setLowestValueC(containers[cid]?.boxes[bid]?.LowestValueC);
    setMovingValueC(containers[cid]?.boxes[bid]?.MovingValueC);
    setAverageValueC(containers[cid]?.boxes[bid]?.AverageValueC);
    setTargetValueLineColor(containers[cid]?.boxes[bid]?.TargetValueLineColor);
    setLableTextColorTarget(containers[cid]?.boxes[bid]?.LableTextColorTarget);
    setFontSizeTarget(containers[cid]?.boxes[bid]?.FontSizeTarget);
    setFontSizeLowest(containers[cid]?.boxes[bid]?.FontSizeLowest);
    setFontSizeAverage(containers[cid]?.boxes[bid]?.FontSizeAverage);
    setFontSizePeak(containers[cid]?.boxes[bid]?.FontSizePeak);
    setPositionLowestTB(containers[cid]?.boxes[bid]?.PositionLowestTB);
    setPositionLowestLR(containers[cid]?.boxes[bid]?.PositionLowestLR);
    setPositionAverageLR(containers[cid]?.boxes[bid]?.PositionAverageLR);
    setPositionAverageTB(containers[cid]?.boxes[bid]?.PositionAverageTB);
    setLineTpyeSD(containers[cid]?.boxes[bid]?.LineTpyeSD);
    setLineWidth(containers[cid]?.boxes[bid]?.LineWidth);
    setPositionTargetTB(containers[cid]?.boxes[bid]?.PositionTargetTB);
    setPositionTargetLR(containers[cid]?.boxes[bid]?.PositionTargetLR);
    setPositionPeakLR(containers[cid]?.boxes[bid]?.PositionPeakLR);
    setPositionPeakTB(containers[cid]?.boxes[bid]?.PositionPeakTB);
    setTargetValue(containers[cid]?.boxes[bid]?.TargetValue);
    setTargetValueTitle(containers[cid]?.boxes[bid]?.TargetValueTitle);
    setPeakValueTitle(containers[cid]?.boxes[bid]?.PeakValueTitle);
    setLowestValueTitle(containers[cid]?.boxes[bid]?.LowestValueTitle);
    setAverageValueTitle(containers[cid]?.boxes[bid]?.AverageValueTitle);
    setTooltip(containers[cid]?.boxes[bid]?.Tooltip);
    setTargetDisplay(containers[cid]?.boxes[bid]?.TargetDisplay);
    setPeakDisplay(containers[cid]?.boxes[bid]?.PeakDisplay);
    setAverageDisplay(containers[cid]?.boxes[bid]?.AverageDisplay);
    setLowestDisplay(containers[cid]?.boxes[bid]?.LowestDisplay);
    setMovingDisplay(containers[cid]?.boxes[bid]?.MovingDisplay);
    setLowestLineDisplay(containers[cid]?.boxes[bid]?.LowestLineDisplay);
    setAverageLineDisplay(containers[cid]?.boxes[bid]?.AverageLineDisplay);
    setTargetLineDisplay(containers[cid]?.boxes[bid]?.TargetLineDisplay);
    setPeakLineDisplay(containers[cid]?.boxes[bid]?.PeakLineDisplay);
    setFontSize(containers[cid]?.boxes[bid]?.FontSize);
    setYAxis(containers[cid]?.boxes[bid]?.YAxis);
    setColor([]);
    containers[cid]?.boxes[bid]?.Color?.forEach((item, col) => {
      setColor((prevColor) => [...prevColor, item]);
    });
    setXAxis(containers[cid]?.boxes[bid]?.XAxis);
    setGridY(containers[cid]?.boxes[bid]?.GridY);
    setLebalX(containers[cid]?.boxes[bid]?.LebalX);
    setLebalY(containers[cid]?.boxes[bid]?.LebalY);
    setBoxTitleColor(containers[cid]?.boxes[bid]?.titleBackgroundColor);
    setBoxTitleColorBG(containers[cid]?.boxes[bid]?.titleBackgroundColorBG);
    setBoxTitle(containers[cid]?.boxes[bid]?.title);
    setGridX(containers[cid]?.boxes[bid]?.GridX);
    setAxisX(containers[cid]?.boxes[bid]?.AxisX);
    setAxisY(containers[cid]?.boxes[bid]?.AxisY);
    setTextColor(containers[cid]?.boxes[bid]?.TextColor);
    setValuePeak(containers[cid]?.boxes[bid]?.ValuePeak);
    setValueTarget(containers[cid]?.boxes[bid]?.ValueTarget);
    setValueLowest(containers[cid]?.boxes[bid]?.ValueLowest);
    setOpen2(true);
  };

  const boxTitleColorBGFnc = (e) => {
    setBoxTitleColorBG(e);
  };

  // All Type of KPI
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}users/getkeymetrics?kpi=1`)
      .then((res) => {
        // // console.log(res.data.message);
        setCategory(res?.data?.message);
      })
      .catch((error) => {
        // // console.log(error);
      });
  }, []);
  const handleChangeCategory = (value) => {
    setCategoryValue(value);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}users/getkeymetrics?category=${value}`
      )
      .then((res) => {
        // console.log(res.data.message);
        setSubCategory(res?.data?.message);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const handleChangeSubCategory = (subvalue) => {
    setSubCategoryValue(subvalue);
    var item2 = document.getElementById("Category").value;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}users/getkeymetrics?category=${item2}&subCategory=${subvalue}`
      )
      .then((res) => {
        // console.log(res.data.message);
        setMetrics(res?.data?.message);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const handleChangeMatrics = (subvalue) => {
    setMetricsValue(subvalue);
    setChartAllData({categoryValue,subCategoryValue,subvalue})

  };

  // Add Chart
  const handleChartType = () => {
    if (!categoryValue || !subCategoryValue || !metricsValue) {
      toast.error("Please select KPI");
    } else if (!chartTypeData) {
      toast.error("Please select any Chart or Table");
    } else {
      var chartObject = {
        // boxContainerIndex: modalCData,
        // boxBoxIndex: modalBData,
        // boxDataId: modalData,
        // boxCategoryValue: categoryValue,
        // boxSubCategoryValue: subCategoryValue,
        // boxMetricsValue: metricsValue,
        // boxChartType: chartTypeData
        
        dataLabel: chartAlldata?.labelData,   
        categoryValue:chartAlldata?.categoryValue,
        subCategoryValue:chartAlldata?.subCategoryValue,
        subvalue:chartAlldata?.subvalue,
        metricsValue:chartAlldata?.metricsValue,
        boxContainerIndex: modalCData,
        boxBoxIndex: modalBData,
        boxDataId: modalData,
        boxCategoryValue: categoryValue,
        boxSubCategoryValue: subCategoryValue,
        boxMetricsValue: metricsValue,
        boxChartType: chartTypeData,
        boxChartTypeSelect: chartType,
        boxChartDataSeries: dataSeries,
        Color: Color,
      };
      var updatedContainers = [...containers];
      var updatedBox = {
        ...updatedContainers[modalCData].boxes[modalBData],
        ...chartObject,
      };
      updatedContainers[modalCData].boxes[modalBData] = updatedBox;
      setContainers(updatedContainers);
      setOpen(false);
      $("#" + modalData + " .addChartBox").hide();
      $("#" + modalData + " .editChartBox").show();
      $("#" + modalData + " .removeChartBox").show();
      $("#" + modalData + " .removeChartBox2").show();
    }
  };

  const colorSet = [
    "#ef476f",
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#073b4c",
    "#27187e",
    "#000000",
    "#FEFEFE",
  ];

  const handleSelectChart = (chartid, chartType, dataSeries) => {
    setColor([]);
    setChartTypeData(chartid);
    setChartType(chartType);
    setDataSeries(dataSeries);
    setColor((prevColor) => {
      const newArray = [];
      for (let i = 0; i < dataSeries; i++) {
        newArray.push(colorSet[i % colorSet.length]);
      }
      return newArray;
    });
  };

  const handleMainChartInput = (value, cid, bid) => {
    var chartObject = {
      title: value,
      titleBackgroundColor: value,
    };
    var updatedContainers = [...containers];
    var updatedBox = {
      ...updatedContainers[cid].boxes[bid], // Copy the existing box
      ...chartObject, // Update with new details
    };
    updatedContainers[cid].boxes[bid] = updatedBox; // Update the box at the specified index
    setContainers(updatedContainers);
    // console.log(containers);
  };

  const handleEditChart = () => {
    var chartObject = {
      title: boxTitle,
      titleBackgroundColor: boxTitleColor,
      titleBackgroundColorBG: BoxTitleColorBG,
      position: Legend,
      BackgroundColor: BackgroundColor,
      FontSize: FontSize,
      YAxis: YAxis,
      XAxis: XAxis,
      Color: Color,
      LegendDisplay: LegendDisplay,
      gridX: gridX,
      gridY: gridY,
      axisX: axisX,
      axisY: axisY,
      textColor: textColor,
      PeakValueC: PeakValueC,
      TargetValueLineColor: TargetValueLineColor,
      LableTextColorTarget: LableTextColorTarget,
      FontSizeTarget: FontSizeTarget,
      TargetValue: TargetValue,
      LowestValueC: LowestValueC,
      TargetValueTitle: TargetValueTitle,
      PeakValueTitle: PeakValueTitle,
      LowestValueTitle: LowestValueTitle,
      Tooltip: Tooltip,
      TargetDisplay: TargetDisplay,
      PeakDisplay: PeakDisplay,
      LowestDisplay: LowestDisplay,
      LowestLineDisplay: LowestLineDisplay,
      TargetLineDisplay: TargetLineDisplay,
      PeakLineDisplay: PeakLineDisplay,
      FontSizeLowest: FontSizeLowest,
      FontSizePeak: FontSizePeak,
      PositionLowestTB: PositionLowestTB,
      PositionLowestLR: PositionLowestLR,
      PositionTargetTB: PositionTargetTB,
      PositionTargetLR: PositionTargetLR,
      PositionPeakLR: PositionPeakLR,
      PositionPeakTB: PositionPeakTB,
      DataLabels: DataLabels,
      LebalX: LebalX,
      LebalY: LebalY,
      LavelYColor: LavelYColor,
      LavelXColor: LavelXColor,
      LegendTextColor: LegendTextColor,
      ValuePeak: ValuePeak,
      ValueTarget: ValueTarget,
      ValueLowest: ValueLowest,
      Stacked: Stacked,
    };
    var updatedContainers = [...containers];
    var updatedBox = {
      ...updatedContainers[modalCData].boxes[modalBData],
      ...chartObject,
    };
    updatedContainers[modalCData].boxes[modalBData] = updatedBox;
    setContainers(updatedContainers);
    setOpen2(false);
  };

  const handleLegend = (e) => {
    setLegend(e);
  };

  const handleStacked = (e) => {
    setStacked(e);
  };

  const handleStrokeLine = (e) => {
    setStrokeLine(e);
  };

  const handleDataLabels = (e) => {
    setDataLabels(e);
  };

  const handleBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  const handleLegendTextColor = (color) => {
    setLegendTextColor(color);
  };

  const handleLavelXColor = (color) => {
    setLavelXColor(color);
  };

  const handleLavelYColor = (color) => {
    setLavelYColor(color);
  };

  const handlePeakValueColor = (color) => {
    setPeakValueC(color);
  };

  const handleLowestValueC = (color) => {
    setLowestValueC(color);
  };

  const handleMovingValueC = (color) => {
    setMovingValueC(color);
  };

  const handleAverageValueC = (color) => {
    setAverageValueC(color);
  };

  const handleTargetValueLineColor = (color) => {
    setTargetValueLineColor(color);
  };

  const handleLableTextColorTarget = (color) => {
    setLableTextColorTarget(color);
  };

  const handleFontSizeTarget = (e) => {
    setFontSizeTarget(e);
  };

  const handleFontSizeLowest = (e) => {
    setFontSizeLowest(e);
  };

  const handleFontSizeAverage = (e) => {
    setFontSizeAverage(e);
  };

  const handleFontSizePeak = (e) => {
    setFontSizePeak(e);
  };

  const handlePositionPeakTB = (e) => {
    setPositionPeakTB(e);
  };

  const handlePositionPeakLR = (e) => {
    setPositionPeakLR(e);
  };

  const handlePositionAverageTB = (e) => {
    setPositionAverageTB(e);
  };

  const handleLineTpyeSD = (e) => {
    setLineTpyeSD(e);
  };

  const handleLineWidth = (e) => {
    setLineWidth(e);
  };

  const handlePositionAverageLR = (e) => {
    setPositionAverageLR(e);
  };

  const handlePositionLowestTB = (e) => {
    setPositionLowestTB(e);
  };

  const handlePositionLowestLR = (e) => {
    setPositionLowestLR(e);
  };

  const handlePositionTargetTB = (e) => {
    setPositionTargetTB(e);
  };

  const handlePositionTargetLR = (e) => {
    setPositionTargetLR(e);
  };

  const handleTargetValue = (e) => {
    setTargetValue(e);
  };

  const handleTargetValueTitle = (e) => {
    setTargetValueTitle(e);
  };
  const handlePeakValueTitle = (e) => {
    setPeakValueTitle(e);
  };
  const handleLowestValueTitle = (e) => {
    setLowestValueTitle(e);
  };

  const handleAverageValueTitle = (e) => {
    setAverageValueTitle(e);
  };

  const handleFontSize = (e) => {
    setFontSize(e);
  };

  const handleYAxis = (e) => {
    setYAxis(e);
  };
  const boxTitleColorFnc = (e) => {
    setBoxTitleColor(e);
  };
  const boxTitleFnc = (e) => {
    setBoxTitle(e);
  };

  const handleXAxis = (e) => {
    setXAxis(e);
  };

  const handleColor = (value, i) => {
    const newArray = [...Color];
    newArray[i] = value;
    setColor(newArray);
  };

  const handleLegendDisplay = (e) => {
    setLegendDisplay(e);
  };

  const handleLableTextColor = (e) => {
    setTextColor(e);
  };

  const handleXGridDisplay = (e) => {
    setGridX(e);
  };

  const handleValuePeak = (e) => {
    setValuePeak(e);
  };
  const handleValueTarget = (e) => {
    setValueTarget(e);
  };
  const handleValueLowest = (e) => {
    setValueLowest(e);
  };

  const handleYGridDisplay = (e) => {
    setGridY(e);
  };

  const handleXLebalDisplay = (e) => {
    setLebalX(e);
  };

  const handleYLebalisplay = (e) => {
    setLebalY(e);
  };

  const handleXTooltipDisplay = (e) => {
    setTooltip(e);
  };

  const handleXTargetDisplay = (e) => {
    setTargetDisplay(e);
  };

  const handlePeakDisplay = (e) => {
    setPeakDisplay(e);
  };

  const handleLowestDisplay = (e) => {
    setLowestDisplay(e);
  };

  const handleMovingDisplay = (e) => {
    setMovingDisplay(e);
  };

  const handleAverageDisplay = (e) => {
    setAverageDisplay(e);
  };

  const handleAverageLineDisplay = (e) => {
    setAverageLineDisplay(e);
  };

  const handleLowestLineDisplay = (e) => {
    setLowestLineDisplay(e);
  };

  const handleTargetLineDisplay = (e) => {
    setTargetLineDisplay(e);
  };

  const handlePeakLineDisplay = (e) => {
    setPeakLineDisplay(e);
  };

  const handleXTargetPosition = (e) => {
    setTargetPosition(e);
  };

  const handleXAxisDisplay = (e) => {
    // e === false && setXAxis('')
    setAxisX(e);
  };

  const handleYAxisDisplay = (e) => {
    setAxisY(e);
    // e === false && setYAxis('')
  };

  const handleQuil = (pos, quilData, cid, bid) => {
    var chartObject = {
      position: pos,
      quillData: quilData,
    };
    var updatedContainers = [...containers];
    if (pos === "top") {
      var updatedBox = {
        ...updatedContainers[cid].theadbox[bid], // Copy the existing box
        ...chartObject, // Update with new details
      };
      updatedContainers[cid].theadbox[bid] = updatedBox; // Update the box at the specified index
      setContainers(updatedContainers);
    } else if (pos === "bottom") {
      var updatedBox = {
        ...updatedContainers[cid].bheadbox[bid], // Copy the existing box
        ...chartObject, // Update with new details
      };
      updatedContainers[cid].bheadbox[bid] = updatedBox; // Update the box at the specified index
      setContainers(updatedContainers);
    }
  };
  const handleQuilColor = (pos,value, cid, bid) => {
    var chartObject={}
    pos=="top"?  chartObject = {
        HeadlineTopBackground:value,
    }:
    chartObject = {
      HeadlineBottomBackground:value,
  }
  var updatedContainers = [...containers];

  if (pos === "top") {
    var updatedBox = {
      ...updatedContainers[cid].theadbox[bid], // Copy the existing box
      ...chartObject, // Update with new details
    };
    updatedContainers[cid].theadbox[bid] = updatedBox; // Update the box at the specified index
    setContainers(updatedContainers);
  } else if (pos === "bottom") {
    var updatedBox = {
      ...updatedContainers[cid].bheadbox[bid], // Copy the existing box
      ...chartObject, // Update with new details
    };
    updatedContainers[cid].bheadbox[bid] = updatedBox; // Update the box at the specified index
    setContainers(updatedContainers);
  }
  
    
    
  }

  const boxRef = useRef(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 20 }, () => React.createRef())
    )
  );
  const boxRefHead = useRef(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 20 }, () => React.createRef())
    )
  );
  const boxRefBottom = useRef(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 20 }, () => React.createRef())
    )
  );

  // For Use Effect
  useEffect(() => {
    const resizeObservers = [];
    const resizeObserversTH = [];
    const resizeObserversBH = [];
    // Iterate over containers
    containers.forEach((container, containerIndex) => {
      // Iterate over boxes in the container
      const containerResizeObservers = container.boxes.map((box, boxIndex) => {
        const resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (entry) {
            const { width, height } = entry.contentRect;
            var chartObject = {
              width: width,
              height: height - 38,
            };
            var updatedContainers = [...containers];
            var updatedBox = {
              ...updatedContainers[containerIndex].boxes[boxIndex], // Copy the existing box
              ...chartObject, // Update with new details
            };
            updatedContainers[containerIndex].boxes[boxIndex] = updatedBox; // Update the box at the specified index
            setContainers(updatedContainers);
          }
        });

        const ref = boxRef.current[containerIndex][boxIndex];

        if (ref && ref.current) {
          resizeObserver.observe(ref.current);
        }

        return resizeObserver;
      });
      const containerResizeObserversTH = container.theadbox.map(
        (box1, boxIndex1) => {
          const resizeObserverTH = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
              const { width } = entry.contentRect;
              var chartObject = {
                width: width,
              };
              var updatedContainers = [...containers];
              var updatedBox = {
                ...updatedContainers[containerIndex].theadbox[boxIndex1], // Copy the existing box
                ...chartObject, // Update with new details
              };
              updatedContainers[containerIndex].theadbox[boxIndex1] =
                updatedBox; // Update the box at the specified index
              setContainers(updatedContainers);
            }
          });

          const ref = boxRefHead.current[containerIndex][boxIndex1];

          if (ref && ref.current) {
            resizeObserverTH.observe(ref.current);
          }

          return resizeObserverTH;
        }
      );
      const containerResizeObserversBH = container.bheadbox.map(
        (box2, boxIndex2) => {
          const resizeObserverBH = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
              const { width } = entry.contentRect;
              var chartObject = {
                width: width,
              };
              var updatedContainers = [...containers];
              var updatedBox = {
                ...updatedContainers[containerIndex].bheadbox[boxIndex2],
                ...chartObject,
              };
              updatedContainers[containerIndex].bheadbox[boxIndex2] =
                updatedBox;
              setContainers(updatedContainers);
            }
          });

          const ref = boxRefBottom.current[containerIndex][boxIndex2];

          if (ref && ref.current) {
            resizeObserverBH.observe(ref.current);
          }

          return resizeObserverBH;
        }
      );

      resizeObservers.push(containerResizeObservers);
      resizeObserversTH.push(containerResizeObserversTH);
      resizeObserversBH.push(containerResizeObserversBH);
    });

    // Cleanup the observers on component unmount
    return () => {
      resizeObservers.forEach((containerResizeObservers) => {
        containerResizeObservers.forEach((resizeObserver) => {
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        });
      });
      resizeObserversTH.forEach((containerResizeObserversTH) => {
        containerResizeObserversTH.forEach((resizeObserverTH) => {
          if (resizeObserverTH) {
            resizeObserverTH.disconnect();
          }
        });
      });
      resizeObserversBH.forEach((containerResizeObserversBH) => {
        containerResizeObserversBH.forEach((resizeObserverBH) => {
          if (resizeObserverBH) {
            resizeObserverBH.disconnect();
          }
        });
      });
    };
  }, [boxRef, boxRefHead, boxRefBottom, containers]);

  const handleSubmitTemplate = (e) => {
    e.preventDefault();
    var errorBox = false;
    var errorHeading = false;
    var checkEmpty = false;
    var checkheading = false;
    var checkbottom = false;
    var checkBox = false;
    let TemplateName = document.getElementById("TemplateName").value;
    let Description = document.getElementById("Description").value;
    let TemplateCat = document.getElementById("TemplateCat").value;
    let TemplateBackgroundTheme = document.getElementById(
      "TemplateBackgroundTheme"
    ).value;
    let LeftSideBackgroundTheme = document.getElementById(
      "LeftSideBackgroundTheme"
    ).value;
    var editorValue = document
      .getElementById("pageTitle")
      .querySelector(".ql-editor").innerHTML;
    var editorValueRight = document
      .getElementById("pageTitlel")
      .querySelector(".ql-editor").innerHTML;
    var editorValueLeft = document
      .getElementById("pageTitler")
      .querySelector(".ql-editor").innerHTML;
    var w = $("#cardBody").width();
    if (!containers.length) return toast.error("No containers added");
    containers.map((container, containerIndex) => {
      if (
        container.theadbox.length == 0 &&
        container.boxes.length == 0 &&
        container.bheadbox.length == 0
      ) {
        // alert(('Cannot send Empty Container'))

        checkEmpty = true;
      }

      container.theadbox.forEach((box, htIndex) => {
        var htwv = $("#top_headline_box_" + containerIndex + htIndex).width();
        let HeadlineTopBackground = document.getElementById("HeadlineTopBackground").value;

        // console.log("ht", htwv)
        htwv = Math.round((htwv * 100) / (w - 8));
        var chartObject = {
          width: htwv,
          HeadlineTopBackground: HeadlineTopBackground,

        };
        // console.log('box', box)
        // alert(box?.quillData)
        if (!box?.quillData || box?.quillData == "<p><br></p>")
          checkheading = true;
        var updatedContainers = [...containers];
        var updatedBox = {
          ...updatedContainers[containerIndex].theadbox[htIndex], // Copy the existing box
          ...chartObject, // Update with new details
        };
        updatedContainers[containerIndex].theadbox[htIndex] = updatedBox; // Update the box at the specified index
        setContainers(updatedContainers);
      });

      container.boxes.forEach((box, boxIndex) => {
        var bwv = $("#tempboxId_" + containerIndex + boxIndex).width();
        var bhv = $("#tempboxId_" + containerIndex + boxIndex).height();
        // console.log("bb", box)
        if (!box?.boxChartType) checkBox = true;
        bwv = Math.round(((bwv - 8) * 100) / (w - 16));
        var chartObject = {
          width: bwv,
          height: bhv,
        };

        var updatedContainers = [...containers];
        var updatedBox = {
          ...updatedContainers[containerIndex].boxes[boxIndex], // Copy the existing box
          ...chartObject, // Update with new details
        };
        updatedContainers[containerIndex].boxes[boxIndex] = updatedBox; // Update the box at the specified index
        // if(!box?.boxChartType) Checkbox=true
        setContainers(updatedContainers);
      });

      container.bheadbox.forEach((box, hbIndex) => {
        var hbwv = $(
          "#bottom_headline_box_" + containerIndex + hbIndex
        ).width();
        let HeadlineBottomBackground = document.getElementById("HeadlineBottomBackground").value;

        // console.log("hb", hbwv)
        hbwv = Math.round((hbwv * 100) / (w - 8));
        var chartObject = {
          width: hbwv,
          HeadlineBottomBackground: HeadlineBottomBackground,

        };

        var updatedContainers = [...containers];
        var updatedBox = {
          ...updatedContainers[containerIndex].bheadbox[hbIndex], // Copy the existing box
          ...chartObject, // Update with new details
        };
        updatedContainers[containerIndex].bheadbox[hbIndex] = updatedBox; // Update the box at the specified index
        setContainers(updatedContainers);
        if (!box?.quillData || box?.quilData == "<p><br></p>")
          checkbottom = true;
      });
    });

    if (errorHeading === true) {
      toast.warning("Please fill heading or remove");
    } else if (errorBox === true) {
      toast.warning("Please  any chart or table select or remove");
    } else if (TemplateName === "") {
      toast.warning("Template Name field is mandatory please fill");
    } else if (checkEmpty) {
      toast.warning("Cannot send Empty Container");
    } else if (checkheading) {
      toast.warning("Cannot send Empty Headline Top");
    } else if (checkbottom) {
      toast.warning("Cannot send Empty Headline Bottom");
    } else if (checkBox) {
      toast.warning("Cannot send Empty Box");
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}userRole/template`, {
          tempId: dataId,
          TemplateName,
          Description,
          TemplateCat,
          TemplateBackgroundTheme,
          LeftSideBackgroundTheme,
          pagetitlec: editorValue,
          pagetitlel: editorValueRight,
          pagetitler: editorValueLeft,
          allContainer: containers,
        })
        .then((res) => {
          // console.log(res.data.data);
          alert(res?.data?.message)
          toast.success(res?.data?.message);
          navigate('/edit_template')
          errorHeading = false;
          errorBox = false;
        })
        .catch((error) => {
          toast.error(error?.response?.data?.messsage);
          // console.log(error);
        });
    }
  };

  const removeContentQuillTop = (cIndex, hIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[cIndex].theadbox.splice(hIndex, 1);
    setContainers(updatedContainers);
  };

  const removeContentQuillBottom = (cIndex, hIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[cIndex].bheadbox.splice(hIndex, 1);
    setContainers(updatedContainers);
  };

  const removeContentBox = (cIndex, hIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[cIndex].boxes.splice(hIndex, 1);
    setContainers(updatedContainers);
  };

  const handleSubmitTemplatePreview = (e) => {
    e.preventDefault();
    let errorBox = false;
    let errorHeading = false;
    let TemplateName = document.getElementById("TemplateName").value;
    let Description = document.getElementById("Description").value;
    let TemplateCat = document.getElementById("TemplateCat").value;
    let TemplateBackgroundTheme = document.getElementById(
      "TemplateBackgroundTheme"
    ).value;
    let LeftSideBackgroundTheme = document.getElementById(
      "LeftSideBackgroundTheme"
    ).value;
    if (!TemplateName || !Description || !containers?.length) {
      toast.error("Please Create Template First");
    } else {
      setPreviewModal(true);
      let editorValue = document
        .getElementById("pageTitle")
        .querySelector(".ql-editor").innerHTML;
      let editorValueRight = document
        .getElementById("pageTitlel")
        .querySelector(".ql-editor").innerHTML;
      let editorValueLeft = document
        .getElementById("pageTitler")
        .querySelector(".ql-editor").innerHTML;
      let w = $("#cardBody").width();
      containers?.map((container, containerIndex) => {
        container.theadbox.forEach((box, htIndex) => {
          let htwv = $("#top_headline_box_" + containerIndex + htIndex).width();
          let HeadlineTopBackground = document.getElementById(
            "HeadlineTopBackground"
          ).value;
          htwv = Math.round((htwv * 100) / (w - 8));
          let chartObject = {
            width: htwv,
            HeadlineTopBackground: HeadlineTopBackground,
          };
          let updatedContainers = [...containers];
          let updatedBox = {
            ...updatedContainers[containerIndex].theadbox[htIndex], // Copy the existing box
            ...chartObject, // Update with new details
          };
          updatedContainers[containerIndex].theadbox[htIndex] = updatedBox; // Update the box at the specified index
          setContainers(updatedContainers);
        });

        container.boxes.forEach((box, boxIndex) => {
          let bwv = $("#tempboxId_" + containerIndex + boxIndex).width();
          let bhv = $("#tempboxId_" + containerIndex + boxIndex).height();
          bwv = Math.round(((bwv - 8) * 100) / (w - 16));
          bhv = bhv - 38;
          let chartObject = {
            width: bwv,
            height: bhv,
          };
          let updatedContainers = [...containers];
          let updatedBox = {
            ...updatedContainers[containerIndex].boxes[boxIndex], // Copy the existing box
            ...chartObject, // Update with new details
          };
          updatedContainers[containerIndex].boxes[boxIndex] = updatedBox; // Update the box at the specified index
          setContainers(updatedContainers);
        });

        container.bheadbox.forEach((box, hbIndex) => {
          let hbwv = $(
            "#bottom_headline_box_" + containerIndex + hbIndex
          ).width();
          let HeadlineBottomBackground = document.getElementById(
            "HeadlineBottomBackground"
          ).value;
          hbwv = Math.round((hbwv * 100) / (w - 8));
          let chartObject = {
            width: hbwv,
            HeadlineBottomBackground: HeadlineBottomBackground,
          };
          let updatedContainers = [...containers];
          let updatedBox = {
            ...updatedContainers[containerIndex].bheadbox[hbIndex], // Copy the existing box
            ...chartObject, // Update with new details
          };
          updatedContainers[containerIndex].bheadbox[hbIndex] = updatedBox; // Update the box at the specified index
          setContainers(updatedContainers);
        });
      });
      if (errorHeading === true) {
        toast.warning("Please fill heading or remove");
      } else if (errorBox === true) {
        toast.warning("Please  any chart or table select or remove");
      } else if (TemplateName === "") {
        toast.warning("Template Name field is mandatory please fill");
      } else {
        // console.log(containers, typeof (containers))
        let templateContainers = containers?.map((i, index) => {
          return { containerBoxes: i?.boxes };
        });

        //     templateContainers?.map((i,containerIndex)=>{
        //         i?.containerBoxes?.map((i,boxIndex)=>{
        //         let bwv = $("#tempboxId_" + containerIndex + boxIndex).width();
        //         i.width=Math.round(((bwv - 8) * 100) / (w - 16))
        //     })
        // })
        // // console.log({ templateContainers })

        setData({
          TemplateName,
          Description,
          pageTitlel: editorValueLeft,
          pageTitler: editorValueRight,
          pageTitlec: editorValue,
          templateContainers,
        });
      }
    }
  };

  useEffect(() => {
    // console.log("first", data)
  }, [data]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}userrole/template?templateId=${dataId}`
      )
      .then((res) => {
        // console.log(res.data.data);
        setDescription(res?.data?.data?.Description);
        setTemplateBackgroundTheme(res?.data?.data?.TemplateBackgroundTheme);
        setTemplate_Type(res?.data?.data?.Template_Type);
        setPagetitleColorC(res?.data?.data?.pagetitleColorC);
        setTemplateName(res?.data?.data?.name);
        setPageCenter(res?.data?.data?.pageTitlec);
        setPageLeft(res?.data?.data?.pageTitlel);
        setPageRight(res?.data?.data?.pageTitler);
        setContainers(() => {
          const updatedContainers = [...containers];
          res?.data?.data?.templateContainers?.forEach((items, a) => {
            // Create a new container for each iteration
            updatedContainers.push({ boxes: [], theadbox: [], bheadbox: [] });

            // Update theadbox or bheadbox based on position
            items?.containerHeaders?.forEach((thead, th) => {
              const chartObject = {
                position: thead.position,
                quillData: thead.quillData,
                width: thead.width,
                HeadlineTopBackground: thead.HeadlineTopBackground,
                HeadlineBottomBackground: thead.HeadlineBottomBackground,
              };
              if (thead.position === "top") {
                updatedContainers[a].theadbox.push({ ...chartObject });
              } else if (thead.position === "bottom") {
                updatedContainers[a].bheadbox.push({ ...chartObject });
              }
            });
            
            // Update boxes
            items?.containerBoxes?.forEach((box) => {
              const chartObject = {
                dataLabel:JSON.parse(box.dataLabel),
                dataSeries:JSON.parse(box.dataSeries),
                title: box.title,
                titleBackgroundColorBG:box?.titleBackgroundColorBG,
                titleBackgroundColor: box.titleBackgroundColor,
                boxContainerIndex: box.boxContainerIndex,
                boxBoxIndex: box.boxBoxIndex,
                boxDataId: box.boxDataId,
                categoryValue:box?.categoryValue,
                subCategoryValue:box?.subCategoryValue,
                subvalue:box?.subvalue,
                boxCategoryValue: box.boxCategoryValue,
                boxSubCategoryValue: box.boxSubCategoryValue,
                boxMetricsValue: box.boxMetricsValue,
                boxChartType: box.boxChartType,
                width: box.width,
                height: box.height,
                position: box.position,
                BackgroundColor: box.BackgroundColor,
                FontSize: box.FontSize,
                YAxis: box.YAxis,
                XAxis: box.XAxis,
                Color: JSON.parse(box.Color),
                LegendDisplay: box.LegendDisplay,
                gridX: box.gridX,
                gridY: box.gridY,
                axisX: box.axisX,
                axisY: box.axisY,
                textColor: box.textColor,
                PeakValueC: box.PeakValueC,
                TargetValueLineColor: box.TargetValueLineColor,
                LableTextColorTarget: box.LableTextColorTarget,
                FontSizeTarget: box.FontSizeTarget,
                TargetValue: box.TargetValue,
                LowestValueC: box.LowestValueC,
                TargetValueTitle: box.TargetValueTitle,
                PeakValueTitle: box.PeakValueTitle,
                LowestValueTitle: box.LowestValueTitle,
                Tooltip: box.Tooltip,
                TargetDisplay: box.TargetDisplay,
                PeakDisplay: box.PeakDisplay,
                LowestDisplay: box.LowestDisplay,
                LowestLineDisplay: box.LowestLineDisplay,
                TargetLineDisplay: box.TargetLineDisplay,
                PeakLineDisplay: box.PeakLineDisplay,
                FontSizeLowest: box.FontSizeLowest,
                FontSizePeak: box.FontSizePeak,
                PositionLowestTB: box.PositionLowestTB,
                PositionLowestLR: box.PositionLowestLR,
                PositionTargetTB: box.PositionTargetTB,
                PositionTargetLR: box.PositionTargetLR,
                PositionPeakLR: box.PositionPeakLR,
                PositionPeakTB: box.PositionPeakTB,
                DataLabels: box.DataLabels,
                LebalX: box.LebalX,
                LebalY: box.LebalY,
                LavelYColor: box.LavelYColor,
                LavelXColor: box.LavelXColor,
                LegendTextColor: box.LegendTextColor,
                ValuePeak: box.ValuePeak,
                ValueTarget: box.ValueTarget,
                ValueLowest: box.ValueLowest,
                Stacked: box.Stacked,
              };

              updatedContainers[a].boxes.push({ ...chartObject });
            });
          });
          return updatedContainers;
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [dataId]);

  const handleTopBg = (e) => {
    setTopBg(e.target.value);
    
  };
  const handleBottomBg = (e) => {
    setBottomBg(e.target.value);
  };

  return (
    <>
      {/* All Button Component */}
      <NavLink to='/edit_template' className='p-2'>
<RotateLeftSharp/>

 </NavLink>

      {/* Template Name, Description, Page Title */}
      <div className="tw-card mb-2">
        <div
          className="tw-card-header"
          style={{ justifyContent: "space-between" }}
        >
          Create Template and Set Page Title
        </div>

        <div className="tw-card-body">
          <div className="tw-flex tw-justify-between tw-flex-wrap">
            <div className="tw-flex tw-flex-wrap tw-mb-6 tw-w-[32.50%]">
              <div className="tw-w-full">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2"
                  htmlFor="TemplateName"
                >
                  Template Name <span className="tw-text-red-600">*</span>
                </label>
                <input
                  id="TemplateName"
                  autoFocus
                  className="tw-appearance-none tw-block tw-w-full  tw-text-gray-700 tw-border tw-border-gray-200 tw-rounded tw-py-2 tw-px-4  tw-leading-tight tw-focus:outline-none tw-focus:bg-white tw-focus:border-gray-500"
                  type="text"
                  placeholder="Enter Template Title"
                  onChange={(e) => setTemplateName(e.target.value)}
                  value={TemplateName}
                />
              </div>
            </div>
            <div className="tw-flex tw-flex-wrap tw-mb-6 tw-w-[32.50%]">
              <div className="tw-w-full">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold mb-2"
                  htmlFor="Description"
                >
                  Description
                </label>
                <input
                  id="Description"
                  className="tw-appearance-none tw-block tw-w-full  tw-text-gray-700 tw-border tw-border-gray-200 tw-rounded py-2 px-4  tw-leading-tight tw-focus:outline-none tw-focus:bg-white tw-focus:border-gray-500"
                  type="text"
                  placeholder="Enter template description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={Description}
                />
              </div>
            </div>
            <div className="tw-flex tw-flex-wrap tw-mb-6 tw-w-[32.50%]">
              <div className="tw-w-full">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold mb-2"
                  htmlFor="TemplateCat"
                >
                  Template Category
                </label>
                <select
                  id="TemplateCat"
                  // value={TemplateTypeId}
                  name="TemplateCat"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="tw-appearance-none tw-block tw-w-full  tw-text-gray-700 tw-border tw-border-gray-200 tw-rounded tw-py-2 px-4  tw-leading-tight tw-focus:outline-none tw-focus:bg-white tw-focus:border-gray-500"
                >
                  <option value="">Select</option>
                  {TemplateCat?.map((item, i) => {
                    return (
                      <option
                        key={i}
                        value={item.id}
                        selected={
                          item?.Type == Template_Type?.Type ? true : false
                        }
                      >
                        {item.Type}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="tw-flex tw-flex-wrap tw-mb-6 md:tw-w-[33.33%]">
              <div className="tw-w-full">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold mb-2"
                  htmlFor="pageTitlel"
                >
                  Create Left Side Page Title and Paragraph
                </label>
                <ReactQuill
                  theme="snow"
                  id="pageTitlel"
                  modules={{ toolbar: toolbarOptions }}
                  value={PageLeft}
                ></ReactQuill>
              </div>
            </div>
            <div className="tw-flex tw-flex-wrap tw-mb-6 md:tw-w-[33.33%]">
              <div className="tw-w-full">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold mb-2"
                  htmlFor="pageTitle"
                >
                  Create Center Page Title and Paragraph
                </label>
                <ReactQuill
                  theme="snow"
                  value={PageCenter}
                  id="pageTitle"
                  modules={{ toolbar: toolbarOptions }}
                ></ReactQuill>
              </div>
            </div>
            <div className="tw-flex tw-flex-wrap tw-mb-6 md:tw-w-[33.33%]">
              <div className="tw-w-full">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold mb-2"
                  htmlFor="pageTitler"
                >
                  Create Right Side Page Title and Paragraph
                </label>
                <ReactQuill
                  theme="snow"
                  value={PageRight}
                  id="pageTitler"
                  modules={{ toolbar: toolbarOptions }}
                ></ReactQuill>
              </div>
            </div>
            <div className="tw-flex tw-w-[100%]">
              <div className="tw-w-full tw-flex tw-items-center">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold"
                  htmlFor="Background"
                >
                  Template Background Theme : &nbsp;
                </label>
                <input
                  id="TemplateBackgroundTheme"
                  className="tw-w-[30%] tw-h-[38px] tw-rounded"
                  type="color"
                  value={TemplateBackgroundTheme}
                  name="TemplateBackgroundTheme"
                  onChange={(e) => {
                    setTemplateBackgroundTheme(e.target.value);
                  }}
                />
              </div>
              <div className="tw-w-full tw-flex tw-items-center ">
                <label
                  className="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold"
                  htmlFor="LeftSideBackgroundTheme"
                >
                  Page Title and Paragraph Background Color : &nbsp;
                </label>
                <input
                  id="LeftSideBackgroundTheme"
                  className="tw-w-[30%] tw-h-[38px] tw-rounded"
                  type="color"
                  value={pagetitleColorC}
                  name="pagetitleColorC"
                  onChange={(e) => {
                    setPagetitleColorC(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Chart And Heading */}
      <div className="tw-card">
        <div className="tw-card-header">
          <button onClick={addContainer} className="add-more-container">
            <span>+</span> Add Container
          </button>
        </div>
        <div className="card-body" id="cardBody">
          <ReactSortable shared list={containers} setList={setContainers}>
            {containers.map((container, containerIndex) => (
              <div
                key={containerIndex}
                id={"container_" + containerIndex}
                className="AllContainers mt-5 card"
              >
                <div className="
                 tw-card-header tw-bg-slate-300 tw-flex tw-justify-between tw-items-center tw-relative tw-bg-header p-2
                 ">
                  <span
                    className="removeContent"
                    onClick={() => removeContent("container_" + containerIndex)}
                  >
                    <HighlightOffIcon />
                  </span>
                  <span>Container {containerIndex + 1}</span>
                  <span>
                    <button
                      onClick={() => addHeadlineTop(containerIndex)}
                      className="add-more-box"
                    >
                      <span>+</span> Headline top
                    </button>
                    <button
                      onClick={() => addHeadlineBottom(containerIndex)}
                      className="add-more-box mx-3"
                    >
                      <span>+</span> Headline Bottom
                    </button>
                    <button
                      onClick={() => addBox(containerIndex)}
                      className="add-more-box"
                    >
                      <span>+</span> Box
                    </button>
                  </span>
                </div>
                <div className="tw-card-body tw-flex tw-ptemp tw-flex-wrap tw-relative containersBodys p-1">
                  {container?.theadbox?.map((box, htIndex) => (
                    <>
                      <div
                        key={htIndex}
                        id={"top_headline_box_" + containerIndex + htIndex}
                        className="Headline-box tw-resize-x tw-overflow-auto tw-mb-2 tw-relative"
                        // ref={boxRefHead.current[containerIndex][htIndex]}
                      >
                        <ReactQuill
                          theme="snow"
                          className="Headline-box-top"
                          modules={{ toolbar: toolbarOptions }}
                          value={box?.position === "top" ? box?.quillData : ""}
                          placeholder="Add text on top"
                          onChange={(content, delta, source, editor) =>
                            handleQuil("top", content, containerIndex, htIndex)
                          }
                        />
                        <input
                          id="HeadlineTopBackground"
                          className="tw-rounded removeContent-two tw-mr-8"
                          type="color"
                          value={box?.HeadlineTopBackground}
                          onChange={(e)=>handleQuilColor("top",e.target.value,containerIndex, htIndex)}
                        />
                        <span
                          className="removeContent-two"
                          onClick={() =>
                            removeContentQuillTop(containerIndex, htIndex)
                          }
                        >
                          <HighlightOffIcon />
                        </span>
                      </div>
                    </>
                  ))}
                  <span className="tw-block tw-w-[100%]"></span>
                  <ReactSortable
                    list={container.boxes}
                    setList={(sortedBoxes) =>
                      setContainers((prevContainers) => {
                        const updatedContainers = [...prevContainers];
                        updatedContainers[containerIndex].boxes = sortedBoxes;
                        return updatedContainers;
                      })
                    }
                    className="tw-flex tw-flex-wrap tw-w-[100%]"
                  >
                    {container?.boxes?.map((box, boxIndex) => (
                      <div
                        key={boxIndex}
                        id={"tempboxId_" + containerIndex + boxIndex}
                        className="boxes tw-resize tw-overflow-auto tw-border-2"
                        data-show="1"
                        style={{
                          width: `${box.width}%`,
                          height: `${box.height}px`,
                        }}
                      >
                        <div className="box-body">
                          <div className="box-header tw-relative">
                            <span>
                              <span
                                className={
                                  box.boxChartType != null
                                    ? "addChartBox tw-hidden"
                                    : "addChartBox tw-inline-block"
                                }
                                // style={{display:'none'}}
                                onClick={() =>
                                  openChart(
                                    "tempboxId_" + containerIndex + boxIndex,
                                    containerIndex,
                                    boxIndex
                                  )
                                }
                              >
                                <AddCircleIcon />
                              </span>
                              <span
                                className={
                                  box.boxChartType != null
                                    ? "editChartBox tw-inline-block"
                                    : "editChartBox tw-hidden"
                                }
                                onClick={() =>
                                  openrChart(
                                    "tempboxId_" + containerIndex + boxIndex,
                                    containerIndex,
                                    boxIndex
                                  )
                                }
                              >
                                <ModeEditIcon />
                              </span>
                              <span
                                className={
                                  box.boxChartType != null
                                    ? "cursor-pointer removeChartBox2 tw-inline-block"
                                    : "cursor-pointer removeChartBox2 tw-hidden"
                                }
                                onClick={() =>
                                  openrChart2(
                                    "tempboxId_" + containerIndex + boxIndex,
                                    containerIndex,
                                    boxIndex
                                  )
                                }
                              >
                                <FilterAltIcon />
                              </span>
                              <span
                                className="removeContent-high justify-end"
                                onClick={() =>
                                  removeContentBox(containerIndex, boxIndex)
                                }
                              >
                                <HighlightOffIcon />
                              </span>
                            </span>
                          </div>
                          <div className="chart-box">
                            {box.boxChartType == "Chart1" ? (
                              <div className="chartOrTableType Chart1">
                                {console.log(box)}
                                {box.textColor}
                                <Chart1
                                subvalue={box?.boxMetricsValue}
                                subCategoryValue={box?.boxSubCategoryValue}
                                categoryValue={box?.boxCategoryValue} 
                                labels={box.dataLabel}
                                series={box.dataSeries}
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  // FontSize={box.FontSize}
                                  // YAxis={box.YAxis}
                                  // XAxis={box.XAxis}
                                  Color={box.Color}
                                  DataLabels={box.DataLabels}
                                  LegendDisplay={box.LegendDisplay}
                                  LegendTextColor={box.LegendTextColor}
                                  // gridX={box.gridX}
                                  // gridY={box.gridY}
                                  // axisX={box.axisX}
                                  // axisY={box.axisY}
                                  // TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart2" ? (
                              <div className="chartOrTableType Chart2">
                                {box.textColor}
                                <Chart2
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  // FontSize={box.FontSize}
                                  // YAxis={box.YAxis}
                                  // XAxis={box.XAxis}
                                  DataLabels={box.DataLabels}
                                  Color={box.Color}
                                  LegendTextColor={box.LegendTextColor}
                                  LegendDisplay={box.LegendDisplay}
                                  // gridX={box.gridX}
                                  // gridY={box.gridY}
                                  // axisX={box.axisX}
                                  // axisY={box.axisY}
                                  // TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart3" ? (
                              <div className="chartOrTableType Chart3">
                                {box.textColor}
                                <Chart3
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  // FontSize={box.FontSize}
                                  // YAxis={box.YAxis}
                                  // XAxis={box.XAxis}
                                  DataLabels={box.DataLabels}
                                  Color={box.Color}
                                  LegendTextColor={box.LegendTextColor}
                                  LegendDisplay={box.LegendDisplay}
                                  // gridX={box.gridX}
                                  // gridY={box.gridY}
                                  // axisX={box.axisX}
                                  // axisY={box.axisY}
                                  // TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart4" ? (
                              <div className="chartOrTableType Chart4">
                                {box.textColor}
                                <Chart4
                                    subvalue={box?.boxMetricsValue}
                                subCategoryValue={box?.boxSubCategoryValue}
                                categoryValue={box?.boxCategoryValue} 
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  // FontSize={box.FontSize}
                                  // YAxis={box.YAxis}
                                  // XAxis={box.XAxis}
                                  DataLabels={box.DataLabels}
                                  Color={box.Color}
                                  LegendTextColor={box.LegendTextColor}
                                  LegendDisplay={box.LegendDisplay}
                                  // gridX={box.gridX}
                                  // gridY={box.gridY}
                                  // axisX={box.axisX}
                                  // axisY={box.axisY}
                                  // TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart5" ? (
                              <div className="chartOrTableType Chart5">
                                {box.textColor}
                                <Chart5
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  // FontSize={box.FontSize}
                                  // YAxis={box.YAxis}
                                  // XAxis={box.XAxis}
                                  DataLabels={box.DataLabels}
                                  Color={box.Color}
                                  LegendTextColor={box.LegendTextColor}
                                  LegendDisplay={box.LegendDisplay}
                                  // gridX={box.gridX}
                                  // gridY={box.gridY}
                                  // axisX={box.axisX}
                                  // axisY={box.axisY}
                                  // TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart6" ? (
                              <div className="chartOrTableType Chart6">
                                {box.textColor}
                                <Chart6
                                    subvalue={box?.boxMetricsValue}
                                subCategoryValue={box?.boxSubCategoryValue}
                                categoryValue={box?.boxCategoryValue} 
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  // FontSize={box.FontSize}
                                  // YAxis={box.YAxis}
                                  // XAxis={box.XAxis}
                                  DataLabels={box.DataLabels}
                                  Color={box.Color}
                                  LegendTextColor={box.LegendTextColor}
                                  LegendDisplay={box.LegendDisplay}
                                  // gridX={box.gridX}
                                  // gridY={box.gridY}
                                  // axisX={box.axisX}
                                  // axisY={box.axisY}
                                  // TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart7" ? (
                              <div className="chartOrTableType Chart7">
                                {box.textColor}
                                <Chart7
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart8" ? (
                              <div className="chartOrTableType Chart8">
                                {box.textColor}
                                <Chart8
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart9" ? (
                              <div className="chartOrTableType Chart9">
                                {box.textColor}
                                <Chart9
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart10" ? (
                              <div className="chartOrTableType Chart10">
                                {box.textColor}
                                <Chart10
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart11" ? (
                              <div className="chartOrTableType Chart11">
                                {box.textColor}
                                <Chart11
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart12" ? (
                              <div className="chartOrTableType Chart12">
                                {box.textColor}
                                <Chart12
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart13" ? (
                              <div className="chartOrTableType Chart13">
                                {box.textColor}
                                <Chart13
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart14" ? (
                              <div className="chartOrTableType Chart14">
                                {box.textColor}
                                <Chart14
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart15" ? (
                              <div className="chartOrTableType Chart15">
                                {box.textColor}
                                <Chart15
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                  Stacked={box.Stacked}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart16" ? (
                              <div className="chartOrTableType Chart16">
                                {box.textColor}
                                <Chart16
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart17" ? (
                              <div className="chartOrTableType Chart17">
                                {box.textColor}
                                <Chart17
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart18" ? (
                              <div className="chartOrTableType Chart18">
                                {box.textColor}
                                <Chart18
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  Stacked={box.Stacked}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart19" ? (
                              <div className="chartOrTableType Chart19">
                                {box.textColor}
                                <Chart19
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart20" ? (
                              <div className="chartOrTableType Chart20">
                                {box.textColor}
                                <Chart20
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart21" ? (
                              <div className="chartOrTableType Chart21">
                                {box.textColor}
                                <Chart21
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                  Stacked={box.Stacked}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart22" ? (
                              <div className="chartOrTableType Chart22">
                                {box.textColor}
                                <Chart22
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  Stacked={box.Stacked}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart23" ? (
                              <div className="chartOrTableType Chart23">
                                {box.textColor}
                                <Chart23
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart24" ? (
                              <div className="chartOrTableType Chart24">
                                {box.textColor}
                                <Chart24
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  Stacked={box.Stacked}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart25" ? (
                              <div className="chartOrTableType Chart25">
                                {box.textColor}
                                <Chart25
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart26" ? (
                              <div className="chartOrTableType Chart26">
                                {box.textColor}
                                <Chart26
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart27" ? (
                              <div className="chartOrTableType Chart27">
                                {box.textColor}
                                <Chart27
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart28" ? (
                              <div className="chartOrTableType Chart28">
                                {box.textColor}
                                <Chart28
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart29" ? (
                              <div className="chartOrTableType Chart29">
                                {box.textColor}
                                <Chart29
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart30" ? (
                              <div className="chartOrTableType Chart30">
                                {box.textColor}
                                <Chart30
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart31" ? (
                              <div className="chartOrTableType Chart31">
                                {box.textColor}
                                <Chart31
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart32" ? (
                              <div className="chartOrTableType Chart32">
                                {box.textColor}
                                <Chart32
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                  Stacked={box.Stacked}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart33" ? (
                              <div className="chartOrTableType Chart33">
                                {box.textColor}
                                <Chart33
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart34" ? (
                              <div className="chartOrTableType Chart34">
                                {box.textColor}
                                <Chart34
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart35" ? (
                              <div className="chartOrTableType Chart35">
                                {box.textColor}
                                <Chart35
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.textColor}
                                  PeakValueC={box.PeakValueC}
                                  TargetValueLineColor={
                                    box.TargetValueLineColor
                                  }
                                  LableTextColorTarget={
                                    box.LableTextColorTarget
                                  }
                                  FontSizeTarget={box.FontSizeTarget}
                                  TargetValue={box.TargetValue}
                                  LowestValueC={box.LowestValueC}
                                  TargetValueTitle={box.TargetValueTitle}
                                  PeakValueTitle={box.PeakValueTitle}
                                  LowestValueTitle={box.LowestValueTitle}
                                  Tooltip={box.Tooltip}
                                  TargetDisplay={box.TargetDisplay}
                                  PeakDisplay={box.PeakDisplay}
                                  LowestDisplay={box.LowestDisplay}
                                  LowestLineDisplay={box.LowestLineDisplay}
                                  TargetLineDisplay={box.TargetLineDisplay}
                                  PeakLineDisplay={box.PeakLineDisplay}
                                  FontSizeLowest={box.FontSizeLowest}
                                  FontSizePeak={box.FontSizePeak}
                                  PositionLowestTB={box.PositionLowestTB}
                                  PositionLowestLR={box.PositionLowestLR}
                                  PositionTargetTB={box.PositionTargetTB}
                                  PositionTargetLR={box.PositionTargetLR}
                                  PositionPeakLR={box.PositionPeakLR}
                                  PositionPeakTB={box.PositionPeakTB}
                                  DataLabels={box.DataLabels}
                                  LebalX={box.LebalX}
                                  LebalY={box.LebalY}
                                  AverageDisplay={box.AverageDisplay}
                                  AverageLineDisplay={box.AverageLineDisplay}
                                  PositionAverageLR={box.PositionAverageLR}
                                  PositionAverageTB={box.PositionAverageTB}
                                  AverageValueTitle={box.AverageValueTitle}
                                  AverageValueC={box.AverageValueC}
                                  FontSizeAverage={box.FontSizeAverage}
                                  MovingDisplay={box.MovingDisplay}
                                  MovingValueC={box.MovingValueC}
                                  LavelYColor={box.LavelYColor}
                                  LavelXColor={box.LavelXColor}
                                  StrokeLine={box.StrokeLine}
                                  LineTpyeSD={box.LineTpyeSD}
                                  LineWidth={box.LineWidth}
                                  LegendTextColor={box.LegendTextColor}
                                  ValuePeak={box.ValuePeak}
                                  ValueTarget={box.ValueTarget}
                                  ValueLowest={box.ValueLowest}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {box.boxChartType == "Chart36" ? (
                              <div className="chartOrTableType Chart36">
                                {box.textColor}
                                <Chart36
                                  position={box.position}
                                  BackgroundColor={box.BackgroundColor}
                                  FontSize={box.FontSize}
                                  YAxis={box.YAxis}
                                  XAxis={box.XAxis}
                                  Color={box.Color}
                                  LegendDisplay={box.LegendDisplay}
                                  gridX={box.gridX}
                                  gridY={box.gridY}
                                  axisX={box.axisX}
                                  axisY={box.axisY}
                                  TextColor={box.TextColor}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ReactSortable>
                  <span className="tw-block tw-w-[100%]"></span>
                  {container?.bheadbox?.map((box, hbIndex) => (
                    <div
                      key={hbIndex}
                      // ref={boxRefBottom.current[containerIndex][hbIndex]}
                      id={"bottom_headline_box_" + containerIndex + hbIndex}
                      className="Headline-box mt-2 tw-resize-x tw-overflow-auto tw-relative"
                    >
                      <ReactQuill
                        theme="snow"
                        className="Headline-box-bottom"
                        value={box?.position === "bottom" ? box?.quillData : ""}
                        modules={{ toolbar: toolbarOptions }}
                        placeholder="Add text on bottom"
                        onChange={(content, delta, source, editor) =>
                          handleQuil("bottom", content, containerIndex, hbIndex)
                        }
                      />
                      <input
                        id="HeadlineBottomBackground"
                        className="tw-rounded removeContent-two tw-mr-8"
                        type="color"
                        onChange={(e)=>handleQuilColor("bottom",e.target.value,containerIndex, hbIndex)}
                        value={box?.HeadlineBottomBackground}
                      />
                      <span
                        className="removeContent-two"
                        onClick={() =>
                          removeContentQuillBottom(containerIndex, hbIndex)
                        }
                      >
                        <HighlightOffIcon />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>

      {/* Submit Template */}
      <div>
        <div className="tw-mt-3 tw-gap-x-2 tw-justify-end tw-flex">
          <Button
            onClick={handleSubmitTemplate}
            variant="outlined"
            color="info"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Preview */}
      <Modal open={previewModal} onClose={() => setPreviewModal(false)}>
        <div
          style={{
            backgroundColor: "white",
            height: "85%",
            marginTop: "30px",
            margin: "auto",
          }}
        >
          <PreviewTemplate pdata={data} setPreviewModal={setPreviewModal} />
        </div>
      </Modal>

      {/* Modal Chart to select chart for box */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="tw-w-full tw-bg-white tw-border-[1px]  tw-text-gray-900 tw-border-gray-300 tw-pb-5 demo">
            <div className="tw-border-b-[1px] py-1 px-3 tw-bg-gray-50 tw-items-center tw-flex tw-justify-between">
              <span className="text-xl tw-font-medium tw-leading-6">KPI</span>
            </div>
            <div className="tw-grid tw-grid-cols-6 py-1 px-2 tw-gap-x-4 sm:tw-grid-cols-6">
              <div className="sm:tw-col-span-2 sm:tw-col-start-1">
                <label
                  htmlFor="category"
                  className="tw-text-medium tw-leading-6 tw-text-gray-900"
                >
                  Category :
                </label>
                <div className="">
                  <select
                    style={{ color: "red !important" }}
                    id="Category"
                    // defaultValue={categoryValue || ""}
                    onChange={(e) => handleChangeCategory(e.target.value)}
                    autoComplete="country-name"
                    className=" form-control tw-block tw-w-full tw-rounded-sm tw-border-0 tw-py-0.5 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-1 focus:tw-ring-inset focus:tw-ring-gray-400 sm:tw-text-sm sm:tw-leading-6"
                  >
                    <option value="">Select</option>
                    {category?.map((item, i) => {
                      return (
                        <option
                          key={i}
                          value={item.category}
                          selected={
                            item.category == categoryValue ? true : false
                          }
                        >
                          {item.category}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sm:tw-col-span-2">
                <label
                  htmlFor="SubCategory"
                  className="tw-text-medium tw-leading-6 tw-text-gray-900"
                >
                  Sub Category :
                </label>
                <div className="">
                  <select
                    style={{ color: "red !important" }}
                    id="SubCategory"
                    // defaultValue={subCategoryValue || ""}
                    onChange={(e) => handleChangeSubCategory(e.target.value)}
                    className="form-control tw-block tw-w-full tw-rounded-sm tw-border-0 py-0.5 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-1 focus:tw-ring-inset focus:tw-ring-gray-400 sm:tw-text-sm sm:tw-leading-6"
                  >
                    <option value="">Select</option>
                    {subCategory?.map((item, i) => {
                      return (
                        <option
                          key={i}
                          value={item.Sub_Category}
                          selected={
                            item.Sub_Category == subCategoryValue ? true : false
                          }
                        >
                          {item.Sub_Category}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sm:tw-col-span-2">
                <label
                  htmlFor="Metrics"
                  className="tw-text-medium tw-leading-6 tw-text-gray-900"
                >
                  Metrics :
                </label>
                <div className="">
                  <select
                    style={{ color: "red !important" }}
                    id="Metrics"
                    // defaultValue={metricsValue || ""}
                    autoComplete="country-name"
                    onChange={(e) => handleChangeMatrics(e.target.value)}
                    className="form-control tw-block tw-w-full tw-rounded-sm tw-border-0 tw-py-0.5 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tww-text-gray-400 focus:tw-ring-1 focus:tw-ring-inset focus:tw-ring-gray-400 sm:tw-text-sm sm:tw-leading-6"
                  >
                    <option value="">Select</option>
                    {metrics?.map((item, i) => {
                      return (
                        <option
                          key={i}
                          value={item.KPI_Measurements}
                          selected={
                            item.KPI_Measurements == metricsValue ? true : false
                          }
                        >
                          {item.KPI_Measurements}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="tw-w-full tw-bg-white tw-border-[1px] mt-3 tw-text-gray-900 tw-border-gray-300 tw-pb-5 demo">
            <div className="tw-border-b-[1px] py-1 px-3 tw-bg-gray-50 tw-items-center tw-flex tw-justify-between">
              <span className="tw-text-xl tw-font-medium tw-leading-6">
                Select any chart
              </span>
            </div>
          </div>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "auto",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Pie Chart" {...a11yProps(0)} />
              <Tab label="Horizontal Chart" {...a11yProps(1)} />
              <Tab label="Line Chart" {...a11yProps(2)} />
              <Tab label="Area Chart" {...a11yProps(3)} />
              <Tab label="Mix Chart" {...a11yProps(4)} />
              <Tab label="Vertical Chart" {...a11yProps(5)} />
              <Tab label="Others" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <section
                id="selectChart1"
                className="selectChart tw-flex tw-flex-wrap"
              >
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_1"
                    data-id="Chart1"
                    data-name="VerticalChart"
                    name="select"
                    value="Chart1"
                    checked={chartTypeData === "Chart1"}
                    onChange={() => handleSelectChart("Chart1", "pie", 5)}
                  />
                  <label htmlFor="control_1">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart1 />
                    </div>
                  </label>
                </div>
                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_2"
                                        data-id="Chart2"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart2"
                                        onChange={() => handleSelectChart("Chart2", 'pie', 5)}
                                    />
                                    <label htmlFor="control_2">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart2 />
                                        </div>
                                    </label>
                                </div>
                                <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_3"
                                        data-id="Chart3"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart3"
                                        onChange={() => handleSelectChart("Chart3", 'pie', 5)}
                                    />
                                    <label htmlFor="control_3">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart3 />
                                        </div>
                                    </label>
                                </div> */}
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_4"
                    data-id="Chart4"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart4"}
                    value="Chart4"
                    onChange={() => handleSelectChart("Chart4", "pie", 5)}
                  />
                  <label htmlFor="control_4">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart4 />
                    </div>
                  </label>
                </div>
                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_5"
                                        data-id="Chart5"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart5"
                                        onChange={() => handleSelectChart("Chart5", 'pie', 5)}
                                    />
                                    <label htmlFor="control_5">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart5 />
                                        </div>
                                    </label>
                                </div> */}
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_6"
                    data-id="Chart6"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart6"}
                    value="Chart6"
                    onChange={() => handleSelectChart("Chart6", "pie", 5)}
                  />
                  <label htmlFor="control_6">
                    <div className="h-auto tw-w-[100%]">
                      <Chart6 />
                    </div>
                  </label>
                </div>
              </section>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <section id="selectChart2" className="selectChart flex flex-wrap">
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_14"
                    data-id="Chart14"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart14"}
                    value="Chart14"
                    onChange={() =>
                      handleSelectChart("Chart14", "horizontal", 1)
                    }
                  />
                  <label htmlFor="control_14">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart14 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_15"
                    data-id="Chart15"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart15"}
                    value="Chart15"
                    onChange={() =>
                      handleSelectChart("Chart15", "horizontal", 2)
                    }
                  />
                  <label htmlFor="control_15">
                    <div className="h-[250px] modalChartBox tw-w-[100%]">
                      <Chart15 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_16"
                    data-id="Chart16"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart16"}
                    value="Chart16"
                    onChange={() =>
                      handleSelectChart("Chart16", "horizontal", 6)
                    }
                  />
                  <label htmlFor="control_16">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart16 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_18"
                    data-id="Chart18"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart18"}
                    value="Chart18"
                    onChange={() =>
                      handleSelectChart("Chart18", "horizontal", 4)
                    }
                  />
                  <label htmlFor="control_18">
                    <div className="h-[200px] modalChartBox tw-w-[100%]">
                      <Chart18 />
                    </div>
                  </label>
                </div>
                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_19"
                                        data-id="Chart19"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart19"
                                        onChange={() => handleSelectChart("Chart19")}
                                    />
                                    <label htmlFor="control_19">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart19 />
                                        </div>
                                    </label>
                                </div> */}
              </section>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <section id="selectChart3" className="selectChart flex flex-wrap">
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_8"
                    data-id="Chart8"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart8"}
                    value="Chart8"
                    onChange={() => handleSelectChart("Chart8", "line", 1)}
                  />
                  <label htmlFor="control_8">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart8 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_9"
                    data-id="Chart9"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart9"}
                    value="Chart9"
                    onChange={() => handleSelectChart("Chart9", "line", 2)}
                  />
                  <label htmlFor="control_9">
                    <div className="h-[220px] modalChartBox tw-w-[100%]">
                      <Chart9 />
                    </div>
                  </label>
                </div>
                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_10"
                                        data-id="Chart10"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart10"
                                        onChange={() => handleSelectChart("Chart10")}
                                    />
                                    <label htmlFor="control_10">
                                        <div className="h-[200px] modalChartBox tw-w-[100%]">
                                            <Chart10 />
                                        </div>
                                    </label>
                                </div> 
                                 <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_11"
                                        data-id="Chart11"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart11"
                                        onChange={() => handleSelectChart("Chart11")}
                                    />
                                    <label htmlFor="control_11">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart11 />
                                        </div>
                                    </label>
                                </div> */}
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_26"
                    data-id="Chart26"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart26"}
                    value="Chart26"
                    onChange={() => handleSelectChart("Chart26", "line", 1)}
                  />
                  <label htmlFor="control_26">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart26 />
                    </div>
                  </label>
                </div>
              </section>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <section id="selectChart4" className="selectChart flex flex-wrap">
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_13"
                    data-id="Chart13"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart13"}
                    value="Chart13"
                    onChange={() => handleSelectChart("Chart13", "area", 2)}
                  />
                  <label htmlFor="control_13">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart13 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_30"
                    data-id="Chart30"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart30"}
                    value="Chart30"
                    onChange={() => handleSelectChart("Chart30", "area", 3)}
                  />
                  <label htmlFor="control_30">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart30 />
                    </div>
                  </label>
                </div>
              </section>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <sectiton
                id="selectChart5"
                className="selectChart flex flex-wrap gap-4"
              >
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_28"
                    data-id="Chart28"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart28"}
                    value="Chart28"
                    onChange={() => handleSelectChart("Chart28", "mix", 2)}
                  />
                  <label htmlFor="control_28">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart28 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_29"
                    data-id="Chart29"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart29"}
                    value="Chart29"
                    onChange={() => handleSelectChart("Chart29", "mix", 3)}
                  />
                  <label htmlFor="control_29">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart29 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_33"
                    data-id="Chart33"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart33"}
                    value="Chart33"
                    onChange={() => handleSelectChart("Chart33", "mix", 3)}
                  />
                  <label htmlFor="control_33">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart33 />
                    </div>
                  </label>
                </div>
              </sectiton>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <section id="selectTable" className="selectChart flex flex-wrap">
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_21"
                    data-id="Chart21"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart21"}
                    value="Chart21"
                    onChange={() => handleSelectChart("Chart21", "vertical", 2)}
                  />
                  <label htmlFor="control_21">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart21 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_22"
                    data-id="Chart22"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart22"}
                    value="Chart22"
                    onChange={() => handleSelectChart("Chart22", "vertical", 3)}
                  />
                  <label htmlFor="control_22">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart22 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_23"
                    data-id="Chart23"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart23"}
                    value="Chart23"
                    onChange={() => handleSelectChart("Chart23", "vertical", 1)}
                  />
                  <label htmlFor="control_23">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart23 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_24"
                    data-id="Chart24"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart24"}
                    value="Chart24"
                    onChange={() => handleSelectChart("Chart24", "vertical", 3)}
                  />
                  <label htmlFor="control_24">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart24 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_32"
                    data-id="Chart32"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart32"}
                    value="Chart32"
                    onChange={() => handleSelectChart("Chart32", "vertical", 3)}
                  />
                  <label htmlFor="control_32">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart32 />
                    </div>
                  </label>
                </div>
                <div className="tw-w-[320px]">
                  <input
                    type="radio"
                    id="control_35"
                    data-id="Chart35"
                    data-name="VerticalChart"
                    name="select"
                    checked={chartTypeData === "Chart35"}
                    value="Chart35"
                    onChange={() => handleSelectChart("Chart35", "vertical", 5)}
                  />
                  <label htmlFor="control_35">
                    <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                      <Chart35 />
                    </div>
                  </label>
                </div>
              </section>
            </TabPanel>
            <TabPanel value={value} index={6}>
              <section id="selectTable" className="selectChart flex flex-wrap">
                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_36"
                                        data-id="Chart36"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart36"
                                        onChange={() => handleSelectChart("Chart36")}
                                    />
                                    <label htmlFor="control_36">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart36 />
                                        </div>
                                    </label>
                                </div> */}

                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_27"
                                        data-id="Chart27"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart27"
                                        onChange={() => handleSelectChart("Chart27")}
                                    />
                                    <label htmlFor="control_27">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart27 />
                                        </div>
                                    </label>
                                </div> */}

                {/* <div className="tw-w-[320px]">
                                    <input
                                        type="radio"
                                        id="control_25"
                                        data-id="Chart25"
                                        data-name="VerticalChart"
                                        name="select"
                                        value="Chart25"
                                        onChange={() => handleSelectChart("Chart25")}
                                    />
                                    <label htmlFor="control_25">
                                        <div className="tw-h-[180px] modalChartBox tw-w-[100%]">
                                            <Chart25 />
                                        </div>
                                    </label>
                                </div> */}
              </section>
            </TabPanel>
          </Box>
          <div className="mt-3 tw-justify-end tw-flex tw-gap-x-4">
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="error"
            >
              Close
            </Button>
            <Button onClick={handleChartType} variant="outlined" color="info">
              Accept
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal Chart to edit chart */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="tw-w-full bg-white  tw-text-gray-900 tw-border-gray-300 mb-1">
            <p className="tw-text-xl tw-font-medium tw-leading-6">
              Modify Chart
            </p>
          </div>

          <div className="tw-w-full bg-white tw-border-[1px]  tw-text-gray-900 tw-border-gray-300 pb-5 demo">
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: "auto",
              }}
            >
              <div className="tw-flex tw-justify-between tw-flex-wrap tw-w-[100%]">
                <div className="p-2 preview-chart-box">
                  {PreviewChartSelect === "Chart1" ? (
                    <div className="chartOrTableType2 Chart1">
                      <Chart1 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart2" ? (
                    <div className="chartOrTableType2 Chart2">
                      <Chart2 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart3" ? (
                    <div className="chartOrTableType2 Chart3">
                      <Chart3 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart4" ? (
                    <div className="chartOrTableType2 Chart4">
                      <Chart4 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart5" ? (
                    <div className="chartOrTableType2 Chart5">
                      <Chart5 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart6" ? (
                    <div className="chartOrTableType2 Chart6">
                      <Chart6 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart7" ? (
                    <div className="chartOrTableType2 Chart7">
                      <Chart7 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart8" ? (
                    <div className="chartOrTableType2 Chart8">
                      <Chart8 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart9" ? (
                    <div className="chartOrTableType2 Chart9">
                      <Chart9 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart10" ? (
                    <div className="chartOrTableType2 Chart10">
                      <Chart10 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart11" ? (
                    <div className="chartOrTableType2 Chart11">
                      <Chart11 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart12" ? (
                    <div className="chartOrTableType2 Chart12">
                      <Chart12 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart13" ? (
                    <div className="chartOrTableType2 Chart13">
                      <Chart13 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart14" ? (
                    <div className="chartOrTableType2 Chart14">
                      <Chart14 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart15" ? (
                    <div className="chartOrTableType2 Chart15">
                      <Chart15 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart16" ? (
                    <div className="chartOrTableType2 Chart16">
                      <Chart16 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart17" ? (
                    <div className="chartOrTableType2 Chart17">
                      <Chart17 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart18" ? (
                    <div className="chartOrTableType2 Chart18">
                      <Chart18 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart19" ? (
                    <div className="chartOrTableType2 Chart19">
                      <Chart19 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart20" ? (
                    <div className="chartOrTableType2 Chart20">
                      <Chart20 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart21" ? (
                    <div className="chartOrTableType2 Chart21">
                      <Chart21 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart22" ? (
                    <div className="chartOrTableType2 Chart22">
                      <Chart22 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart23" ? (
                    <div className="chartOrTableType2 Chart23">
                      <Chart23 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart24" ? (
                    <div className="chartOrTableType2 Chart24">
                      <Chart24 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart25" ? (
                    <div className="chartOrTableType2 Chart25">
                      <Chart25 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart26" ? (
                    <div className="chartOrTableType2 Chart26">
                      <Chart26 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart27" ? (
                    <div className="chartOrTableType2 Chart27">
                      <Chart27 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart28" ? (
                    <div className="chartOrTableType2 Chart28">
                      <Chart28 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart29" ? (
                    <div className="chartOrTableType2 Chart29">
                      <Chart29 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart30" ? (
                    <div className="chartOrTableType2 Chart30">
                      <Chart30 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart31" ? (
                    <div className="chartOrTableType2 Chart31">
                      <Chart31 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart32" ? (
                    <div className="chartOrTableType2 Chart32">
                      <Chart32 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart33" ? (
                    <div className="chartOrTableType2 Chart33">
                      <Chart33 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart34" ? (
                    <div className="chartOrTableType2 Chart34">
                      <Chart34 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart35" ? (
                    <div className="chartOrTableType2 Chart35">
                      <Chart35 />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart36" ? (
                    <div className="chartOrTableType2 Chart36">
                      <Chart36 />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="p-2 preview-chart-box">
                  {PreviewChartSelect === "Chart1" ? (
                    <div className="chartOrTableType2 Chart1">
                      <Chart1
                         subvalue={metricsValue}
                                subCategoryValue={subCategoryValue}
                                categoryValue={categoryValue} 
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        DataLabels={DataLabels}
                        LegendTextColor={LegendTextColor}
                        series={
                          containers[modalCData]?.boxes[modalBData]?.dataSeries
                        }
                        labels={
                          containers[modalCData]?.boxes[modalBData]?.dataLabel
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart2" ? (
                    <div className="chartOrTableType2 Chart2">
                      <Chart2
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        DataLabels={DataLabels}
                        LegendTextColor={LegendTextColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart3" ? (
                    <div className="chartOrTableType2 Chart3">
                      <Chart3
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        DataLabels={DataLabels}
                        LegendTextColor={LegendTextColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart4" ? (
                    <div className="chartOrTableType2 Chart4">
                      <Chart4
                       subvalue={metricsValue}
                                subCategoryValue={subCategoryValue}
                                categoryValue={categoryValue} 
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        DataLabels={DataLabels}
                        LegendTextColor={LegendTextColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart5" ? (
                    <div className="chartOrTableType2 Chart5">
                      <Chart5
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        DataLabels={DataLabels}
                        LegendTextColor={LegendTextColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart6" ? (
                    <div className="chartOrTableType2 Chart6">
                      <Chart6
                       subvalue={metricsValue}
                                subCategoryValue={subCategoryValue}
                                categoryValue={categoryValue} 
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        DataLabels={DataLabels}
                        LegendTextColor={LegendTextColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart7" ? (
                    <div className="chartOrTableType2 Chart7">
                      <Chart7
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart8" ? (
                    <div className="chartOrTableType2 Chart8">
                      <Chart8
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        AverageDisplay={AverageDisplay}
                        AverageLineDisplay={AverageLineDisplay}
                        PositionAverageLR={PositionAverageLR}
                        PositionAverageTB={PositionAverageTB}
                        AverageValueTitle={AverageValueTitle}
                        AverageValueC={AverageValueC}
                        FontSizeAverage={FontSizeAverage}
                        MovingDisplay={MovingDisplay}
                        MovingValueC={MovingValueC}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        StrokeLine={StrokeLine}
                        LineTpyeSD={LineTpyeSD}
                        LineWidth={LineWidth}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart9" ? (
                    <div className="chartOrTableType2 Chart9">
                      <Chart9
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        AverageDisplay={AverageDisplay}
                        AverageLineDisplay={AverageLineDisplay}
                        PositionAverageLR={PositionAverageLR}
                        PositionAverageTB={PositionAverageTB}
                        AverageValueTitle={AverageValueTitle}
                        AverageValueC={AverageValueC}
                        FontSizeAverage={FontSizeAverage}
                        MovingDisplay={MovingDisplay}
                        MovingValueC={MovingValueC}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        StrokeLine={StrokeLine}
                        LineTpyeSD={LineTpyeSD}
                        LineWidth={LineWidth}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}

                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart10" ? (
                    <div className="chartOrTableType2 Chart10">
                      <Chart10
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart11" ? (
                    <div className="chartOrTableType2 Chart11">
                      <Chart11
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart12" ? (
                    <div className="chartOrTableType2 Chart12">
                      <Chart12
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart13" ? (
                    <div className="chartOrTableType2 Chart13">
                      <Chart13
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart14" ? (
                    <div className="chartOrTableType2 Chart14">
                      <Chart14
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart15" ? (
                    <div className="chartOrTableType2 Chart15">
                      <Chart15
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                        Stacked={Stacked}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart16" ? (
                    <div className="chartOrTableType2 Chart16">
                      <Chart16
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart17" ? (
                    <div className="chartOrTableType2 Chart17">
                      <Chart17
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart18" ? (
                    <div className="chartOrTableType2 Chart18">
                      <Chart18
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                        Stacked={Stacked}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart19" ? (
                    <div className="chartOrTableType2 Chart19">
                      <Chart19
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart20" ? (
                    <div className="chartOrTableType2 Chart20">
                      <Chart20
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart21" ? (
                    <div className="chartOrTableType2 Chart21">
                      <Chart21
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                        Stacked={Stacked}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart22" ? (
                    <div className="chartOrTableType2 Chart22">
                      <Chart22
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                        Stacked={Stacked}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart23" ? (
                    <div className="chartOrTableType2 Chart23">
                      <Chart23
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart24" ? (
                    <div className="chartOrTableType2 Chart24">
                      <Chart24
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                        Stacked={Stacked}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart25" ? (
                    <div className="chartOrTableType2 Chart25">
                      <Chart25
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart26" ? (
                    <div className="chartOrTableType2 Chart26">
                      <Chart26
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        StrokeLine={StrokeLine}
                        LineTpyeSD={LineTpyeSD}
                        LineWidth={LineWidth}
                        MovingDisplay={MovingDisplay}
                        MovingValueC={MovingValueC}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart27" ? (
                    <div className="chartOrTableType2 Chart27">
                      <Chart27
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart28" ? (
                    <div className="chartOrTableType2 Chart28">
                      <Chart28
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart29" ? (
                    <div className="chartOrTableType2 Chart29">
                      <Chart29
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart30" ? (
                    <div className="chartOrTableType2 Chart30">
                      <Chart30
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart31" ? (
                    <div className="chartOrTableType2 Chart31">
                      <Chart31
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart32" ? (
                    <div className="chartOrTableType2 Chart32">
                      <Chart32
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                        Stacked={Stacked}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart33" ? (
                    <div className="chartOrTableType2 Chart33">
                      <Chart33
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart34" ? (
                    <div className="chartOrTableType2 Chart34">
                      <Chart34
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart35" ? (
                    <div className="chartOrTableType2 Chart35">
                      <Chart35
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                        PeakValueC={PeakValueC}
                        TargetValueLineColor={TargetValueLineColor}
                        LableTextColorTarget={LableTextColorTarget}
                        FontSizeTarget={FontSizeTarget}
                        TargetValue={TargetValue}
                        LowestValueC={LowestValueC}
                        TargetValueTitle={TargetValueTitle}
                        PeakValueTitle={PeakValueTitle}
                        LowestValueTitle={LowestValueTitle}
                        Tooltip={Tooltip}
                        TargetDisplay={TargetDisplay}
                        PeakDisplay={PeakDisplay}
                        LowestDisplay={LowestDisplay}
                        LowestLineDisplay={LowestLineDisplay}
                        TargetLineDisplay={TargetLineDisplay}
                        PeakLineDisplay={PeakLineDisplay}
                        FontSizeLowest={FontSizeLowest}
                        FontSizePeak={FontSizePeak}
                        PositionLowestTB={PositionLowestTB}
                        PositionLowestLR={PositionLowestLR}
                        PositionTargetTB={PositionTargetTB}
                        PositionTargetLR={PositionTargetLR}
                        PositionPeakLR={PositionPeakLR}
                        PositionPeakTB={PositionPeakTB}
                        DataLabels={DataLabels}
                        LebalX={LebalX}
                        LebalY={LebalY}
                        LavelYColor={LavelYColor}
                        LavelXColor={LavelXColor}
                        LegendTextColor={LegendTextColor}
                        ValuePeak={ValuePeak}
                        ValueTarget={ValueTarget}
                        ValueLowest={ValueLowest}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {PreviewChartSelect === "Chart36" ? (
                    <div className="chartOrTableType2 Chart36">
                      <Chart36
                        position={Legend}
                        BackgroundColor={BackgroundColor}
                        FontSize={FontSize}
                        YAxis={YAxis}
                        XAxis={XAxis}
                        Color={Color}
                        LegendDisplay={LegendDisplay}
                        gridX={gridX}
                        gridY={gridY}
                        axisX={axisX}
                        axisY={axisY}
                        TextColor={textColor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Box>
          </div>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: 224,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: "divider",
                width: "220px !important",
              }}
            >
              <Tab label="Box Title Editor" {...a11yProps(0)} />
              <Tab label="Legend Editor" {...a11yProps(1)} />
              <Tab label="Chart Color Editor" {...a11yProps(2)} />
              <Tab label="DataLabels Display" {...a11yProps(3)} />
              {containers[modalCData]?.boxes[modalBData]?.boxChartTypeSelect !=
                "pie" && <Tab label="Label Text Editor" {...a11yProps(4)} />}
              {containers[modalCData]?.boxes[modalBData]?.boxChartTypeSelect !=
                "pie" && (
                <Tab label="Grid & Tooltip Display" {...a11yProps(5)} />
              )}
              {containers[modalCData]?.boxes[modalBData]?.boxChartTypeSelect !=
                "pie" && <Tab label="Peak Value Editor" {...a11yProps(6)} />}
              {containers[modalCData]?.boxes[modalBData]?.boxChartTypeSelect !=
                "pie" && <Tab label="Target Value Editor" {...a11yProps(7)} />}
              {containers[modalCData]?.boxes[modalBData]?.boxChartTypeSelect !=
                "pie" && <Tab label="Lowest Value Editor" {...a11yProps(8)} />}
              {containers[modalCData]?.boxes[modalBData]?.boxChartTypeSelect !=
                "pie" && <Tab label="Average Value Editor" {...a11yProps(9)} />}
            </Tabs>

            <TabPanel value={value} index={0} style={{ width: "100%" }}>
              <p className="tw-text-xl tw-font-medium tw-leading-6">
                Chart Box Editor
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-flex mt-2 tw-py-1.5 tw-gap-x-10">
                  <div className="tw-flex px-2 tw-items-center mt-1">
                    <p className="tw-mr-3">Box Title : </p>
                    <input
                      type="text"
                      name="LowestValue"
                      value={boxTitle || ""}
                      onChange={(e) => boxTitleFnc(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap tw-px-2 tw-items-center">
                    <p className="mr-3">Box Title Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={boxTitleColor || "#f09869"}
                      onChange={(e) => boxTitleColorFnc(e.target.value)}
                      className="tw-shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-3">Box Title Background Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={BoxTitleColorBG || "#aee8de"}
                      onChange={(e) => boxTitleColorBGFnc(e.target.value)}
                      className="tw-shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: "100%" }}>
              <p className="tw-text-xl tw-font-medium tw-leading-6">
                Chart Legend Editor
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-mt-2 tw-py-3">
                  <div class="containers">
                    <label>
                      <span>Legend Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio"
                        value={LegendDisplay || ""}
                        onChange={() => handleLegendDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio"
                        value={LegendDisplay || ""}
                        onChange={() => handleLegendDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div class="containers">
                    <label>
                      <span>Legend Position : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={Legend || ""}
                        onChange={() => handleLegend("top")}
                      />
                      <span>Top</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={Legend || ""}
                        onChange={() => handleLegend("bottom")}
                      />
                      <span>Bottom</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={Legend || ""}
                        onChange={() => handleLegend("left")}
                      />
                      <span>Left</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={Legend || ""}
                        onChange={() => handleLegend("right")}
                      />
                      <span>Right</span>
                    </label>
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-2">Legend Text Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={LegendTextColor || "#edd8ab"}
                      onChange={(e) => handleLegendTextColor(e.target.value)}
                      className="tw-shadow-sm  sm:text-sm sm:leading-6 mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ width: "100%" }}>
              <p className="tw-text-xl tw-font-medium tw-leading-6">
                Chart Background Color Editor
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full mt-2 py-3">
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-2">Chart Background Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={BackgroundColor || "#edd8ab"}
                      onChange={(e) => handleBackgroundColor(e.target.value)}
                      className="shadow-sm  sm:text-sm sm:leading-6 mt-1"
                    />
                  </div>
                  <div className="tw-flex tw-items-center">
                    <p className="px-2">
                      Label Background Color{" "}
                      {containers[modalCData]?.boxes[modalBData]?.Color?.length}
                      :
                    </p>
                    {containers[modalCData]?.boxes[modalBData]?.Color?.map(
                      (c, ci) => (
                        <>
                          <div className="tw-flex tw-flex-wrap" key={ci}>
                            <input
                              type="color"
                              name="Color"
                              defaultValue={c}
                              onChange={(e) => handleColor(e.target.value, ci)}
                              className="tw-shadow-sm  sm:text-sm sm:leading-6 mt-1"
                            />
                          </div>
                        </>
                      )
                    )}
                  </div>
                  {containers[modalCData]?.boxes[modalBData]
                    ?.boxChartTypeSelect != "pie" && (
                    <div className="tw-flex tw-flex-wrap tw-items-center">
                      <div className="tw-w-[50%] tw-flex tw-flex-wrap px-2 tw-items-center">
                        <p className="tw-mr-2">Chart Label X-axis Color : </p>
                        <input
                          type="color"
                          name="Color"
                          value={LavelXColor || "#EEAfc8"}
                          onChange={(e) => handleLavelXColor(e.target.value)}
                          className="tw-shadow-sm  sm:tw-text-sm sm:tw-leading-6 mt-1"
                        />
                      </div>
                      <div className="tw-w-[50%] tw-flex tw-flex-wrap px-2 tw-items-center">
                        <p className="mr-2">Chart Label Y-axis Color : </p>
                        <input
                          type="color"
                          name="Color"
                          value={LavelYColor || "#AFE7EE"}
                          onChange={(e) => handleLavelYColor(e.target.value)}
                          className="tw-shadow-sm  sm:text-sm sm:leading-6 mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={3} style={{ width: "100%" }}>
              <p className="tw-text-xl tw-font-medium leading-6">
                Chart DataLabels Display &nbsp;
                {containers[modalCData]?.boxes[modalBData]
                  ?.boxChartTypeSelect != "pie" && (
                  <>& X-axis and Y-axis Label Display Editor</>
                )}
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full mt-2 tw-py-1.5">
                  <div class="containers">
                    <label>
                      <span>DataLabels Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={DataLabels || "min"}
                        onChange={() => handleDataLabels("min")}
                      />
                      <span>Minimum</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={DataLabels || "max"}
                        onChange={() => handleDataLabels("max")}
                      />
                      <span>Maximum</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={DataLabels || "both"}
                        onChange={() => handleDataLabels("both")}
                      />
                      <span>Both</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="radio1"
                        value={DataLabels || "all"}
                        onChange={() => handleDataLabels("all")}
                      />
                      <span>All</span>
                    </label>
                  </div>
                </div>
                {containers[modalCData]?.boxes[modalBData]
                  ?.boxChartTypeSelect != "pie" && (
                  <div className="tw-flex tw-w-full tw-mt-2 tw-py-1.5">
                    <div class="containers tw-w-[50%]">
                      <label>
                        <span>X-axis Label Diaplay : </span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Label-d-x"
                          value={LebalX || true}
                          onChange={(e) => handleXLebalDisplay(true)}
                        />
                        <span>Show</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Label-d-x"
                          value={LebalX || false}
                          onChange={(e) => handleXLebalDisplay(false)}
                        />
                        <span>Hide</span>
                      </label>
                    </div>
                    <div class="containers tw-w-[50%]">
                      <label>
                        <span>Y-axis Label Diaplay : </span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Label-d-y"
                          value={LebalY || true}
                          onChange={(e) => handleYLebalisplay(true)}
                        />
                        <span>Show</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Label-d-y"
                          value={LebalY || false}
                          onChange={(e) => handleYLebalisplay(false)}
                        />
                        <span>Hide</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value={value} index={4} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">
                Chart X-axis & Y-axis Editor
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full mt-2 py-3">
                  <div className="tw-flex">
                    <div class="containers tw-w-[50%]">
                      <label>
                        <span>Display X-axis Label : </span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="axis-d-x"
                          value={axisX || true}
                          onChange={(e) => handleXAxisDisplay(true)}
                        />
                        <span>Show</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="axis-d-x"
                          value={axisX || false}
                          onChange={(e) => handleXAxisDisplay(false)}
                        />
                        <span>Hide</span>
                      </label>
                    </div>
                    <div class="containers tw-w-[50%]">
                      <label>
                        <span>Display Y-axis Label : </span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="axis-d-y"
                          value={axisY || true}
                          onChange={(e) => handleYAxisDisplay(true)}
                        />
                        <span>Show</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="axis-d-y"
                          value={axisY || false}
                          onChange={(e) => handleYAxisDisplay(false)}
                        />
                        <span>Hide</span>
                      </label>
                    </div>
                  </div>
                  <div className="tw-w-full tw-flex inputTag tw-flex-wrap">
                    <div className="tw-w-[50%] px-2">
                      <label class="input">
                        <input
                          class="input__field"
                          type="text"
                          value={XAxis || ""}
                          // disabled={!axisX}
                          onChange={(e) => handleXAxis(e.target.value)}
                        />
                        <span class="input__label">X-axis Text</span>
                      </label>
                    </div>
                    <div className="tw-w-[50%] px-2">
                      <label class="input">
                        <input
                          class="input__field"
                          type="text"
                          value={YAxis || ""}
                          // disabled={!axisY}
                          onChange={(e) => handleYAxis(e.target.value)}
                        />
                        <span class="input__label">Y-axis Text</span>
                      </label>
                    </div>
                    <div className="tw-w-[50%]  mt-2">
                      <div className="tw-flex px-2 tw-items-center">
                        <p className="tw-mr-3">Font Size (px): </p>
                        <input
                          type="text"
                          name="Color"
                          value={FontSize || ""}
                          onChange={(e) => handleFontSize(e.target.value)}
                          className="c_input-text"
                        />
                      </div>
                    </div>
                    <div className="w-[50%] mt-1">
                      <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                        <p className="mr-3">Text Color: </p>
                        <input
                          type="color"
                          name="Color"
                          defaultValue="#edabab"
                          value={textColor || "#edabab"}
                          onChange={(e) =>
                            handleLableTextColor(e.target.value, 4)
                          }
                          className="tw-shadow-sm  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={5} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">
                Chart Grid & Tooltip Display Editor
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Grid Display X-axis : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grid-d-x"
                        value={gridX || true}
                        onChange={(e) => handleXGridDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grid-d-x"
                        value={gridX || false}
                        onChange={(e) => handleXGridDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Grid Display Y-axis : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grid-d-y"
                        value={gridY || true}
                        onChange={(e) => handleYGridDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="grid-d-y"
                        value={gridY || false}
                        onChange={(e) => handleYGridDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
                <div className="tw-w-full tw-mt-2 tw-py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Chart Tooltip Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Tooltip"
                        value={Tooltip || true}
                        onChange={(e) => handleXTooltipDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Tooltip"
                        value={Tooltip || false}
                        onChange={(e) => handleXTooltipDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={6} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">Chart Peak Value</p>
              <div className="preview-content-box">
                <div className="tw-flex tw-w-full tw-mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Peak Value Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="PeakLine-x"
                        value={PeakDisplay || true}
                        onChange={(e) => handlePeakDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="PeakLine-x"
                        value={PeakDisplay || false}
                        onChange={(e) => handlePeakDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Peak Value Line Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="PeakLineDisplay-x"
                        value={PeakLineDisplay || true}
                        onChange={(e) => handlePeakLineDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="PeakLineDisplay-x"
                        value={PeakLineDisplay || false}
                        onChange={(e) => handlePeakLineDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Top to Bottom ({PositionPeakTB} px) :{" "}
                    </p>
                    <input
                      type="range"
                      min="-200"
                      max="100"
                      name="Color"
                      value={PositionPeakTB || 0}
                      onChange={(e) => handlePositionPeakTB(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Left to Right ({PositionPeakLR} px) :{" "}
                    </p>
                    <input
                      type="range"
                      min="-200"
                      max="100"
                      value={PositionPeakLR || 0}
                      name="Color"
                      onChange={(e) => handlePositionPeakLR(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                </div>
                <div className="w-[100%] flex gap-x-14 mt-2 py-1.5">
                  <div className=" tw-flex tw-flex-wrap px-2 tw-items-center mt-1">
                    <p className="mr-3">Peak Value Title : </p>
                    <input
                      type="text"
                      name="PeakValue"
                      value={PeakValueTitle || ""}
                      onChange={(e) => handlePeakValueTitle(e.target.value)}
                      className="c_input-text-title"
                    />
                  </div>
                  <div className=" tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-3">Peak Value Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={PeakValueC || "#e2abed"}
                      onChange={(e) => handlePeakValueColor(e.target.value)}
                      className="shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1   ">
                    <p className="mr-3">Font Size (px) : </p>
                    <input
                      type="text"
                      name="Color"
                      value={FontSizePeak || ""}
                      onChange={(e) => handleFontSizePeak(e.target.value)}
                      className="c_input"
                    />
                  </div>
                </div>
                <div className="tw-w-full mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Peak Average Value : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ValuePeak-x"
                        value={ValuePeak || true}
                        onChange={(e) => handleValuePeak(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ValuePeak-x"
                        value={ValuePeak || false}
                        onChange={(e) => handleValuePeak(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={7} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">
                Chart Target Value
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Target Value Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="TargetLine-x"
                        value={TargetDisplay || true}
                        onChange={(e) => handleXTargetDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="TargetLine-x"
                        value={TargetDisplay || false}
                        onChange={(e) => handleXTargetDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Target Value Line Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="TargetLineDisplay-x"
                        value={TargetLineDisplay || true}
                        onChange={(e) => handleTargetLineDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="TargetLineDisplay-x"
                        value={TargetLineDisplay || false}
                        onChange={(e) => handleTargetLineDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
                <div className="w-[100%] tw-flex tw-flex-wrap mt-2 py-1.5">
                  <div className="w-[50%] tw-flex tw-flex-wrap px-2 tw-items-center mt-1">
                    <p className="mr-3">Target Value : </p>
                    <input
                      type="number"
                      name="TargetValue"
                      value={TargetValue || ""}
                      onChange={(e) => handleTargetValue(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                  <div className=" mt-1">
                    <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                      <p className="mr-3">Target Value Line Color : </p>
                      <input
                        type="color"
                        name="Color"
                        value={TargetValueLineColor || "#edabc7"}
                        onChange={(e) =>
                          handleTargetValueLineColor(e.target.value)
                        }
                        className="shadow-sm sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Top to Bottom ({PositionTargetTB} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      min="-200"
                      max="100"
                      value={PositionTargetTB || 0}
                      onChange={(e) => handlePositionTargetTB(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Left to Right ({PositionTargetLR} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      min="-200"
                      value={PositionTargetLR || 0}
                      max="100"
                      onChange={(e) => handlePositionTargetLR(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                </div>
                <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-2 py-1.5 gap-x-8">
                  <div className="flex items-center">
                    <p className="mr-3">Target Value Title : </p>
                    <input
                      type="text"
                      name="TargetValue"
                      value={TargetValueTitle || ""}
                      onChange={(e) => handleTargetValueTitle(e.target.value)}
                      className="c_input-text-title md:ml-1"
                    />
                  </div>
                  <div className="flex px-2 tw-items-center">
                    <p className="mr-3">Font Size (px) : </p>
                    <input
                      type="text"
                      name="Color"
                      value={FontSizeTarget || ""}
                      onChange={(e) => handleFontSizeTarget(e.target.value)}
                      className="c_input"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-3">Text Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={LableTextColorTarget || "#edabab"}
                      onChange={(e) =>
                        handleLableTextColorTarget(e.target.value)
                      }
                      className="shadow-sm  sm:text-sm sm:leading-6 mt-1"
                    />
                  </div>
                </div>
                <div className="tw-w-full mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Target Average Value : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ValueTarget-x"
                        value={ValueTarget || true}
                        onChange={(e) => handleValueTarget(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ValueTarget-x"
                        value={ValueTarget || false}
                        onChange={(e) => handleValueTarget(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={8} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">
                Chart Lowest Value
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Lowest Value Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="LowestLine-x"
                        value={LowestDisplay || true}
                        onChange={(e) => handleLowestDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="LowestLine-x"
                        value={LowestDisplay || false}
                        onChange={(e) => handleLowestDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Lowest Value Line Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="LowestLineDisplay-x"
                        value={LowestLineDisplay || true}
                        onChange={(e) => handleLowestLineDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="LowestLineDisplay-x"
                        value={LowestLineDisplay || false}
                        onChange={(e) => handleLowestLineDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Top to Bottom ({PositionLowestTB} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      min="-200"
                      value={PositionLowestTB || 0}
                      max="100"
                      onChange={(e) => handlePositionLowestTB(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Left to Right ({PositionLowestTB} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      min="-200"
                      value={PositionLowestTB || 0}
                      max="100"
                      onChange={(e) => handlePositionLowestLR(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                </div>
                <div className="tw-w-full tw-flex mt-2 py-1.5 gap-x-10">
                  <div className="flex px-2 tw-items-center mt-1">
                    <p className="mr-3">Lowest Value Title : </p>
                    <input
                      type="text"
                      name="LowestValue"
                      value={LowestValueTitle || ""}
                      onChange={(e) => handleLowestValueTitle(e.target.value)}
                      className="c_input-text-title"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-3">Lowest Value Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={LowestValueC || "#f09869"}
                      onChange={(e) => handleLowestValueC(e.target.value)}
                      className="shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1   ">
                    <p className="mr-3">Font Size (px) : </p>
                    <input
                      type="text"
                      name="Color"
                      value={FontSizeLowest || ""}
                      onChange={(e) => handleFontSizeLowest(e.target.value)}
                      className="c_input"
                    />
                  </div>
                </div>
                <div className="tw-w-full mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Lowest Average Value : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ValueLowest-x"
                        value={ValueLowest || true}
                        onChange={(e) => handleValueLowest(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="ValueLowest-x"
                        value={ValueLowest || false}
                        onChange={(e) => handleValueLowest(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={9} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">
                Chart Average Value
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Average Value Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="AverageLine-x"
                        value={AverageDisplay || true}
                        onChange={(e) => handleAverageDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="AverageLine-x"
                        value={AverageDisplay || false}
                        onChange={(e) => handleAverageDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Average Value Line Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="AverageLineDisplay-x"
                        value={AverageLineDisplay || true}
                        onChange={(e) => handleAverageLineDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="AverageLineDisplay-x"
                        value={AverageLineDisplay || false}
                        onChange={(e) => handleAverageLineDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                </div>
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Top to Bottom ({PositionAverageTB} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      min="-200"
                      value={PositionAverageTB || 0}
                      max="100"
                      onChange={(e) => handlePositionAverageTB(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1 tw-w-[50%]">
                    <p className="mr-3">
                      Position Left to Right ({PositionAverageLR} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      min="-200"
                      value={PositionAverageLR || 0}
                      max="100"
                      onChange={(e) => handlePositionAverageLR(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                </div>
                <div className="tw-w-full tw-flex mt-2 py-1.5 gap-x-10">
                  <div className="flex px-2 tw-items-center mt-1">
                    <p className="mr-3">Average Value Title : </p>
                    <input
                      type="text"
                      name="AverageValue"
                      value={AverageValueTitle || ""}
                      onChange={(e) => handleAverageValueTitle(e.target.value)}
                      className="c_input-text-title"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center">
                    <p className="mr-3">Average Value Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={AverageValueC || "#f09869"}
                      onChange={(e) => handleAverageValueC(e.target.value)}
                      className="shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center mt-1   ">
                    <p className="mr-3">Font Size (px) : </p>
                    <input
                      type="text"
                      name="Color"
                      value={FontSizeAverage || ""}
                      onChange={(e) => handleFontSizeAverage(e.target.value)}
                      className="c_input"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xl font-medium leading-6 mt-3">
                Chart Moving Line Value
              </p>
              <div className="preview-content-box">
                <div className="tw-w-full tw-flex mt-2 py-1.5">
                  <div class="containers tw-w-[50%]">
                    <label>
                      <span>Moving Line Value Display : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="MovingLine-x"
                        value={MovingDisplay || true}
                        onChange={(e) => handleMovingDisplay(true)}
                      />
                      <span>Show</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="MovingLine-x"
                        value={MovingDisplay || false}
                        onChange={(e) => handleMovingDisplay(false)}
                      />
                      <span>Hide</span>
                    </label>
                  </div>
                  <div className="w-[50%] flex items-center">
                    <p className="mr-3">Moving Line Color : </p>
                    <input
                      type="color"
                      name="Color"
                      value={MovingValueC || "#f09869"}
                      onChange={(e) => handleMovingValueC(e.target.value)}
                      className="shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={10} style={{ width: "100%" }}>
              <p className="text-xl font-medium leading-6">Line Chart Editor</p>
              <div className="preview-content-box">
                <div className="flex w-full mt-2 py-3">
                  <div class="containers w-[40%]">
                    <label>
                      <span>Line Stroke Type : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="stroke1"
                        value={StrokeLine || "smooth"}
                        onChange={() => handleStrokeLine("smooth")}
                      />
                      <span>Smooth Line</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="stroke1"
                        value={StrokeLine || "straight"}
                        onChange={() => handleStrokeLine("straight")}
                      />
                      <span>Straight Line</span>
                    </label>
                  </div>
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center w-[60%]">
                    <p className="mr-3">
                      Line Type [Solid or Dashed] ({LineTpyeSD} px) :{" "}
                    </p>
                    <input
                      type="range"
                      name="Color"
                      max="100"
                      value={LineTpyeSD || 0}
                      onChange={(e) => handleLineTpyeSD(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                </div>
                <div className="flex w-full mt-2 py-3">
                  <div className="tw-flex tw-flex-wrap px-2 tw-items-center w-[60%]">
                    <p className="mr-3">Line Size ({LineWidth} %) : </p>
                    <input
                      type="range"
                      name="Color"
                      value={LineWidth || 0}
                      max="100"
                      onChange={(e) => handleLineWidth(e.target.value)}
                      className="c_input-text"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xl mt-2 font-medium leading-6">
                Bar Chart Editor
              </p>
              <div className="preview-content-box">
                <div className="flex w-full mt-2 py-3">
                  <div class="containers w-[40%]">
                    <label>
                      <span>Bar Chart Type : </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="stacked1"
                        value={Stacked || true}
                        onChange={() => handleStacked(true)}
                      />
                      <span>Stacked</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="stacked1"
                        value={Stacked || false}
                        onChange={() => handleStacked(false)}
                      />
                      <span>Non Stacked</span>
                    </label>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Box>

          <div className="mt-3 tw-justify-end tw-flex tw-gap-x-4">
            <Button
              onClick={() => setOpen2(false)}
              variant="outlined"
              color="error"
            >
              Close
            </Button>
            <Button onClick={handleEditChart} variant="outlined" color="info">
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default EditTemplateSingle;
