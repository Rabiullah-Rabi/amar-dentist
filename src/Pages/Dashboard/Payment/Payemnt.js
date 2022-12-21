import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_stripeKey);
const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();
  const { appointmentDate, treatment, patient, slot, price } = booking;
  // if (navigation.state === "loading") {
  //   return <Loading></Loading>;
  // }
  return (
    <div>
      <div>
        <h2 className="text-xl">Payment For: {treatment}</h2>
        <h2 className="text-xl">
          Appointment Date: {appointmentDate} at <span>{slot}</span>
        </h2>
        <h2 className="text-xl">Patient Name : {patient}</h2>
        <h2 className="text-xl">Price : $ {price}</h2>
      </div>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
