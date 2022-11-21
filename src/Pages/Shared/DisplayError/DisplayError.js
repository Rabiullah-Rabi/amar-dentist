import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  const error = useRouteError();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/login')
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1 className="text-2xl ">Something is wrong</h1>
      <h1 className="text-2xl ">{error.statusText || error.message}</h1>
      <button onClick={handleLogOut}>Sign out</button>
    </div>
  );
};

export default DisplayError;
