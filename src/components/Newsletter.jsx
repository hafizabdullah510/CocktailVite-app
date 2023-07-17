import React from "react";

const Newsletter = () => {
  return (
    <div className="section-center">
      <form className="form">
        <h4>our newsletter</h4>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-input" id="name" name="name" />
        </div>
        <div className="form-row">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-input"
            id="lastName"
            name="lastName"
          />
        </div>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input type="email" className="form-input" id="email" name="email" />
        </div>
        <button className="btn btn-block newsletter-btn">submit</button>
      </form>
    </div>
  );
};

export default Newsletter;
