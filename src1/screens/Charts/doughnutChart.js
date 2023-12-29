// DoughnutChart.js
import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from "recharts";
// import { Villa } from "@mui/icons-material";
import { BsFillBuildingsFill } from "react-icons/bs";
// import Send_Schedule from "../../assets/img/mb-togel.svg";
import Test from "../../images/arrowdow.png";
import millify from "millify";

const COLORS = ["#000", "#F9D75D"];

// const data12 = [
//   { name: "Data 1", value: 90, icon: Send_Schedule },
//   { name: "Data 2", value: 30, icon: Send_Schedule },
// ];

const DoughnutChart = ({ data, size, label }) => {
  return (
    <ResponsiveContainer width="100%" height={size}>
      <PieChart>
        <Pie
          data={data?.data}
          dataKey="value"
          cx="50%"
          cy="45%"
          innerRadius="80%"
          outerRadius="90%"
          startAngle={90}
          endAngle={450}
          cornerRadius={20}
        >
          {data?.data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}

          {!label && (
            <Label
              content={<CustomCenterLabel value="Center" data={data && data} />}
            />
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;

const CustomCenterLabel = ({ viewBox, data }) => {
  const { cx, cy } = viewBox;
  const iconSize = 40;
  const Value = millify(data?.Property_value, {
    precision: 1,
    uppercase: true,
  });
  const newvalue = Value?.replace("M", " M");

  return (
    <g>
      <text
        x={cx}
        y={cy + iconSize / 2 - 80}
        textAnchor="middle"
        fill="#fff"
        fontSize="25px"
      >
        {data?.length}
        <BsFillBuildingsFill />
      </text>
      {/* <Villa fontSize="small" sx={{ fontSize: "5px", height: "10px" }} /> */}
      <img src={Test} alt="" height="10px" width="20px" />
      <text
        x={cx}
        y={cy + iconSize / 2 - 40}
        textAnchor="middle"
        fill="#fff"
        fontSize="15px"
      >
        Portfolio Value
      </text>

      <text
        x={cx}
        y={cy + iconSize / 2 + 5}
        textAnchor="middle"
        fill="#fff"
        fontSize="40px"
        fontWeight="bold"
      >
        £{newvalue}
      </text>
      <text
        x={cx}
        y={cy + iconSize / 2 + 40}
        textAnchor="middle"
        fill="#F9D75D"
        fontSize="18px"
      >
        ROI {data && data?.Roi.toFixed(1)}%
      </text>
    </g>
  );
};
CustomCenterLabel.propTypes = {
  viewBox: PropTypes.any,
  x: PropTypes.any,
  data: PropTypes.any,
  y: PropTypes.any,
  value: PropTypes.any,
};
DoughnutChart.propTypes = {
  data: PropTypes.any,
  size: PropTypes.any,
  label: PropTypes.any,
};
