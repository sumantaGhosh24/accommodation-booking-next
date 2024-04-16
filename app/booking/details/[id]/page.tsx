import {redirect} from "next/navigation";

import {getBooking} from "@/actions/bookingActions";
import BookingDetails from "@/components/booking-details";

export const metadata = {
  title: "Details Booking",
};

const Booking = async ({params}: {params: {id: string}}) => {
  const booking = await getBooking(params.id);
  if (!booking) redirect("/");

  return (
    <>
      <BookingDetails booking={booking} />
    </>
  );
};

export default Booking;
