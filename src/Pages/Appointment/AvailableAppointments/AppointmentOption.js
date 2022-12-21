import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, slots, price } = appointmentOption;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="card shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-2xl text-secondary font-bold text-center">
          {name}
        </h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <h2 className="text-2xl text-secondary font-bold text-center">
          Price : ${price}
        </h2>

        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            htmlFor="booking-modal"
            className="btn btn-primary text-white"
            onClick={() => {
              if (!user) {
                return navigate("/login");
              }
              setTreatment(appointmentOption);
            }}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
