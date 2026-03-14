"use client";

import Image from "next/image";
import {Calendar, Users, CreditCard} from "lucide-react";

import {IBooking} from "@/models/bookingModel";

import {Badge} from "./ui/badge";

const BookingDetails = ({booking}: {booking: IBooking}) => {
  return (
    <div className="container mx-auto my-10 space-y-8 rounded-md py-10 shadow-md dark:shadow-gray-400">
      <div>
        <h1 className="text-3xl font-bold">Booking Details</h1>
        <p className="text-muted-foreground">
          View your booking information and payment status.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border p-5 shadow-sm">
          <Image
            src={booking.user.image.url}
            alt={booking.user.image.public_id}
            height={70}
            width={70}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-muted-foreground">Booked by</p>
            <p className="font-semibold capitalize">{booking.user.name}</p>
            <p className="text-sm">{booking.user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border p-5 shadow-sm">
          <Image
            src={booking.hotel.image[0].url}
            alt={booking.hotel.image[0].public_id}
            height={70}
            width={70}
            className="rounded object-cover"
          />
          <div>
            <p className="text-sm text-muted-foreground">Hotel</p>
            <p className="font-semibold">{booking.hotel.title}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border p-5">
          <Calendar size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Check In</p>
            <p className="font-medium">
              {new Date(booking.checkInDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border p-5">
          <Calendar size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Check Out</p>
            <p className="font-medium">
              {new Date(booking.checkOutDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border p-5">
          <Calendar size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Total Days</p>
            <p className="font-medium">{booking.numberOfDays}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border p-5">
          <Users size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Adults</p>
            <p className="font-medium">{booking.adults}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border p-5">
          <Users size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Children</p>
            <p className="font-medium">{booking.childrens}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border p-5">
          <CreditCard size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-lg font-bold text-primary">
              ₹{booking.totalPrice}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Payment Information</h2>
        <p className="text-sm">
          <span className="font-medium">Transaction ID:</span>{" "}
          {booking.paymentResult.id}
        </p>
        <p className="text-sm">
          <span className="font-medium">Payment Status:</span>{" "}
          {booking.paymentResult.status}
        </p>
        <p className="text-sm">
          <span className="font-medium">Order ID:</span>{" "}
          {booking.paymentResult.razorpay_order_id}
        </p>
        <p className="text-sm">
          <span className="font-medium">Payment ID:</span>{" "}
          {booking.paymentResult.razorpay_payment_id}
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <div>
          <span className="mr-3 font-medium">Booking Status:</span>
          <Badge
            variant={
              booking.status === "pending"
                ? "warning"
                : booking.status === "complete"
                ? "success"
                : "danger"
            }
            className="uppercase"
          >
            {booking.status}
          </Badge>
        </div>
        <div>
          <span className="mr-3 font-medium">Payment:</span>
          <Badge
            variant={booking.isPaid ? "success" : "warning"}
            className="uppercase"
          >
            {booking.isPaid ? "Paid" : "Not Paid"}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <p>Created: {new Date(booking.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(booking.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BookingDetails;
