import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src="https://i.ibb.co/G7RWhSY/99436-404-page.gif" alt="" />
      <Link to="/">
        <PrimaryButton>Back To Home</PrimaryButton>
      </Link>
    </div>
  );
};

export default ErrorPage;
