import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../appointmentsbox/seeAppointment.css";
function SeeAppointment() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/reserve/getAll")
      .then((result) => setReservations(result.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you want to cancel this booking?")) {
      axios
        .delete(`http://localhost:5000/reserve/delete/${id}`)
        .then((res) => {
          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation._id !== id)
          );
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleConfirm = (id) => {
    if (window.confirm("Do you want to confirm this booking?")) {
      axios
        .put(`http://localhost:5000/reserve/confirm/${id}`)
        .then(() => {
          navigate("/home/confirm");
          setReservations((prevReservations) =>
            prevReservations.map((reservation) => {
              if (reservation._id === id) {
                return { ...reservation, isConfirmed: true };
              }
              return reservation;
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const formatDateTime = (isoDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(isoDate).toLocaleString(undefined, options);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const includesSearchTerm = Object.values(reservation).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesLocation =
      selectedLocation === "All" || reservation.location === selectedLocation;

    const matchesDateFilter =
      selectedDateFilter === "All" ||
      formatDateTime(reservation.startDate).includes(selectedDateFilter);

    const isNotConfirmed = !reservation.isConfirmed;

    return (
      includesSearchTerm &&
      matchesLocation &&
      matchesDateFilter &&
      isNotConfirmed
    );
  });

  const locationOptions = ["All", "Alaminos", "AnotherLocation"];
  const monthOptions = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="table-responsive">
      <h1 className="see-title">Pending Reservations</h1>

      <div className="see-title">
        <input
          type="text"
          size={50}
          className="see-search"
          placeholder="Search by name, email, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="see-location"
        >
          {locationOptions.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
          className="see-date"
        >
          {monthOptions.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <table className="see-types">
        <thead>
          <tr>
            <th>ID</th>
            <th>Package Name</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Number of Person</th>
            <th>Price</th>
            <th>Is Confirmed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length === 0 ? (
            <tr>
              <td colSpan="14">No matching reservations found</td>
            </tr>
          ) : (
            filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation._id}</td>
                <td>{reservation.packageName}</td>
                <td>{reservation.location}</td>
                <td>{formatDateTime(reservation.startDate)}</td>
                <td>{formatDateTime(reservation.endDate)}</td>
                <td>{reservation.firstName}</td>
                <td>{reservation.lastName}</td>
                <td>{reservation.phoneNumber}</td>
                <td>{reservation.numberOfPerson}</td>
                <td>{reservation.price}</td>
                <td>{reservation.isConfirmed ? "Yes" : "No"}</td>
                <td>
                  <button
                    variant="primary"
                    onClick={() => handleConfirm(reservation._id)}
                  >
                    Confirm
                  </button>
                  <button onClick={() => handleDelete(reservation._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SeeAppointment;
