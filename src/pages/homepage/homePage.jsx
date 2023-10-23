import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Aleah from "../../assets/aleah.png";
import Jenny from "../../assets/jenny.png"
import Joshua from "../../assets/joshua.png"
import TodayAppointment from '../../components/appointmentsbox/todayAppointment';



const HomePage = () => {
  return (
    <div className='min-vh-100'>
    <TodayAppointment/>
    </div>
  );
};

export default HomePage;
