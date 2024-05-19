import React from "react";
import "./Box.scss";
import Bookmark from "../../assets/icons/bookmark.svg";

export default function Box({ logo, company, description, date, reward }) {
  return (
    <div className="box">
      <div className="box__content">
        <div className="box__header">
          <img src={logo} alt={`${company} logo`} className="box__logo" />
          <img src={Bookmark} alt="Bookmark" className="box__bookmark" />
        </div>
        <div className="box__body">
          <h3 className="box__company">{company}</h3>
          <p className="box__description">{description}</p>
          <p className="box__date">{date}</p>
        </div>
      </div>
      <div className="box__footer">
        <p className="box__reward">{reward}</p>
        <button className="box__apply-button">Apply</button>
      </div>
    </div>
  );
}
