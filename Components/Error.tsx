// ErrorScreen.js
import React from "react";
import errorStyles from "../styles/Error.module.css";

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className={errorStyles.errorContainer}>
      <h1 className={errorStyles.errorHeading}>Oops, something went wrong!</h1>
      <p className={errorStyles.errorMessage}>
        We apologize for the inconvenience. Please try again later.
        <div>{errorMessage}</div>
      </p>
    </div>
  );
};

export default Error;
