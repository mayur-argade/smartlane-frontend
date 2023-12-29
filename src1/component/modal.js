import React from "react";
import PropTypes from "prop-types";

const Modal = ({ classType, onChange }) => {
  return (
    <div
      className="modal fade show d-block"
      id="model_value"
      role="dialog"
      aria-labelledby="model_valueTitle"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered mt-5" role="document">
        <div className="modal-content">
          <div className={`modal-body model_caret ${modalClass[classType]}`}>
            <p>{modalText && modalText[classType]}</p>
            <div className="tour_btn d-flex">
              {!classType == 0 && (
                <button
                  className="purpel_btn"
                  onClick={() => {
                    onChange(classType - 1);
                  }}
                >
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  onChange(classType + 1);
                }}
              >
                {classType == ""
                  ? "Take a quick tour"
                  : classType == 4
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  classType: PropTypes.number,
  onChange: PropTypes.any,
};

export default Modal;

const modalClass = [
  "",
  "model_val",
  "model_deb",
  "model_addProp",
  "model_share",
];
const modalText = [
  "Welcome to your dashboard!This is where smartlane shows you the latest on your portfolio.",
  "See how the overall value of your portfolio rises and falls with real-time updates.",
  "View your debt/equity ratio and monthly net income across your portfolio.",
  "Add a new property by clicking this button.",
  "Send your portfolio schedule to your broker as a Microsoft Excel file.",
];
