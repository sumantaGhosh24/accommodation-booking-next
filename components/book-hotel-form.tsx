"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

import {RAZORPAY_KEY} from "@/libs/config";
import {IHotel} from "@/models/hotelModel";

import {Button} from "./ui/button";
import {Input} from "./ui/input";

interface BookHotelFormProps {
  hotel: IHotel;
  user: any;
}

const BookHotelForm = ({hotel, user}: BookHotelFormProps) => {
  const [checkInDate, setCheckInDate] = useState(
    new Date().toLocaleDateString()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date().toLocaleDateString()
  );
  const [adults, setAdults] = useState("0");
  const [childrens, setChildrens] = useState("0");

  const router = useRouter();

  const makePayment = async () => {
    if (new Date(checkInDate).getTime() >= new Date(checkOutDate).getTime()) {
      toast.error("Check out date must later than check in data");
      return;
    }

    if (adults == 0) {
      toast.error("Al least on adult required");
      return;
    }

    const differenceInTime =
      new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    const numberOfDays = Math.round(differenceInTime / (1000 * 3600 * 24)) + 1;

    const data = await fetch("http://localhost:3000/api/razorpay", {
      method: "POST",
      body: JSON.stringify({
        price:
          (Number(hotel.price) - Number(hotel.discount)) * numberOfDays * 100,
      }),
    });
    const order = await data.json();
    const options = {
      key: RAZORPAY_KEY,
      name: "Book Sports Ticket",
      description: "Book your favorite match ticket.",
      currency: order.order.currency,
      amount: order.order.amount,
      order_id: order.order.id,
      handler: async function (response: any) {
        const data = await fetch("http://localhost:3000/api/paymentverify", {
          method: "POST",
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            hotel: hotel._id,
            user: user._id,
            totalPrice: order.order.amount / 100,
            checkInDate,
            checkOutDate,
            numberOfDays,
            adults,
            childrens,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await data.json();
        if (res?.message == "success") {
          console.log("redirected.......");
          router.push("/profile");
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function () {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full">
            <h4>Check in date</h4>
            <Input
              type="date"
              className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter check in date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
          <div className="w-full">
            <h4>Check out date</h4>
            <Input
              type="date"
              className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter check out date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full">
            <h4>Total adult</h4>
            <Input
              type="text"
              className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter adults count"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </div>
          <div className="w-full">
            <h4>Total children</h4>
            <Input
              type="text"
              className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Enter childrens count"
              value={childrens}
              onChange={(e) => setChildrens(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="submit"
          role="link"
          size="lg"
          className="ml-5 mt-5 sm:w-fit"
          onClick={() => makePayment()}
        >
          Start Booking
        </Button>
      </div>
    </div>
  );
};

export default BookHotelForm;
