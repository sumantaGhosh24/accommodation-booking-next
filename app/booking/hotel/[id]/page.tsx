import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getHotelBookings} from "@/actions/bookingActions";
import Bookings from "@/components/bookings";

export const metadata = {
  title: "Manage Hotel Bookings",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
  params: {id: string};
}

const HotelBookings = async ({searchParams, params}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  if (!params.id) redirect("/booking");

  const bookings = await getHotelBookings({
    pageNumber: page,
    pageSize: 5,
    hotel: params.id,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage Hotel Bookings</h2>
        <p className="text-gray-600">Admin manage hotel bookings.</p>
      </div>
      <Bookings
        data={bookings?.data}
        emptyTitle="No hotel bookings found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={bookings?.totalPages}
        user={user}
      />
    </div>
  );
};

export default HotelBookings;
