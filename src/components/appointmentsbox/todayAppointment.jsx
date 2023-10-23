import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../appointmentsbox/todayAppointment.css";

function TodayAppointment() {
  const [reservations, setReservations] = useState([]);
  const today = new Date().toDateString();
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [notConfirmedCount, setNotConfirmedCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/reserve/getAll")
      .then((result) => {
        const todayReservations = result.data.filter((reservation) => {
          const isConfirmed = reservation.isConfirmed;
          const appointmentDate = new Date(
            reservation.startDate
          ).toDateString();
          return isConfirmed && appointmentDate === today;
        });

        setReservations(todayReservations);
        setConfirmedCount(todayReservations.length);
        setNotConfirmedCount(result.data.length - todayReservations.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

  return (
    <div className="table-responsive">
      <h1 className="today-title">Today Reservation</h1>

      <div className="today-p">
        <p id="today-paragraph-1">
          Total Confirmed Reservations: {confirmedCount}
        </p>
        <p id="today-paragraph-2">
          Total Not Confirmed Reservations: {notConfirmedCount}
        </p>
      </div>

      <table className="today-types">
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
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="14">No matching reservations found</td>
            </tr>
          ) : (
            reservations.map((reservation) => (
              <tr key={reservation._id} className="today-datas">
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodayAppointment;
