import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getUserBookings} from "@/actions/bookingActions";
import Bookings from "@/components/bookings";

export const metadata = {
  title: "Manage My Bookings",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const MyBookings = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const user = await getServerUser();

  if (!user) redirect("/");

  const bookings = await getUserBookings({
    pageNumber: page,
    pageSize: 5,
    user: user._id,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage My Bookings</h2>
        <p className="text-gray-600">Admin manage my bookings.</p>
      </div>
      <Bookings
        data={bookings?.data}
        emptyTitle="No my bookings found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={bookings?.totalPages}
        user={user}
      />
    </div>
  );
};

export default MyBookings;
