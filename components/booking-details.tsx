"use client";

import Image from "next/image";

import {IBooking} from "@/models/bookingModel";

import {Badge} from "./ui/badge";

const BookingDetails = ({booking}: {booking: IBooking}) => {
  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <h1 className="mb-5 text-2xl font-bold">Booking Details</h1>
        <div className="flex gap-5">
          <div className="border-primary flex items-center gap-3 rounded border p-5">
            <Image
              src={booking.user.image.url}
              alt={booking.user.image.public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">User: </h4>
              <h4 className="mb-2 capitalize">{booking.user.name}</h4>
              <h5>{booking.user.email}</h5>
            </div>
          </div>
          <div className="border-primary flex items-center gap-3 rounded border p-5">
            <Image
              src={booking.hotel.image[0].url}
              alt={booking.hotel.image[0].public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">Hotel: </h4>
              <h4>{booking.hotel.title}</h4>
            </div>
          </div>
        </div>
        <h4 className="capitalize">
          Check in date: {new Date(booking.checkInDate).toLocaleDateString()}
        </h4>
        <h4 className="capitalize">
          Check out date: {new Date(booking.checkOutDate).toLocaleDateString()}
        </h4>
        <h4 className="capitalize">
          Number of days: <Badge>{booking.numberOfDays}</Badge>
        </h4>
        <h4 className="capitalize">
          Adults: <Badge>{booking.adults}</Badge>
        </h4>
        <h4 className="capitalize">
          Children: <Badge>{booking.childrens}</Badge>
        </h4>
        <h4 className="capitalize">
          Total Price: <Badge>{booking.totalPrice}</Badge>
        </h4>
        <h4 className="capitalize">
          Payment Result:{" "}
          {booking.paymentResult.id |
            booking.paymentResult.status |
            booking.paymentResult.razorpay_order_id |
            booking.paymentResult.razorpay_payment_id |
            booking.paymentResult.razorpay_signature}
        </h4>
        <h4>
          Status:
          <Badge
            variant={
              booking.status === "pending"
                ? "warning"
                : booking.status === "complete"
                ? "success"
                : "danger"
            }
            className="ml-3"
          >
            {booking.status}
          </Badge>
        </h4>
        <h4>
          Is Paid:
          <Badge
            variant={booking.isPaid ? "success" : "warning"}
            className="ml-3"
          >
            {booking.status ? "Paid" : "Not Paid"}
          </Badge>
        </h4>
        <h4>Created at: {new Date(booking.createdAt).toLocaleDateString()}</h4>
        <h4>Updated at: {new Date(booking.updatedAt).toLocaleDateString()}</h4>
      </div>
    </div>
  );
};

export default BookingDetails;
