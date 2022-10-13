import React from "react";
import "./LabeledText.css";

const LabeledText = (props) => {
  return (
    <div
      className={props.m_4 ? "labeledTextWrapper_m_4" : "labeledTextWrapper"}
    >
      <div className={props.card ? "labelWrap_card" : "labelWrap"}>
        <label
          htmlFor={props.label.toLowerCase().split(" ").join("_")}
          className={props.disabled_y ? "label_disabled" : "label"}
        >
          {props.label}
        </label>
      </div>
      <p className={props.card ? "labeledText_card" : "labeledText"}>
        {props.dot_icon && <i className="material-icons dot_icon">circle</i>}
        <span>{props.text}</span>
      </p>
    </div>
  );
};

export default LabeledText;
