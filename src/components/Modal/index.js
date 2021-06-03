import React from "react";
import "./style.css";

export default function Modal() {
  return (
    <div id="modal-root">
      <div className="background" />
      <div id="modal">
        <div id="modal-title">Modal Title</div>
        <div id="divisor" />
        <div id="modal-body">
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum
        </div>
      </div>
    </div>
  );
}
