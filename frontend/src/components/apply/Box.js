import React from "react";
import "./Box.scss";
import AmazonLogo from "../../assets/images/amazon.png";
import Bookmark from "../../assets/icons/bookmark.svg";

export default function Box() {
  return (
    <div className="box">
      <div className="box__content">
        <div className="box__header">
          <img src={AmazonLogo} alt="Amazon logo" className="box__logo" />
          <img src={Bookmark} alt="Bookmark" className="box__bookmark" />
        </div>
        <div className="box__body">
          <h3 className="box__company">Amazon</h3>
          <p className="box__description">
            Design a modern, minimalist logo for Amazon Payment.
          </p>
          <p className="box__date">18 May, 2023</p>
        </div>
      </div>
      <div className="box__footer">
        <p className="box__reward">$15,000</p>
        <button className="box__apply-button">Apply</button>
      </div>
    </div>
  );
}
