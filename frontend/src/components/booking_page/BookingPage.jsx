import React from 'react';
import '../../style/booking_page/bookingPage.css';
import Room from './Room';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <div className="booking_page_top_container">
        <h1 className="booking-title">Our Rooms</h1>
      </div>
      <div className="rooms_container">
        <Room />
        <Room />

        <Room />

        <Room />
      </div>
    </div>
  );
};

export default BookingPage;
