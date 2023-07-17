import React from "react";
import { Link, useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <div className="section-center">
        <h1>No Page Found</h1>
      </div>
    );
  }
  return (
    <div className="section-center">
      <h1>Something went wrong...</h1>
    </div>
  );
};

export default Error;
