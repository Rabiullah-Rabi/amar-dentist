import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch(` https://doctors-portal-server-ivory.vercel.app/appointmentSpecialty`);
      const data = await res.json();
      return data;
    },
  });
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading></Loading>;
  }
  const imgbbKey = process.env.REACT_APP_imgbbKey;
  const handleAddDoctor = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgbbKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          };
          console.log(data);
          // save doctors imformation to database
          fetch(` https://doctors-portal-server-ivory.vercel.app/doctors`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearar ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("Doctor added");
              navigate("/dashboard/manageDoctors");
            });
        }
      });
  };
  return (
    <div className="h-[800px]">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Add a Doctor</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Specialty</span>
            </label>
            <select name="specialty" className="select select-bordered w-full">
              {specialties.map((specialty, i) => (
                <option
                  value={specialty.name}
                  key={i}
                  {...register("specialty", {
                    required: true,
                  })}
                >
                  {specialty.name}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500">{errors.service.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("img", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Add Doctor"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
