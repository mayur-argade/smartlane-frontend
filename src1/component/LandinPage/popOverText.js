import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PopOverText = (props) => {
  const [message, setMessage] = useState({
    name: "",
    message: "",
    time: "",
  });

  useEffect(() => {
    if (props.message) {
      setMessage(props.message);
    }
  }, [props.message]);

  return (
    <div
      style={{
        background: "rgba(64, 64, 64, 0.85)",
        fontSize: "10px",
        color: "white",
        padding: "5px",
      }}
      onClick={() => {
        props.callback(true);
      }}
      onMouseLeave={() => {
        props.callback(false);
      }}
    >
   <div
          style={{
            display: "flex",
            color: "white",
            paddingTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontWeight: "600" }}>{message.name} </div>
              <div style={{ color: "darkgrey" }}>{message.time} </div>
            </div>
            <div>{message.message}</div>
            <div style={{ color: "darkgrey" }}>9 Replies </div>
          </div>
        </div>
      </div>
  
  );
};

PopOverText.propTypes = {
  message: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string,
  }),
  callback: PropTypes.func.isRequired,
};

export default PopOverText;
