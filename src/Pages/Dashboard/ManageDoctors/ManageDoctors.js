import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfiramtionModal/ConfirmationModal";

const ManageDoctors = () => {
  const url = `http://localhost:5000/doctors`;
  const { data: doctors = [], refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };
  const handleDelete = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
        .then((data) => {
          console.log(data);
        if (data.deletedCount > 0) {
            refetch();
            toast.success("Delete successfully");
        }
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Manage Doctors</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <img
                    src={doctor.image}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  ></img>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    htmlFor="confirmation-modal"
                    className="btn  bg-red-500"
                    onClick={() => setDeletingDoctor(doctor)}
                  >
                    delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={"Are you sure you want to delete ?"}
          message={`If you delete ${deletingDoctor.name} . You cant't recover his data anymore`}
          closeModal={closeModal}
          successAction={handleDelete}
          data={deletingDoctor}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
